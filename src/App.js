import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import GlobalStyles from "./Global/GlobalStyles";
import ResetStyles from "./Global/ResetStyles";
import { SignUp, Login, TimeLine, UserPage, HashtagPage } from "./Pages";
import TopMenu from "./components/TopMenu";
import { SignOutOutlet, SignInOutlet } from "./components/Outlets";
import { AuthProvider } from "./contexts/AuthContext";
import { FollowersProvider } from "./contexts/FollowersContext";
import { UserInfoProvider } from "./contexts/UserInfoContext";

function App() {
  const { pathname } = useLocation();
  return (
    <div className="App">
      <ResetStyles />
      <GlobalStyles />
      <AuthProvider>
        <UserInfoProvider>
          <FollowersProvider>
            {pathname !== "/" && pathname !== "/sign-up" && <TopMenu />}
            <Routes>
              <Route element={<SignInOutlet />}>
                <Route path="/" element={<Login />}></Route>
              </Route>

              <Route path="/sign-up" element={<SignUp />}></Route>

              <Route element={<SignOutOutlet />}>
                <Route path="/timeline" element={<TimeLine />}></Route>
                <Route
                  path="/hashtag/:hashtag"
                  element={<HashtagPage />}
                ></Route>
                <Route path="/user/:id" element={<UserPage />} />
              </Route>
            </Routes>
          </FollowersProvider>
        </UserInfoProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
