
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { consumeLegacyLanguageQuery, getInitialLanguage, loadLanguageResources } from './i18n';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const renderApp = async () => {
  const initialLanguage = getInitialLanguage();
  try {
    await loadLanguageResources(initialLanguage);
  } catch (error) {
    console.error('Initial language resources could not be loaded:', error);
  }
  consumeLegacyLanguageQuery();

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>
  );
};

void renderApp().catch(error => {
  console.error('Application startup failed:', error);
  rootElement.replaceChildren();
  const message = document.createElement('p');
  message.textContent = '페이지를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.';
  const retry = document.createElement('button');
  retry.textContent = '다시 불러오기';
  retry.onclick = () => window.location.reload();
  rootElement.append(message, retry);
});
