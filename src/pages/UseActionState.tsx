import { FC, useTransition, useActionState, FormEvent } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";

async function actionFunction(previousState: number, formData: FormData) {
  // Simulate an async action (e.g., API call)
  await new Promise((resolve) => setTimeout(resolve, 5000)); // 5-second delay

  const text = (formData.get("text") as string) || "1";

  // Return the new state
  return previousState + parseInt(text);
}

const initialState = 0;

const UseActionState: FC = () => {
  const [isPending, startTransition] = useTransition(); // Properly use useTransition
  const [state, formAction] = useActionState(actionFunction, initialState);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.currentTarget);

    // Wrap the formAction call in startTransition
    startTransition(() => {
      formAction(formData); // Call the action function
    });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h1" gutterBottom>
        Use Action State Example
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: "400px",
        }}
      >
        <Typography variant="body1">Current State: {state}</Typography>
        <TextField
          name="text"
          label="Enter Text"
          defaultValue={state.toString()}
          fullWidth
        />
        <Button
          type="submit"
          disabled={isPending}
          variant="contained"
          color="primary"
          startIcon={isPending ? <CircularProgress size={20} /> : null}
        >
          {isPending ? "Loading..." : "Submit"}
        </Button>
      </Box>
    </Box>
  );
};

export default UseActionState;
