import ItemInfo from "./components/ItemInfo";
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Verify from './components/Verify'
import { useState } from 'react'
import UserAgreement from './components/UserAgreement'
import Setting from './components/Setting'
import Buying from "./components/Buying"
import PostForm from "./components/PostForm";
import Report from "./components/Report"
import Admin from "./components/Admin";
import Favorites from "./components/Favorites";
import Notification from "./components/Notification";
import Email from "./components/Email";
function App() {
  const [login, setLogin] = useState(false)

  return (
    <div>
      <div>
        {login && <Login setLogin={setLogin} />}
      </div>
      <BrowserRouter>
        <Routes>
          <Route index path="/iteminfo" element={<ItemInfo />} />
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/UserAgreement' element={<UserAgreement />} />
          <Route path='/Verify' element={<Verify />} />
          <Route path="/Setting" element={<Setting/>}></Route>
          <Route path="/history" element={<Buying/>}></Route>
          <Route path="/report" element={<Report />}></Route>
          <Route path='/admin' element={<Admin/>}></Route>
          <Route path='/favorites' element={<Favorites/>}></Route>
          <Route path='/notification' element={<Notification/>}></Route>
          <Route path='/email' element={<Email/>}></Route>
        </Routes>
      </BrowserRouter>


    </div>
  )
}

export default App;
 