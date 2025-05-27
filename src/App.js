import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./styles/main.css";
import HelpPage from "./pages/HelpPage";
import Registration from "./pages/Registration";
import RegistrationForm from "./pages/RegistrationForm";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import AdFormPage from "./pages/AdFormPage";
import Header from "./components/Header";
import FooterDynamic from "./components/FooterDynamic";
import CatalogPage from "./pages/CatalogPage";
import ProductPage from "./pages/ProductPage";
import OrderPage from "./pages/OrderPage";
import SellerPage from "./pages/SellerPage";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ProtectedRoute from "./components/ProtectedRoute";

const clientId =
  "587875719115-mgdk3iaeh1t65f9uca8i8vlee2bql5f5.apps.googleusercontent.com";

const App = () => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <LoginPage />
                <FooterDynamic />
              </>
            }
          />
          <Route
            path="/ad-form"
            element={
              <ProtectedRoute>
                <Header />
                <AdFormPage />
                <FooterDynamic />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <Header />
                <OrderPage />
                <FooterDynamic />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <>
                <Header />
                <ProductPage />
                <FooterDynamic />
              </>
            }
          />
          <Route
            path="/help"
            element={
              <>
                <Header />
                <HelpPage />
                <FooterDynamic />
              </>
            }
          />
          <Route
            path="/registration"
            element={
              <>
                <Header />
                <Registration />
                <FooterDynamic />
              </>
            }
          />
          <Route
            path="/registration-form"
            element={
              <>
                <Header />
                <RegistrationForm />
                <FooterDynamic />
              </>
            }
          />
          <Route
            path="/main-page"
            element={
              <ProtectedRoute>
                <Header />
                <MainPage />
                <FooterDynamic />
              </ProtectedRoute>
            }
          />
          <Route
            path="/catalog-page/:sex"
            element={
              <>
                <Header />
                <CatalogPage />
                <FooterDynamic />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Header />
                <Profile />
                <FooterDynamic />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-profile-page"
            element={
              <ProtectedRoute>
                <Header />
                <EditProfile />
                <FooterDynamic />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller/:profileId"
            element={
              <>
                <Header />
                <SellerPage />
                <FooterDynamic />
              </>
            }
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
