import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';


// components
import AppNav from './components/AppNav/AppNav.js';
import HomePage from './pages/HomePage.js';
import CreateBoardPage from './pages/CreateBoardPage.js';
import MyBoardsPage from './pages/MyBoardsPage.js';
import SelectSizePage from './pages/SelectSizePage.js';
import BoardDetailPage from './pages/BoardDetailPage.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppNav/>
        <Routes>
          <Route exact path="/" element={ <HomePage/> } />
          <Route exact path="/boards" element={ <MyBoardsPage/> } />
          <Route exact path="/boards/:id" element={ <BoardDetailPage/> } />
          <Route exact path="/boards/new" element={ <SelectSizePage/> } />
          <Route exact path="/boards/new/:size" element={ <CreateBoardPage/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
