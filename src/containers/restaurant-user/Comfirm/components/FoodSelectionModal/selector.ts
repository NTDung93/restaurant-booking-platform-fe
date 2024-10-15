import { ReduxState } from '@/libs/redux/store';

export const selectFoodByLocation = (state: ReduxState) =>
  state.food.foodsPaginationResponse;
