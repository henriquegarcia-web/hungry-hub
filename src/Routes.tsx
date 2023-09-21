import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// import { } from './pages'

// import { useAdminAuth } from './contexts/AdminAuthContext'

const AppRoutes = () => {
  // const { isAdminLogged } = useAdminAuth()

  return (
    <BrowserRouter>
      <Routes>
        {/* =============================================================== */}

        <Route path="/" element={<></>} />

        {/* <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<Navigate to="/" />} /> */}

        {/* =============================================================== */}

        {/* <Route path="/:companyId" element={<CompanyAppPage />} />
        <Route path="/:companyId/not-found" element={<NotFoundPage />} /> */}

        {/* =============================================================== */}

        {/* <Route
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
        /> */}

        {/* =============================================================== */}

        {/* <Route
          path="/admin/checkout"
          element={
            <PrivateAdminRoute isAuthenticated={isAdminLogged}>
              <CheckoutPage />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/checkout-status/:statusId"
          element={<CheckoutStatusPage />}
        /> */}

        {/* =============================================================== */}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

// =========================================== ROUTES

// interface RouteProps {
//   isAuthenticated: boolean
//   children: React.ReactNode
// }

// const PrivateAdminRoute = ({ isAuthenticated, children }: RouteProps) => {
//   if (!isAuthenticated) {
//     return <Navigate to="/admin/entrar" replace />
//   }

//   return children
// }

// const PublicRoute = ({ isAuthenticated, children }: RouteProps) => {
//   if (isAuthenticated) {
//     return <Navigate to="/admin" replace />
//   }

//   return children
// }
