import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { PublicClientApplication, InteractionType } from "@azure/msal-browser";
import { MsalProvider, MsalAuthenticationTemplate } from "@azure/msal-react";
import { msalConfig, appRoles } from "./authConfig";
import { AppGuard } from './AppGuard';

const msalInstance = new PublicClientApplication(msalConfig);


ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <MsalAuthenticationTemplate
        interactionType={InteractionType.Redirect}
      >
        <AppGuard exact roles={[appRoles.Admin]}>
          <App/>
        </AppGuard>
      </MsalAuthenticationTemplate>
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals