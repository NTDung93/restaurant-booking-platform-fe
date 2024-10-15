import { ReduxState } from '@/libs/redux/store';

export const selectPromotionByLocation = (state: ReduxState) =>
  state.promotion.promotionPaginationResponse;
