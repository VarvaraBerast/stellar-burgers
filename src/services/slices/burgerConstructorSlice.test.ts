import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import burgerConstructorReducer, {
  addToConstructor,
  removeFromConstructor,
  moveIngredientUp,
  moveIngredientDown,
  setOrderModalData,
  createOrder
} from './burgerConstructorSlice';

const mockBun: TIngredient = {
  _id: 'bun-1',
  name: 'Test Bun',
  type: 'bun',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 100,
  price: 200,
  image: 'bun.jpg',
  image_large: 'bun-large.jpg',
  image_mobile: 'bun-mobile.jpg'
};
const mockIngredient: TIngredient = {
  _id: 'ingredient-1',
  name: 'Test Ingredient',
  type: 'main',
  proteins: 5,
  fat: 2,
  carbohydrates: 10,
  calories: 50,
  price: 100,
  image: 'ingredient.jpg',
  image_large: 'ingredient-large.jpg',
  image_mobile: 'ingredient-mobile.jpg'
};
const mockConstructorIngredient: TConstructorIngredient = {
  ...mockIngredient,
  id: 'test-uuid-1'
};
const mockOrder: TOrder = {
  _id: 'order-1',
  status: 'done',
  name: 'Test Order',
  createdAt: '2025-01-01T00:00:00.000Z',
  updatedAt: '2025-01-01T00:00:00.000Z',
  number: 12345,
  ingredients: ['bun-1', 'ingredient-1', 'bun-1']
};
describe('burgerConstructor', () => {
  const initialState = {
    bun: null,
    ingredients: [],
    orderRequest: false,
    orderModalData: null
  };
  it('should return initial state', () => {
    expect(burgerConstructorReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });
  it('should handle addToConstructor for bun', () => {
    const action = addToConstructor(mockBun);
    const state = burgerConstructorReducer(initialState, action);
    expect(state.bun).toEqual({ ...mockBun, id: 'test-uuid' });
    expect(state.ingredients).toHaveLength(0);
  });
  it('should handle addToConstructor for ingredient', () => {
    const action = addToConstructor(mockIngredient);
    const state = burgerConstructorReducer(initialState, action);
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual({
      ...mockIngredient,
      id: 'test-uuid'
    });
  });
  it('should handle removeFromConstructor', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [mockConstructorIngredient]
    };
    const action = removeFromConstructor('test-uuid-1');
    const state = burgerConstructorReducer(stateWithIngredients, action);
    expect(state.ingredients).toHaveLength(0);
  });
  it('should handle moveIngredientUp', () => {
    const ingredients = [
      { ...mockConstructorIngredient, id: '1' },
      { ...mockConstructorIngredient, id: '2' },
      { ...mockConstructorIngredient, id: '3' }
    ];
    const stateWithIngredients = {
      ...initialState,
      ingredients
    };
    const action = moveIngredientUp('2');
    const state = burgerConstructorReducer(stateWithIngredients, action);
    expect(state.ingredients[0].id).toBe('2');
    expect(state.ingredients[1].id).toBe('1');
    expect(state.ingredients[2].id).toBe('3');
  });
  it('should handle moveIngredientDown', () => {
    const ingredients = [
      { ...mockConstructorIngredient, id: '1' },
      { ...mockConstructorIngredient, id: '2' },
      { ...mockConstructorIngredient, id: '3' }
    ];
    const stateWithIngredients = {
      ...initialState,
      ingredients
    };
    const action = moveIngredientDown('2');
    const state = burgerConstructorReducer(stateWithIngredients, action);
    expect(state.ingredients[0].id).toBe('1');
    expect(state.ingredients[1].id).toBe('3');
    expect(state.ingredients[2].id).toBe('2');
  });
  it('should handle setOrderModalData', () => {
    const action = setOrderModalData(mockOrder);
    const state = burgerConstructorReducer(initialState, action);
    expect(state.orderModalData).toEqual(mockOrder);
  });
  describe('should createOrder async actions', () => {
    it('should set orderRequest to true when pending', () => {
      const action = { type: createOrder.pending.type };
      const state = burgerConstructorReducer(initialState, action);
      expect(state.orderRequest).toBe(true);
    });
    it('should handle createOrder when fulfilled', () => {
      const stateWithItems = {
        bun: mockBun,
        ingredients: [mockConstructorIngredient],
        orderRequest: true,
        orderModalData: null
      };
      const action = { type: createOrder.fulfilled.type, payload: mockOrder };
      const state = burgerConstructorReducer(stateWithItems, action);
      expect(state.orderRequest).toBe(false);
      expect(state.orderModalData).toEqual(mockOrder);
      expect(state.bun).toBeNull(), expect(state.ingredients).toHaveLength(0);
    });
    it('should handle createOrder when rejected', () => {
      const stateWithRequest = {
        ...initialState,
        orderRequest: true
      };
      const action = { type: createOrder.rejected.type };
      const state = burgerConstructorReducer(stateWithRequest, action);
      expect(state.orderRequest).toBe(false);
    });
  });
});
