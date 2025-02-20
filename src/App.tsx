// App.tsx
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import {
  Home,
  UseActionState,
  UseFormStatus,
  UseOptimistic,
  ContextAndUse,
} from "./pages";
import { ThemeProvider } from "./context/ContextAndUseProvider";

function App() {
  return (
    <Suspense
      fallback={<div className="animate-pulse">Loading application...</div>}
    >
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/use-action-state" element={<UseActionState />} />
            <Route path="/use-form-status" element={<UseFormStatus />} />
            <Route path="/use-optimistic" element={<UseOptimistic />} />
            <Route path="/context-and-use" element={<ContextAndUse />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
