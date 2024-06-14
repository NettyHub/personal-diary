import React, { createContext, useContext, ReactNode, useMemo } from 'react';

interface ConfigContextType {
  apiUrl: string;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{children: ReactNode, apiUrl: string}> = ({ children, apiUrl }) => {
  const value = useMemo(() => ({ apiUrl }), [apiUrl]);

  return (
    <ConfigContext.Provider value={value}>
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
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ConfigProvider } from './ConfigContext';

const API_URL = process.env.REACT_APP_API_URL || "";

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider apiUrl={API_URL}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);