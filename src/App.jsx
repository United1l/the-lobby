import { useState, useEffect } from "react";
import { Authenticated, Refine, } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  ThemedLayoutV2,
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import authProvider from "./authProvider";
import { Landing } from "./pages/landing/landing.jsx";
import { LogIn } from "./pages/user-form/logIn.jsx";
import { SignUp } from "./pages/user-form/signUp.jsx";
import { ForgotPassword } from "./pages/user-form/forgotPass.jsx";
import { UpdatePassword } from "./pages/user-form/updatePass.jsx";
import { SignUpSuccess } from "./pages/user-form/signUpSuccess.jsx";
import { Preferences } from "./pages/preferences/preferences.jsx";
import { CreateClub } from "./pages/create-club/create.jsx";
import { UserProfile } from "./pages/user-profile-sett/profile.jsx";
import { Dashboard } from "./pages/dashboard/dashboard.jsx";
import { WithErrorBoundary } from "./components/withErrorBoundary.jsx";
import { ArrayContextProvider } from "./components/arrayContext.jsx";
import { ColorContextProvider } from "./contexts/color-mode/colorContext.jsx";
import { supabaseClient } from "./utility";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const { palette } = createTheme();
  const { augmentColor } = palette;
  const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
  const theme = createTheme({
    palette: {
      primary: createColor('#ff725e'),
      secondary: createColor('#adb5bd'),
      white: createColor('#fff'),
    },
  });

  return (
     <BrowserRouter>
      <RefineSnackbarProvider>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" }, h1: { fontSize: 'clamp(40px, 2vw, 80px)'},
            h3: { fontSize: 'clamp(15px, 1.5vw, 30px)', color: '#343a40'}, 
            h5: {fontSize: 'clamp(14px, 1vw, 28px)', color: darkMode? '#fff': '#6c757d'},
            h6: {fontSize: 'clamp(13px, 1vw, 26px)', color: '#6c757d'},
             }} />
          <Refine routerProvider={routerBindings}
          dataProvider={dataProvider(supabaseClient)}
          resources={[
              {
                name: "GAME_CLUBS",
                create: "/create",
                list: "/dashboard",
              },

            ]}
          liveProvider={liveProvider(supabaseClient)}
          options={{ liveMode: "auto" }}
          notificationProvider={notificationProvider}
          authProvider={authProvider}
        >
        <ThemeProvider theme={theme}>
         <ColorContextProvider> 
          <ArrayContextProvider>
            <WithErrorBoundary>
              <Routes>
                <Route index element={<Landing />} />
                <Route path="register-success" element={<SignUpSuccess />} />
                <Route 
                  element={
                    <Authenticated
                      fallback={
                        <CatchAllNavigate to="/login" />
                      }>
                        <Outlet />
                    </Authenticated>  
                  }
                 >  
                  <Route path="dashboard" element={
                    <Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />} 
                    />
                  <Route path="preferences" element={<Preferences />} />
                  <Route path="create" element={<CreateClub />} />
                  <Route path="profile" element={<UserProfile />} />
                </Route>  
                <Route
                  element={
                    <Authenticated fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>  
                  }
                >
                  <Route 
                    path="/login"
                    element={<LogIn />}
                  />  
                  <Route 
                    path="/register"
                    element={<SignUp />}
                  />
                  <Route 
                    path="/forgot-password"
                    element={<ForgotPassword />}
                  />
                  <Route 
                    path="/update-password"
                    element={<UpdatePassword />}
                  />
                </Route>
                <Route
                  element={
                    <Authenticated fallback={<Outlet />}>
                      <ThemedLayoutV2>
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>  
                  }
                >
                  <Route path="*" element={<ErrorComponent />} />
                </Route>  
              </Routes>
            </WithErrorBoundary>
          </ArrayContextProvider>
          </ColorContextProvider>
          </ThemeProvider>
          <UnsavedChangesNotifier />
        </Refine>
      </RefineSnackbarProvider>
    </BrowserRouter>
  );
}


export default App;
