import React from 'react'; 
import './App.css'; 
import Home from './Home';
import { Routes,Route,Navigate } from 'react-router-dom';
import OfflineGame from './game/offlineGame';
import OnlineGame from './game/onlineGame';
function App() {
  return (
    <div className="App bg-gray-800"> 
      <Routes>
        <Route path='/home' element={ <Home />}></Route>
        <Route path='/' element={ <Navigate to={"/home"} />}></Route>
        <Route path='/play/offline' element={ <OfflineGame />}></Route>
        <Route path='/play/online/:id' element={ <OnlineGame />}></Route>
      </Routes> 
    </div>
  );
}

export default App;
