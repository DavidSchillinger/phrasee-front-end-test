import React from 'react';
import 'antd/dist/antd.css';
import { useRootSelector } from './store';
import { Login } from './pages/Login';
import { Patients } from './pages/Patients';

const App = (): JSX.Element => {
  const route = useRootSelector((state) => state.router.route);

  switch (route) {
    case 'login':
      return <Login />;
    case 'patients':
      return <Patients />;
  }
};

export default App;
