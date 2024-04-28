import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import ProtectedRoute from '../middleware/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import InboxPage from './pages/InboxPage';
import EmailPage from './pages/EmailPage';
import ComposePage from './pages/ComposePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <ProtectedRoute exact path="/c/inbox" component={InboxPage} />
          <ProtectedRoute exact path="/c/:emailCategory/:emailId" component={EmailPage} />
          <ProtectedRoute exact path="/compose" component={ComposePage} />
          <Route exact path="/" render={() => <Redirect to="/c/inbox" />} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
