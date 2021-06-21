import React from 'react';
import { Route, Switch } from 'react-router-dom';
import EmployeePage from '../pages/EmployeePage';
import FileReimbursementPage from '../pages/FileReimbursementPage';
import LoginPage from '../pages/LoginPage';


const AppRoutes: React.FC<unknown> = (props) => {

  return (
    <Switch>
      <Route exact path='/'>
        <LoginPage />
      </Route>
      <Route path='/employee'>
        <EmployeePage />
      </Route>
      <Route path='/new'>
        <FileReimbursementPage />
      </Route>
    </Switch>
  );
};

export default AppRoutes;
