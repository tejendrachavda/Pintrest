import { UserData } from "./context/UserContext"
import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Navbar from "./components/navbar"
import Pin_page from "./pages/pin"
import CreatePin from "./pages/createPin"
import Owner from "./pages/owner"
import UserProfile from "./pages/userProfile"
import Following from "./pages/following"
import { Loading } from "./components/loding"

function App() {
  const { loading, auth, user } = UserData();

  return (
    <>
      {
        loading ? <Loading /> : (

          <BrowserRouter>
            {auth && <Navbar user={user} />}
            <Routes>
              <Route path="/login" element={auth ? <Home /> : <Login />} />
              <Route path="/register" element={auth ? <Home /> : <Register />} />
              <Route path="/" element={auth ? <Home /> : <Login />} />
              <Route path="/owner/:id" element={<Owner />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/following" element={<Following />} />
              <Route path="/create" element={auth ? <CreatePin /> : <Login />} />
              <Route path="/pin/:id" element={auth ? <Pin_page /> : <Login />} />
              <Route path="*" element={<Login />} />
            </Routes>
          </BrowserRouter>)
      }
    </>
  )
}

export default App