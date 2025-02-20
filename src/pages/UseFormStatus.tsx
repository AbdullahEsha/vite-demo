import { useEffect, FC } from "react";
import { useFormState } from "react-dom";

interface previousState {
  userName: string | null;
  message: string | null;
}

interface formData {
  get: (name: string) => FormDataEntryValue | null;
}

const recordInput = (previousState: previousState, formData: formData) => {
  // Do something with the form data
  console.log(formData.get("userName"));
  console.log(formData.get("message"));
  return previousState;
};

const UseFormStatus: FC = () => {
  // The useFormState Hook will return the form data
  const [data, formAction] = useFormState(recordInput, {
    userName: null,
    message: null,
  });

  useEffect(() => {
    //output the current values entered in the form
    console.log("userName 2: ", data.userName);
    console.log("message 2: ", data.message);
  }, [data]);
  return (
    <>
      <h1>Use Form Status Example</h1>
      <form action={formAction} className="flex flex-col gap-3 mb-4">
        {/*The input with the name 'userName' will be recorded by the useFormState Hook*/}
        <input name="userName" className="mr-2 border border-gray-300" />
        {/*The input with the name 'message' will be recorded by the useFormState Hook*/}
        <input name="message" className="mr-2 border border-gray-300" />
        {/*The submit button will trigger the formAction function*/}
        <input
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        />
      </form>
    </>
  );
};

export default UseFormStatus;
