import { FC, useActionState, useTransition } from "react";

async function actionFunction(previousState: number, formData: FormData) {
  // Do something with the form data
  console.log(formData.get("text"));

  // Simulate an async action (e.g., API call)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return the new state
  return previousState + 1;
}

const initialState = 0;

const UseActionState: FC = () => {
  const [isPending] = useTransition();

  const [state, formAction] = useActionState(actionFunction, initialState);

  return (
    <>
      <h1>Use Action State Example</h1>
      <form>
        {state}
        <br />
        <input type="text" name="text" value={state} />
        <button type="submit" formAction={formAction}>
          {isPending ? "Loading..." : "Submit"}
        </button>
      </form>
    </>
  );
};

export default UseActionState;
