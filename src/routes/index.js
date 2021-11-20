import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';

import Admin from '../views/Admin/Admin';



function Routes () {
    
  return (
      <BrowserRouter>
          <Switch>
              <Route path="/" exact component={Admin}/>
          </Switch>
      </BrowserRouter> 
  );
}

export default Routes;