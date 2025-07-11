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
import AdminPage from "./pages/AdminPage";
import ModeratorPage from "./pages/ModeratorPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

const clientId = "87878886399-243c9hj3ir6ehci7eabnmls7tr042cb2.apps.googleusercontent.com";

const App = () => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
    <Router>
      <AuthProvider>
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
            path="/admin"
            element={
              <ProtectedRoute>
                <Header />
                <AdminPage />
                <FooterDynamic />
              </ProtectedRoute>
            }
          />
          <Route
            path="/moderator"
            element={
              <ProtectedRoute>
                <Header />
                <ModeratorPage />
                <FooterDynamic />
              </ProtectedRoute>
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
            path="/seller/:id"
            element={
              <>
                <Header />
                <SellerPage />
                <FooterDynamic />
              </>
            }
          />
          </Routes>
      </AuthProvider>
    </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
