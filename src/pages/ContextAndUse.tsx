import { use } from "react";

const ContextAndUse = () => {
  const state = use(0);

  return (
    <>
      <h1>ContextAndUse</h1>
      <h2>{state}</h2>
      <button onClick={() => setState(state + 1)}>Increment</button>
      <button onClick={() => setState(state - 1)}>Decrement</button>
    </>
  );
};

export default ContextAndUse;
