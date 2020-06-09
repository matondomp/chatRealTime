import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import Pag from './pages/chat';
import Login from './pages/login'


export default function Routers(){

      return (
        <BrowserRouter>
        
        <Switch>
           <Route path="/" exact component={ Pag } />
           <Route path="/login" exact component={Login} />
       </Switch>

        </BrowserRouter>
    );  
    
}

 