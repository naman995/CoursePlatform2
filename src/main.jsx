import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";

const ErrorBoundary = lazy(() => import("@/layout/ErrorBoundary"));

import App from "./App";
import "./index.css";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ErrorBoundary>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AbFMc6quCO3YSQRGpcwyrGvkI6E0dU62z9ctZlW_jvMdpTGh7wdLHe3qt4SG8rge8N_j3d8W-ijjKh2f",
          currency: "USD",
          components: "buttons",
        }}
      >
        <App />
      </PayPalScriptProvider>
    </ErrorBoundary>
  </StrictMode>
);
