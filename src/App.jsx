import { useState } from "react";
import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  ThemedTitleV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import authProvider from "./authProvider";
import { Landing } from "./pages/landing/landing.jsx";
import { FormCheck } from "./pages/user-form/userForm.jsx";
import { supabaseClient } from "./utility";

function App() {
  const boolData = window.localStorage.getItem('boolData');
  const [signUp, setSignUP] = useState(boolData);

  return (
    <BrowserRouter>
      <Refine routerProvider={routerProvider}>
        <Routes>
          <Route index element={<Landing setSignUP={setSignUP} />} />
          <Route path="user-form" element={<FormCheck signUp={signUp} setSignUP={setSignUP} />} />
        </Routes>
      </Refine>
    </BrowserRouter>
  );
}

export default App;
