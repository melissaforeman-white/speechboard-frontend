import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import React, { useState} from 'react';

// components
import AppNav from './components/AppNav/AppNav.js';
import HomePage from './pages/HomePage.js';
import CreateBoardPage from './pages/CreateBoardPage.js';
import MyBoardsPage from './pages/MyBoardsPage.js';
import SelectSizePage from './pages/SelectSizePage.js';
import BoardDetailPage from './pages/BoardDetailPage.js';
import EditBoardPage from './pages/EditBoardPage.js';
import LoginPage from './pages/LoginPage.js';
// import CRUDPage from './pages/CRUDPage.js';

// contexts
import { UserProvider } from './contexts/UserContext.js';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (user) => {
    setUser(user)
    console.log('the user is ', user)
  }
  
  const renderLoginPage = (props) => {
    return (
      <LoginPage
        history={props}
        handleLogin={handleLogin} />
    )
  }
  return (
    <div className="App">
        <BrowserRouter>
          <UserProvider value={{ user: user }}>
          <AppNav/>
          <Routes>
            <Route exact path="/" element={ <HomePage/> } />
            <Route exact path="/boards" element={ <MyBoardsPage/> } />
            <Route exact path="/boards/:id" element={ <BoardDetailPage/> } />
            <Route exact path="/boards/new" element={ <SelectSizePage/> } />
            <Route exact path="/boards/new/:size" element={ <CreateBoardPage/> } />
            <Route exact path="/boards/:id/edit" element={ <EditBoardPage/> } />
            {/* <Route exact path="/CRUD" element={ <CRUDPage/> } /> */}
            <Route exact path="/login" element={renderLoginPage()} />
          </Routes>
          </UserProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
