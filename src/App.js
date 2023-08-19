import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import GlobalStyles from "./Global/GlobalStyles";
import ResetStyles from "./Global/ResetStyles";
import { SignUp, Login, TimeLine, UserPage, HashtagPage } from "./Pages";
import TopMenu from "./components/TopMenu";
import { AuthProvider } from "./contexts/AuthContext";
import { UserInfoProvider } from "./contexts/UserInfoContext";

function App() {
  const { pathname } = useLocation();
  return (
    <div className="App">
      <ResetStyles />
      <GlobalStyles />
      <AuthProvider>
        <UserInfoProvider>
          {pathname !== "/" && pathname !== "/sign-up" && <TopMenu />}
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/sign-up" element={<SignUp />}></Route>
            <Route path="/timeline" element={<TimeLine />}></Route>
            <Route path="/hashtag/:hashtag" element={<HashtagPage />}></Route>
            <Route path="/user/:id" element={<UserPage />} />
          </Routes>
        </UserInfoProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
