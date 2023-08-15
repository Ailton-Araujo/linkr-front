import { Route, Routes } from "react-router-dom";
import { TimeLine } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/timeline" element={<TimeLine />} />
    </Routes>
  );
}

export default App;
