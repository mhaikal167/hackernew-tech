import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { routes } from "./config/routes/routes";

function App() {
  return (
    <div className="mx-3 md:mx-20 mt-2 border border-[#f6f6ef] bg-[#f6f6ef]">
      <Navbar />
      <Routes>
        {routes.map((route) => {
          return (
            <Route key={route} path={route.path} element={route.element} />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
