import { TUser } from '@utils-types';
import userReducer, {
  fetchUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '../slices/userSlice';

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

describe('user reducer', () => {
  const initialState = {
    user: null,
    isAuthChecked: false,
    loading: false,
    error: null
  };
  it('should return initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
  describe('should login user', () => {
    it('should handle pending', () => {
      const action = { type: loginUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });
    it('should handle fulfilled', () => {
      const loadingState = {
        ...initialState,
        loading: true
      };
      const action = { type: loginUser.fulfilled.type, payload: mockUser };
      const state = userReducer(loadingState, action);
      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBeNull();
    });
    it('should handle rejected', () => {
      const loadingState = {
        ...initialState,
        loading: true
      };
      const errorMessage = 'Ошибка входа';
      const action = {
        type: loginUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = userReducer(loadingState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка входа');
    });
  });
  describe('should register user', () => {
    it('should handle pending', () => {
      const action = { type: registerUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });
    it('should handle fulfilled', () => {
      const loadingState = {
        ...initialState,
        loading: true
      };
      const action = { type: registerUser.fulfilled.type, payload: mockUser };
      const state = userReducer(loadingState, action);
      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBeNull();
    });
    it('should handle rejected', () => {
      const loadingState = {
        ...initialState,
        loading: true
      };
      const errorMessage = 'Ошибка регистрации';
      const action = {
        type: registerUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = userReducer(loadingState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка регистрации');
    });
  });
  describe('should fetch user', () => {
    it('should handle pending', () => {
      const action = { type: fetchUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(true);
    });
    it('should handle fulfilled', () => {
      const loadingState = {
        ...initialState,
        loading: true
      };
      const action = { type: fetchUser.fulfilled.type, payload: mockUser };
      const state = userReducer(loadingState, action);
      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
    });
    it('should handle rejected', () => {
      const loadingState = {
        ...initialState,
        loading: true
      };
      const action = { type: fetchUser.rejected.type };
      const state = userReducer(loadingState, action);
      expect(state.loading).toBe(false);
      expect(state.isAuthChecked).toBe(true);
    });
  });
  describe('should update user', () => {
    it('should handle pending', () => {
      const action = { type: updateUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });
    it('should handle fulfilled', () => {
      const loadingState = {
        ...initialState,
        loading: true
      };
      const action = { type: updateUser.fulfilled.type, payload: mockUser };
      const state = userReducer(loadingState, action);
      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.error).toBeNull();
    });
    it('should handle rejected', () => {
      const loadingState = {
        ...initialState,
        loading: true
      };
      const errorMessage = 'Ошибка обновления данных';
      const action = {
        type: updateUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = userReducer(loadingState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка обновления данных');
    });
  });
  describe('should logout user', () => {
    it('should handle fulfilled', () => {
      const stateWithUser = {
        ...initialState,
        user: mockUser
      };
      const action = { type: logoutUser.fulfilled.type, payload: mockUser };
      const state = userReducer(stateWithUser, action);
      expect(state.user).toBeNull();
    });
  });
});
