import { describe, test, expect } from '@jest/globals';
import { TIngredient } from '@utils-types';
import ingredientsReducer, { fetchIngredients } from './ingredientsSlice';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Test Ingredient 1',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 200,
    image: 'image1.jpg',
    image_large: 'image1-large.jpg',
    image_mobile: 'image1-mobile.jpg'
  },
  {
    _id: '2',
    name: 'Test Ingredient 2',
    type: 'main',
    proteins: 5,
    fat: 2,
    carbohydrates: 10,
    calories: 50,
    price: 100,
    image: 'image2.jpg',
    image_large: 'image2-large.jpg',
    image_mobile: 'image2-mobile.jpg'
  }
];

describe('should ingredients reducer', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };
  it('should return initial state', () => {
    expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });
  it('should handle fetchIngredients when pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });
  it('should handle fetchIngredients when fulfilled', () => {
    const loadingState = {
      ...initialState,
      loading: true
    };
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsReducer(loadingState, action);
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.error).toBeNull();
  });
  it('should handle fetchIngredients when rejected', () => {
    const loadingState = {
      ...initialState,
      loading: true
    };
    const errorMessage = 'Ошибка загрузки ингредиентов';
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: errorMessage }
    };
    const state = ingredientsReducer(loadingState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки ингредиентов');
  });
});
