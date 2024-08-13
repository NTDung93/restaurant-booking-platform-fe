/* Core */
import {
  createAsyncThunk,
  AsyncThunkPayloadCreator,
  AsyncThunkOptions,
} from '@reduxjs/toolkit';

/* Instruments */
import type { ReduxState, ReduxDispatch } from './store';

/**
 * Define a custom AsyncThunkConfig type.
 */
type AsyncThunkConfig = {
  state: ReduxState;
  dispatch: ReduxDispatch;
  rejectValue: string;
};

/**
 * ? A utility function to create typed Async Thunk Actions.
 */
export const createAppAsyncThunk = <Returned, ThunkArg = void>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<
    Returned,
    ThunkArg,
    AsyncThunkConfig
  >,
  options?: AsyncThunkOptions<ThunkArg, AsyncThunkConfig>,
) =>
  createAsyncThunk<Returned, ThunkArg, AsyncThunkConfig>(
    typePrefix,
    payloadCreator,
    options,
  );
