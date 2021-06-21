import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/UserSlice/UserSlice';
import reimbursementsReducer from '../features/EmployeeWorkSlice/EmployeeWorkSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    reimburements: reimbursementsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
