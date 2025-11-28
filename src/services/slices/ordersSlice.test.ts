import { TOrder } from '@utils-types';
import { fetchFeed, fetchUserOrders, ordersReducer } from './ordersSlices';

const mockOrders: TOrder[] = [
  {
    _id: 'order-1',
    status: 'done',
    name: 'Test Order 1',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    number: 12345,
    ingredients: ['ingredient-1', 'ingredient-2']
  },
  {
    _id: 'order-2',
    status: 'pending',
    name: 'Test Order 2',
    createdAt: '2023-01-02T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z',
    number: 12346,
    ingredients: ['ingredient-3', 'ingredient-4']
  }
];
const mockFeedData = {
  orders: mockOrders,
  total: 100,
  totalToday: 10
};

describe('orders reducer', () => {
  const initialState = {
    userOrders: [],
    feedOrders: [],
    feed: {
      total: 0,
      totalToday: 0
    },
    loading: false,
    error: null
  };
  it('should return initial state', () => {
    expect(ordersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('should fetch user orders', () => {
    it('should handle pending', () => {
      const action = { type: fetchUserOrders.pending.type };
      const state = ordersReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });
    it('should handle fulfilled', () => {
      const loadingState = {
        ...initialState,
        loading: true
      };
      const action = {
        type: fetchUserOrders.fulfilled.type,
        payload: mockOrders
      };
      const state = ordersReducer(loadingState, action);
      expect(state.loading).toBe(false);
      expect(state.userOrders).toEqual(mockOrders);
      expect(state.error).toBeNull();
    });
    it('should handle rejected', () => {
      const loadingState = {
        ...initialState,
        loading: true
      };
      const errorMessage = 'Ошибка загрузки заказов пользователя';
      const action = {
        type: fetchUserOrders.rejected.type,
        error: { message: errorMessage }
      };
      const state = ordersReducer(loadingState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка загрузки заказов пользователя');
    });
  });
  describe('fetchFeed', () => {
    it('should handle pending', () => {
      const action = { type: fetchFeed.pending.type };
      const state = ordersReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });
    it('should handle fulfilled', () => {
      const loadingState = {
        ...initialState,
        loading: true
      };
      const action = { type: fetchFeed.fulfilled.type, payload: mockFeedData };
      const state = ordersReducer(loadingState, action);
      expect(state.loading).toBe(true);
      expect(state.feedOrders).toEqual(mockOrders);
      expect(state.feed.total).toBe(100);
      expect(state.feed.totalToday).toBe(10);
      expect(state.error).toBeNull();
    });
    it('should handle rejected', () => {
      const loadingState = {
        ...initialState,
        loading: true
      };
      const errorMessage = 'Ошибка загрузки ленты заказов';
      const action = {
        type: fetchFeed.rejected.type,
        error: { message: errorMessage }
      };
      const state = ordersReducer(loadingState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка загрузки ленты заказов');
    });
  });
});
