import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import { ThemeProvider } from "./components/ThemeProvider/themeProvider.jsx";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar.jsx";
import "./index.css";
import AuthProvider from "./services/AuthProvider.jsx";
import store, { persistor } from "./store/store.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
           <AuthProvider>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              <SidebarProvider>
                <SidebarInset>
                  <App />
                </SidebarInset>
              </SidebarProvider>
            </ThemeProvider>
           </AuthProvider>
          <Toaster position="top-right" />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
