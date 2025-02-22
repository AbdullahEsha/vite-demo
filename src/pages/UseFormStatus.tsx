import { useEffect, FC } from "react";
import { useFormState } from "react-dom";
import { Typography, TextField, Button, Box } from "@mui/material";

interface PreviousState {
  userName: string | null;
  message: string | null;
}

interface FormData {
  get: (name: string) => FormDataEntryValue | null;
}

const recordInput = (previousState: PreviousState, formData: FormData) => {
  // Do something with the form data
  console.log("Previous State: ", previousState);

  return {
    userName: formData.get("userName") as string | null,
    message: formData.get("message") as string | null,
    previousState,
  };
};

const UseFormStatus: FC = () => {
  // The useFormState Hook will return the form data
  const [data, formAction] = useFormState(recordInput, {
    userName: null,
    message: null,
    previousState: { userName: null, message: null },
  });

  useEffect(() => {
    // Output the current values entered in the form
    console.log("userName 2: ", data.userName);
    console.log("message 2: ", data.message);
  }, [data]);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h1" gutterBottom>
        Use Form Status Example
      </Typography>

      {/* Display the current data and previous state */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          component="form"
          action={formAction}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "400px",
          }}
        >
          {/* The input with the name 'userName' will be recorded by the useFormState Hook */}
          <TextField name="userName" label="User Name" fullWidth />
          {/* The input with the name 'message' will be recorded by the useFormState Hook */}
          <TextField
            name="message"
            label="Message"
            fullWidth
            multiline
            rows={4}
          />
          {/* The submit button will trigger the formAction function */}
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h5" gutterBottom>
            Current Data:
          </Typography>
          <Typography variant="body1">
            <strong>Username:</strong> {data.userName || "Not provided"}
          </Typography>
          <Typography variant="body1">
            <strong>Message:</strong> {data.message || "Not provided"}
          </Typography>
        </Box>
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h5" gutterBottom>
            Previous State:
          </Typography>
          <Typography variant="body1">
            <strong>Username:</strong>{" "}
            {data.previousState.userName || "Not provided"}
          </Typography>
          <Typography variant="body1">
            <strong>Message:</strong>{" "}
            {data.previousState.message || "Not provided"}
          </Typography>
        </Box>
      </Box>

      {/* Form to submit new data */}
    </Box>
  );
};

export default UseFormStatus;
