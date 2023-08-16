import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./Global/GlobalStyles";
import ResetStyles from "./Global/ResetStyles";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import { AuthProvider } from "./context/AuthContext";
import TopMenu from "./components/TopMenu/TopMenu";


function App() {
    return (
        <div className="App">
          <ResetStyles/>
          <GlobalStyles/>
          <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                    <Route path="/timeline" element={<TopMenu />}></Route>
                </Routes>
            </BrowserRouter>
          </AuthProvider>
        </div>
    );
};

export default App;
