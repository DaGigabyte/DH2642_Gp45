function CounterView(props) {
  // Handle increase
  function handleIncreaseACB() {
    props.onCountChange(props.count + 1);
  }

  // Handle decrease
  function handleDecreaseACB() {
    props.onCountChange(props.count - 1);
  }

  return (
    <div>
      <button onClick={handleIncreaseACB}>Increase</button>
      <span>{props.count}</span>
      <button onClick={handleDecreaseACB}>Decrease</button>
    </div>
  );
}

export default CounterView;
