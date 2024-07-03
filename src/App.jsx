import { Route, Routes } from "react-router-dom";
import MainPage from "./views/MainPage";
import Add from "./views/Add";
import Edit from "./views/Edit";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Add" element={<Add />} />
        <Route path="/Edit" element={<Edit />} />
        <Route path="*" element={<h1>Error 404: Page not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
