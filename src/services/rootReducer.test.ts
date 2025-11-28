import { rootReducer } from './rootReducer';
import { describe, test, expect } from '@jest/globals';

describe('rootReducer', () => {
  test('should initialize correctly', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toEqual({
      ingredients: {
        ingredients: [],
        loading: false,
        error: null
      },
      user: {
        user: null,
        isAuthChecked: false,
        loading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: [],
        orderRequest: false,
        orderModalData: null
      },
      orders: {
        userOrders: [],
        feedOrders: [],
        feed: {
          total: 0,
          totalToday: 0
        },
        loading: false,
        error: null
      },
      order: {
        orderData: null,
        loading: false,
        error: null
      }
    });
  });
});
