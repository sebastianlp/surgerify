import React from "react";
import { AuthProvider } from "./AuthContext";
import { UserProvider } from "./UserContext";
import { SnackbarProvider } from "./SnackbarContext";
import { LoaderProvider } from "./LoaderContext";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "domain/theme";

function AppProviders({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <LoaderProvider>
        <SnackbarProvider>
          <AuthProvider>
            <UserProvider>{children}</UserProvider>
          </AuthProvider>
        </SnackbarProvider>
      </LoaderProvider>
    </ThemeProvider>
  );
}

export default AppProviders;
