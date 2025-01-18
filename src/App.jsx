import Body from "./components/Body";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./Utils/appStore";
import Feed from "./components/Feed";

function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body></Body>} >
          <Route path="/" element={<Feed></Feed>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/Profile" element={<Profile></Profile>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
