import { ReduxState } from '@/libs/redux/store';

export const selectLocationSearchResult = (state: ReduxState) =>
  state.location.locationsPaginationResponse;
