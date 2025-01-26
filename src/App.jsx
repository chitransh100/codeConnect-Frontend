import Body from "./components/Body";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./Utils/appStore";
import Feed from "./components/Feed";
import Requests from "./components/Requests"
import Connections from "./components/Connections";
import Chat from "./components/Chat";

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
            <Route path="/requests" element={<Requests></Requests>}></Route>
            <Route path="/connections" element={<Connections></Connections>}></Route>
            <Route path="/chat/:targetUserID" element={<Chat></Chat>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
