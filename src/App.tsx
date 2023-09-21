import AppRoutes from './Routes'

import { AdminProvider } from './contexts/AdminContext'

function App() {
  return (
    <AdminProvider>
      <AppRoutes />
    </AdminProvider>
  )
}

export default App
