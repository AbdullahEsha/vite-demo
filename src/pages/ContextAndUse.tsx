import { use, Suspense /*useEffect*/ } from "react";
import { ThemeContext, updateTheme } from "../context/ContextAndUseProvider";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

// Create a promise for the data fetch
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const dataPromise = fetch("https://jsonplaceholder.typicode.com/todos/1").then(
  (response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  }
);

const ThemeContent = () => {
  const themePromise = use(ThemeContext);
  const theme = use(themePromise);
  // Use the promise directly
  const data: Todo = use(dataPromise);

  const handleUpdateTheme = () => {
    const newTheme = {
      color: theme.color === "dark" ? "light" : "dark",
      fontSize: theme.fontSize === "16px" ? "20px" : "16px",
    };
    updateTheme(newTheme);
  };

  console.log("Data Fetched", data);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Theme Settings
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="body1">Current Color: {theme.color}</Typography>
        <Typography variant="body1">
          Current Font Size: {theme.fontSize}
        </Typography>
        <Typography variant="body1" sx={{ color: "error.main" }}>
          Fetched Data Title: {data.title}
        </Typography>
      </Box>

      <Button
        onClick={handleUpdateTheme}
        variant="contained"
        sx={{ mt: 2, bgcolor: "primary.main", color: "white" }}
      >
        Update Theme
      </Button>
      <br />
      <br />
      <Link to="/use-optimistic" style={{ textDecoration: "none" }}>
        <Typography variant="body1" sx={{ color: "primary.main" }}>
          Go to Use Optimistic
        </Typography>
      </Link>
    </Box>
  );
};

const ContextAndUse = () => {
  return (
    <Suspense
      fallback={
        <Box sx={{ p: 4 }}>
          <Typography variant="body1" className="animate-pulse">
            Loading theme...
          </Typography>
        </Box>
      }
    >
      <ThemeContent />
    </Suspense>
  );
};

export default ContextAndUse;
