import { useSelector, useDispatch } from "react-redux";
import { incrementAsync } from "./thunks";
import { decrement } from "./slice";
import { ReduxDispatch } from "@/libs/redux/store";
import { selectCounter } from "./selectors";

export default function Counter() {
  const count = useSelector(selectCounter);
  const dispatch = useDispatch<ReduxDispatch>();
  return (
    <div>
      <h2>{count}</h2>
      <div>
        <button onClick={() => dispatch(incrementAsync(10))}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
    </div>
  );
}
