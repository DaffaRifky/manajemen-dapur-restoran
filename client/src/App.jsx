import Layout from "./pages/layout";
import { appRoutes, subAppRoutes, publicRoutes } from "./routes/routes";
import { BrowserRouter, Routes, Route } from "react-router";
import ProtectedRoutes from "./auth/protectedRoutes";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>

          {publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}

          <Route element={<ProtectedRoutes />}>
            <Route element={<Layout />}>

              {appRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}

              {subAppRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}

            </Route>
          </Route>
      </Routes>
    </BrowserRouter>
  );
}