import { useState, useTransition, useOptimistic, use, Suspense } from "react";
import { ThemeContext } from "../context/ContextAndUseProvider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

type Todo = {
  id: string;
  text: string;
  status: "completed" | "pending";
};

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isPending, startTransition] = useTransition();
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: Todo) => [...state, newTodo]
  );
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTodo = async () => {
    const newTodoId = Date.now().toString();
    const newTodo = {
      id: newTodoId,
      text: `New Todo ${newTodoId}`,
      status: "pending" as const,
    };

    // Start the loading state
    setIsAdding(true);

    // Use startTransition to mark this update as non-urgent
    startTransition(() => {
      // Add the optimistic todo immediately for better UX
      addOptimisticTodo(newTodo);
    });

    try {
      // Wait for the API call to complete
      await fakeApiCallToAddTodo();

      // Update the actual state
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      console.error("Failed to add todo:", error);
      // Note: The optimistic update will be automatically discarded
      // when the component re-renders with the actual state
    } finally {
      setIsAdding(false);
    }
  };

  const themePromise = use(ThemeContext);
  const theme = use(themePromise);

  return (
    <Box sx={{ p: 4, maxWidth: "md", mx: "auto" }}>
      <Suspense
        fallback={
          <Typography variant="body1" className="animate-pulse">
            Loading theme...
          </Typography>
        }
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Theme Settings Test
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="body1">Current Color: {theme.color}</Typography>
          <Typography variant="body1">
            Current Font Size: {theme.fontSize}
          </Typography>
        </Box>
      </Suspense>
      <hr className="my-4" />
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Todo List
      </Typography>
      <List sx={{ mb: 2, display: "flex", flexDirection: "column", gap: 1 }}>
        {optimisticTodos.map((todo) => (
          <ListItem
            key={todo.id}
            sx={{
              p: 1,
              border: "1px solid",
              borderRadius: 1,
              opacity: isPending ? 0.5 : 1,
            }}
          >
            <ListItemText primary={todo.text} />
            {todo.id === optimisticTodos[optimisticTodos.length - 1]?.id &&
              isPending && (
                <Typography
                  variant="body2"
                  sx={{ ml: 1, color: "text.secondary", fontStyle: "italic" }}
                >
                  (adding...)
                </Typography>
              )}
          </ListItem>
        ))}
      </List>

      <Button
        onClick={handleAddTodo}
        disabled={isAdding}
        variant="contained"
        sx={{
          px: 2,
          py: 1,
          bgcolor: "primary.main",
          color: "white",
          borderRadius: 1,
        }}
      >
        {isAdding ? "Adding Todo..." : "Add Todo"}
      </Button>

      <Typography
        variant="body2"
        sx={{ mt: 1, color: "text.secondary", animation: "pulse 1s infinite" }}
      >
        {isAdding && "Processing your request... (takes 5 seconds)"}
      </Typography>
    </Box>
  );
}

const fakeApiCallToAddTodo = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve("New Todo Added");
        console.log("API Success");
      } else {
        reject(new Error("API Error"));
      }
    }, 5000);
  });

export default TodoList;
