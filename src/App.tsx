import {Route,RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import RequireAuth from "./components/ReaquireAuth"
import EditPage from "./pages/EditPage";
import ListPage from "./pages/ListPage";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RequireAuth />}>
                <Route index element={<EditPage />} />
                <Route path="list" element={<ListPage />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
};
export default App;
