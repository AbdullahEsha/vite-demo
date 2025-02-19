import { useState, useTransition, useOptimistic } from "react";

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

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Todo List</h1>

      <ul className="mb-4 space-y-2">
        {optimisticTodos.map((todo) => (
          <li
            key={todo.id}
            className={`p-2 border rounded ${isPending ? "opacity-50" : ""}`}
          >
            {todo.text}
            {todo.id === optimisticTodos[optimisticTodos.length - 1]?.id &&
              isPending && (
                <span className="ml-2 text-gray-500 italic">(adding...)</span>
              )}
          </li>
        ))}
      </ul>

      <button onClick={handleAddTodo} disabled={isAdding} className="px-4 py-2">
        {isAdding ? "Adding Todo..." : "Add Todo"}
      </button>

      <p className="mt-2 text-sm text-gray-500">
        {isAdding && "Processing your request... (takes 5 seconds)"}
      </p>
    </div>
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
