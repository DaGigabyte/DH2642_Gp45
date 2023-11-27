import { observer } from "mobx-react";
import { counterStore } from "../mobx/CounterStore";

const Counter = observer(() => {
  return (
    <div>
      <div>Count: {counterStore.count}</div>
      <button onClick={() => counterStore.increment()}>Increment</button>
      <button onClick={() => counterStore.decrement()}>Decrement</button>
    </div>
  );
});

export default Counter;
