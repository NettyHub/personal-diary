// src/ConfigContext.tsx

import React, { createContext, useContext, ReactNode } from 'react';

interface ConfigContextType {
  apiUrl: string | undefined;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{children: ReactNode, apiUrl: string | undefined}> = ({ children, apiUrl }) => {
  return (
    <ConfigContext.Provider value={{ apiUrl }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
```
```typescript
// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ConfigProvider } from './ConfigContext';

const API_URL = process.env.REACT_APP_API_URL;

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider apiUrl={API_URL}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```
```typescript
// In any component, e.g., src/App.tsx or another component

import React from 'react';
import { useConfig } from './ConfigContext';

const YourComponent = () => {
  const { apiUrl } = useConfig(); // This is how you access the apiUrl anywhere in your app

  // Use apiUrl for your API calls or any logic
  console.log('API URL:', apiUrl);

  return <div>Your Component with API URL: {apiUrl}</div>;
};

export default YourComponent;