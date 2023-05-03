import React, { Fragment } from 'react';
import 'antd/dist/antd.css';
import { useRootSelector } from './store';
import { Login } from './pages/Login';
import { Patients } from './pages/Patients';

const Router = (): JSX.Element => {
  const route = useRootSelector((state) => state.router.route);

  switch (route) {
    case 'login':
      return <Login />;
    case 'patients':
      return <Patients />;
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
