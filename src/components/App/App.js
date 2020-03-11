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
import EditBandPage from '../../routes/EditBandPage/EditBandPage'
import PrivateRoute from '../../route-validation/PrivateRoute'
import PublicOnlyRoute from '../../route-validation/PublicOnlyRoute'


function App() {
  return (
    <div className="App">
      <Header />
      <main className='app-main'>
        <Switch>
          <Route exact path='/'>
            <BandsListPage/>
          </Route>
          <PrivateRoute 
            path='/dashboard'
            component={Dashboard}
          />
          <PublicOnlyRoute 
            path='/login'
            component={LoginPage} 
          />
          <PublicOnlyRoute 
            path='/register'
            component={RegisterUserPage}
          />
          <Route path='/bands'>
            <BandsListPage />
          </Route>
          <PrivateRoute 
            path='/create/band' 
            component={CreateBandPage}
          />
          <PrivateRoute 
            path='/edit/user'
            component={EditUserPage}
          />
          <PrivateRoute
           path='/edit/band/:band_id'
            component={EditBandPage}
          />
          <PrivateRoute
            path='/band/:id'
            component={BandBioPage} 
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
