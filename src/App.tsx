import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { MyTheme } from './config/theme/MyTheme';
import { AppRoutes } from './routes/AppRoutes';
import './index.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MyTheme>
        <div style={{ margin: 0, padding: 0, width: '100%', height: '100%' }}>
          <AppRoutes />
        </div>
      </MyTheme>
    </Provider>
  );
};

export default App;
