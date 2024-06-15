// ErrorBoundary.tsx
import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h2>Something went wrong.</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```
```tsx
// Modified part of your ReactDOM.render in the entry file
import ReactDOM from 'react-dom';
import App from './App';
import { ConfigProvider } from './ConfigContext';
import ErrorBoundary from './ErrorBoundary'; // Import the ErrorBoundary

const API_URL = process.env.REACT_APP_API_URL || "";

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary> {/* Wrap your components with ErrorBoundary */}
      <ConfigProvider apiUrl={API_URL}>
        <App />
      </ConfigProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);