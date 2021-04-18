import React from 'react';
import { Route, Switch } from "react-router-dom";

import MenuTop from '../components/MenuTop'
import './LayoutBasic.scss'

export default function LayoutBasic(props) {
    const { routes } = props;

    return (
    <div className='contenido'>
      
     
      <MenuTop/>
      <LoadRoutes routes={routes} />

   
      
      
    </div>

    )
}


function LoadRoutes({ routes }) {
    return (
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
      </Switch>
    );
  }