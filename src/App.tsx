import { useMemo } from 'react'
import AppRoutes from './Routes'

import { AdminAuthProvider } from './contexts/AdminAuthContext'
import { AdminProvider, useAdmin } from './contexts/AdminContext'

import { ConfigProvider, theme } from 'antd'

function App() {
  return (
    <AdminAuthProvider>
      <AdminProvider>
        <AppThemed />
      </AdminProvider>
    </AdminAuthProvider>
  )
}

export default App

const AppThemed = () => {
  const { adminTheme } = useAdmin()

  const themeSelected = useMemo(() => {
    return adminTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
  }, [adminTheme])

  return (
    <ConfigProvider
      theme={{
        algorithm: themeSelected,
        token: {
          colorPrimary: '#FF7A00'
        }
      }}
    >
      <AppRoutes />
    </ConfigProvider>
  )
}
