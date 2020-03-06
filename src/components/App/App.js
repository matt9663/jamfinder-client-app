import React from 'react';
import './App.css';
import Header from '../Header/Header'
import Dashboard from '../Dashboard/Dashboard'
import CreateBandPage from '../../routes/CreateBandPage/CreateBandPage'
import EditUserPage from '../../routes/EditUserPage/EditUserPage'
import { Switch, Route } from 'react-router-dom'
import BandsListPage from '../../routes/BandsListPage/BandsListPage'
import BandBioPage from '../../routes/BandBioPage/BandBioPage'
import LoginPage from '../../routes/LoginPage/LoginPage'
import RegisterUserPage from '../../routes/RegisterUserPage/RegisterUserPage'


function App() {
  return (
    <div className="App">
      <Header />
      <main className='app-main'>
        <Switch>
        <Route exact path='/'>
            <BandsListPage />
          </Route>
          <Route path='/dashboard'>
            <Dashboard />
          </Route>
          <Route path='/login'>
            <LoginPage />
          </Route>
          <Route path='/register'>
            <RegisterUserPage />
          </Route>
          <Route path='/bands'>
            <BandsListPage />
          </Route>
          <Route path='/create/band' component={CreateBandPage} />
          <Route path='/edit/user'>
            <EditUserPage />
          </Route>
          <Route path='/band/:id'>
            <BandBioPage />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
