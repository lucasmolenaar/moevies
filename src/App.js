import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from '@mui/material';

import Header from './components/Header/Header';
import Trending from './pages/Trending/Trending';
import SimpleBottomNavigation from './components/Navigation/Navigation';
import Movies from './pages/Movies/Movies';
import Series from './pages/Series/Series';
import Search from './pages/Search/Search';
import MovieDescription from "./pages/MovieDescription/MovieDescription";
import SerieDescription from "./pages/SerieDescription/SerieDescription";
import Account from "./pages/Account/Account";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import './App.css';
import AccountSettings from "./pages/AccountSettings/AccountSettings";
import Watchlist from "./pages/Watchlist/Watchlist";

function App() {
  return (
    <div className="App">
        <Header />

        {/*<Container>*/}
          <Switch>
            <Route path='/movies/:movieId'>
              <MovieDescription />
            </Route>

            <Route path='/series/:serieId'>
              <SerieDescription />
            </Route>

            <Route exact path='/movies'>
              <Movies />
            </Route>

            <Route exact path='/series'>
              <Series />
            </Route>

            <Route exact path='/search'>
              <Search />
            </Route>

            <Route exact path='/'>
              <Trending />
            </Route>

            <Route exact path='/account'>
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            </Route>

            <Route exact path='/account/settings'>
              <ProtectedRoute>
                <AccountSettings />
              </ProtectedRoute>
            </Route>

            <Route exact path='/account/watchlist'>
              <ProtectedRoute>
                <Watchlist />
              </ProtectedRoute>
            </Route>
          </Switch>
          {/*</Container>*/}

        

        <SimpleBottomNavigation />
    </div>
  );
}

export default App;
