import counterReducer from '@/containers/restaurant-user/Counter/slice';
import userReducer from '@/containers/restaurant-user/Auth/slice';
import locationReducer from '@/containers/restaurant-user/Home/slice';
import foodReducer from '@/containers/restaurant-user/Comfirm/components/FoodSelectionModal/slice';
import bookingReducer from '@/containers/restaurant-user/Comfirm/slice';
export const reducer = {
  counter: counterReducer,
  user: userReducer,
  location: locationReducer,
  food: foodReducer,
  booking: bookingReducer,
};
