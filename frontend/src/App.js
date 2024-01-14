import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import PrivateRoutes from "./utils/PrivateRoutes";
import {AuthProvider} from "./context/AuthContext";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Header />
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route element={<HomePage />} path="/" />
                    </Route>
                    <Route element={<LoginPage />} path="/login" />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;