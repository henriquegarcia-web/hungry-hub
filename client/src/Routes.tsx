import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import {
  AdminPage,
  AdminSigninPage,
  AdminSignupPage,
  CompanyMenuPage,
  LandingPage,
  NotFoundPage,
  PremiumStatusPage
} from './pages'

import { useAdminAuth } from './contexts/AdminAuthContext'

const AppRoutes = () => {
  const { isAdminLogged } = useAdminAuth()

  return (
    <BrowserRouter>
      <Routes>
        {/* =============================================================== */}

        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/*" element={<Navigate to="/" />} /> */}

        {/* =============================================================== */}

        <Route path="/:companyId" element={<CompanyMenuPage />} />
        <Route
          path="/teste/:companyId"
          element={<CompanyMenuPage isTestMode />}
        />

        {/* =============================================================== */}

        <Route
          path="/admin/entrar"
          element={
            <PublicRoute isAuthenticated={isAdminLogged}>
              <AdminSigninPage />
            </PublicRoute>
          }
        />
        <Route
          path="/admin/cadastrar"
          element={
            <PublicRoute isAuthenticated={isAdminLogged}>
              <AdminSignupPage />
            </PublicRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateAdminRoute isAuthenticated={isAdminLogged}>
              <AdminPage />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/:viewId"
          element={
            <PrivateAdminRoute isAuthenticated={isAdminLogged}>
              <AdminPage />
            </PrivateAdminRoute>
          }
        />

        {/* =============================================================== */}

        <Route
          path="/obter-premium-sucesso"
          element={<PremiumStatusPage statusId="sucesso" />}
        />
        <Route
          path="/obter-premium-cancelado"
          element={<PremiumStatusPage statusId="cancelado" />}
        />

        {/* =============================================================== */}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

// =========================================== ROUTES

interface RouteProps {
  isAuthenticated: boolean
  children: React.ReactNode
}

const PrivateAdminRoute = ({ isAuthenticated, children }: RouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/admin/entrar" replace />
  }

  return children
}

const PublicRoute = ({ isAuthenticated, children }: RouteProps) => {
  if (isAuthenticated) {
    return <Navigate to="/admin/estabelecimento" />
  }

  return children
}
