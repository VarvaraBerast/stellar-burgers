import { TOrder } from '@utils-types';
import { fetchOrderByNumber, orderReducer } from './orderSlice';

const mockOrder: TOrder = {
  _id: 'order-1',
  status: 'done',
  name: 'Test Order',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  number: 12345,
  ingredients: ['ingredient-1', 'ingredient-2']
};
describe('order reducer', () => {
  const initialState = {
    orderData: null,
    loading: false,
    error: null
  };
  it('should return initial state', () => {
    expect(orderReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
  it('should handle fetchOrderByNumber when pending', () => {
    const action = { type: fetchOrderByNumber.pending.type };
    const state = orderReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });
  it('should handle fetchOrderByNumber when fulfilled', () => {
    const loadingState = {
      ...initialState,
      loading: true
    };
    const action = {
      type: fetchOrderByNumber.fulfilled.type,
      payload: mockOrder
    };
    const state = orderReducer(loadingState, action);
    expect(state.loading).toBe(false);
    expect(state.orderData).toEqual(mockOrder);
    expect(state.error).toBeNull();
  });
  it('should handle fetchOrderByNumber when rejected', () => {
    const loadingState = {
      ...initialState,
      loading: true
    };
    const errorMessage = 'Ошибка загрузки заказа';
    const action = {
      type: fetchOrderByNumber.rejected.type,
      error: { message: errorMessage }
    };
    const state = orderReducer(loadingState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки заказа');
  });
});
