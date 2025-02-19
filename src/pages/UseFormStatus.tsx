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
      <form action={formAction}>
        {/*The input with the name 'userName' will be recorded by the useFormState Hook*/}
        <input name="userName" />
        <br />
        {/*The input with the name 'message' will be recorded by the useFormState Hook*/}
        <input name="message" />

        <input type="submit" />
      </form>
    </>
  );
};

export default UseFormStatus;
