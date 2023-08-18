import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./Global/GlobalStyles";
import ResetStyles from "./Global/ResetStyles";
import { SignUp, Login, TimeLine } from "./Pages";
import { AuthProvider } from "./contexts/AuthContext";
import { UserInfoProvider } from "./contexts/UserInfoContext";
import HashtagPage from "./Pages/HashtagPage";
import UserPage from "./Pages/UserPage";

function App() {
  return (
    <div className="App">
      <ResetStyles />
      <GlobalStyles />
      <AuthProvider>
        <UserInfoProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/timeline" element={<TimeLine />}></Route>
              <Route path="/hashtag/:hashtag" element={<HashtagPage />}></Route>
              <Route path="/user/:id" element={<UserPage />} />
            </Routes>
          </BrowserRouter>
        </UserInfoProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
