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
        <input
          type="text"
          name="text"
          defaultValue={state.toString()}
          className="mr-2 border border-gray-300"
        />
        <button
          type="submit"
          formAction={formAction}
          disabled={isPending}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isPending ? "Loading..." : "Submit"}
        </button>
      </form>
    </>
  );
};

export default UseActionState;
