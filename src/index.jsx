import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';

import App from './App';

const rootEl = document.createElement('div');
document.body.appendChild(rootEl);

render((
  <Router>
    <Switch>
      <Route path='/' component={App} />
    </Switch>
  </Router>
), rootEl);
