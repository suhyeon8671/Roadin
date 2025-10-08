import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext'; // AuthProvider를 import 합니다.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* App 컴포넌트를 AuthProvider로 감쌉니다. */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
