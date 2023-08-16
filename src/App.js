import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./Global/GlobalStyles";
import ResetStyles from "./Global/ResetStyles";
import { SignUp, Login, TimeLine } from "./Pages";
import { AuthProvider } from "./contexts/AuthContext";
import { UserInfoProvider } from "./contexts/UserInfoContext";
import TopMenu from "./components/TopMenu/TopMenu";

function App() {
  return (
    <div className="App">
      <ResetStyles />
      <GlobalStyles />
      <AuthProvider>
        <UserInfoProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/timeline" element={<TimeLine />} />
            </Routes>
          </BrowserRouter>
        </UserInfoProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
