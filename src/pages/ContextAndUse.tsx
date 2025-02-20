import { use, Suspense /*useEffect*/ } from "react";
import { ThemeContext, updateTheme } from "../context/ContextAndUseProvider";
import { Link } from "react-router-dom";

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

  // useEffect(() => {
  //   // Fetch the data
  //   dataPromise.then((data) => {
  //     console.log("Fetched data", data);
  //   });
  // }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Theme Settings</h1>
      <div className="space-y-2">
        <h2>Current Color: {theme.color}</h2>
        <h2>Current Font Size: {theme.fontSize}</h2>
        <h2 className="text-red-600">Fetched Data Title: {data.title}</h2>
      </div>

      <button
        onClick={handleUpdateTheme}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Update Theme
      </button>
      <br />
      <br />
      <Link to="/use-optimistic" className="text-blue-500">
        Go to Use Optimistic
      </Link>
    </div>
  );
};

const ContextAndUse = () => {
  return (
    <Suspense
      fallback={<div className="p-4 animate-pulse">Loading theme...</div>}
    >
      <ThemeContent />
    </Suspense>
  );
};

export default ContextAndUse;
