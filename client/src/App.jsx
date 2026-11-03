import Layout from "./layout";
import { appRoutes, subAppRoutes, publicRoutes } from "./routes/routes";
import { BrowserRouter, Routes, Route } from "react-router";

export default function App() {


  return (
    <BrowserRouter>
      <Routes>
          {publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}

          <Route element={<Layout />}>
            {appRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
            {subAppRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
      </Routes>
    </BrowserRouter>
  );
}