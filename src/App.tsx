import React, { Fragment } from 'react';
import 'antd/dist/antd.css';
import { useRootSelector } from './store';
import { LoginRoute } from './pages/login';
import { PatientsRoute } from './pages/patients';

const Router = (): JSX.Element => {
  const route = useRootSelector((state) => state.router.route);

  switch (route) {
    case 'login':
      return <LoginRoute />;
    case 'patients':
      return <PatientsRoute />;
  }
};

const App = (): JSX.Element => {
  return (
    <Fragment>
      <header>
        <img alt="Digital Hospital Global logo" src="/images/dhg_whole.png" />
      </header>

      <main>
        <Router />
      </main>
    </Fragment>
  );
};

export default App;
