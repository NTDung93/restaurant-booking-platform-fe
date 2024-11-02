import { ReduxState } from '@/libs/redux/store';

export const selectLocationSearchResult = (state: ReduxState) =>
  state.location.locationsPaginationResponse;

export const selectLocationDetail = (state: ReduxState) =>
  state.location.locationDetail;

export const selectPopularLocations = (state: ReduxState) =>
  state.location.popularLocationsResponse;

export const selectLocationsByTag = (state: ReduxState) =>
  state.location.locationsByTagResponse;

export const selectOnSaleLocations = (state: ReduxState) =>
  state.location.onSaleLocationsResponse;

export const selectSearchLocationStatus = (state: ReduxState) =>
  state.location.searchLocationStatus;

export const selectLocationDetailById = (state: ReduxState) =>
  state.location.locationDetailById;
