import { ReduxState } from "@/libs/redux/store";

export const selectCounter = (state: ReduxState) =>
    state.counter.value