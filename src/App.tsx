// App.tsx
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Home,
  UseActionState,
  UseFormStatus,
  UseOptimistic,
  ContextAndUse,
} from "./pages";
import { ContextAndUseProvider } from "./context/ContextAndUseProvider";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ContextAndUseProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/use-action-state" element={<UseActionState />} />
            <Route path="/use-form-status" element={<UseFormStatus />} />
            <Route path="/use-optimistic" element={<UseOptimistic />} />
            <Route path="/context-and-use" element={<ContextAndUse />} />
          </Routes>
        </Router>
      </ContextAndUseProvider>
    </ThemeProvider>
  );
}

export default App;
