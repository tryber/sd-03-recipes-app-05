import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact patch="/perfil" component={() => <h1>Hello world!</h1>} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
