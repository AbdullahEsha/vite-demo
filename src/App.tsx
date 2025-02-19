import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, UseActionState, UseFormStatus, UseOptimistic } from "./pages";
import ContextAndUseProvider from "./context/ContextAndUseProvider";

function App() {
  return (
    <>
      <ContextAndUseProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/use-action-state" element={<UseActionState />} />
            <Route path="/use-form-status" element={<UseFormStatus />} />
            <Route path="/use-optimistic" element={<UseOptimistic />} />
          </Routes>
        </Router>
      </ContextAndUseProvider>
    </>
  );
}

export default App;
