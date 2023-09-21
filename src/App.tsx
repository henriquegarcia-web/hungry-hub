import AppRoutes from './Routes'

import { AdminAuthProvider } from './contexts/AdminAuthContext'
import { AdminProvider } from './contexts/AdminContext'

function App() {
  return (
    <AdminAuthProvider>
      <AdminProvider>
        <AppRoutes />
      </AdminProvider>
    </AdminAuthProvider>
  )
}

export default App
