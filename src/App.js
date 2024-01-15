import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddMemory from "./components/AddMemory";
import UpdateMemory from "./components/UpdateMemory";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import Footer from "./components/Footer";
import Memories from "./components/Memories";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import PrivateComp from "./components/PrivateComp";
import { SnackbarProvider } from "notistack";


function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <Navbar />
        {/* <SignUpPage/> */}
        <Routes>
          <Route element={<PrivateComp />}>
            <Route path="/memories/:userId" element={<Memories />}></Route>
            <Route path="/add-memory/:userId" element={<AddMemory />}></Route>
            <Route path="/update/:userId" element={<UpdateMemory />}></Route>
            <Route path="/profile/:userId" element={<Profile />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
          </Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<SignUpPage />}></Route>
        </Routes>

        <Footer />
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
