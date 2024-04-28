import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  Navigate
} from "react-router-dom"

import { useContext, useState } from "react"

import { RootLayout } from "./pages/RootLayout"
import { AuthContext, AuthContextProvider } from "./components/AuthContext"
import { LoginPage } from "./pages/users/LoginPage"
import { RegisterPage } from "./pages/users/RegisterPage"

import { NotFoundPage } from "./pages/NotFoundPage"

import { ProductListPage } from "./pages/products/ProductListPage"
import { AdminProductListPage } from "./pages/admin/AdminProductListPage"
import { EditProductPage } from "./pages/products/EditProductPage"
import { NewProductPage } from "./pages/products/NewProductPage"
import { ProfilePage } from "./pages/users/ProfilePage"
import { AdminLayout } from "./pages/admin/AdminLayout"
import { ProductPage } from "./pages/products/ProductPage"
import { AdminOrderListPage } from "./pages/admin/AdminOrderListPage"

const ProtectedRoute = ({ allowedRoles = ["user", "admin"] }) => {
  const { user, initialLoading } = useContext(AuthContext)

  if (initialLoading) return null

  if (user && allowedRoles.includes(user.role)) {
    return <Outlet />
  }

  return <Navigate to="/" />
}

const RedirectIfLoggedIn = () => {
  const { user, initialLoading } = useContext(AuthContext)

  if (initialLoading) return null

  if (user) {
    return <Navigate to="/" />
  }

  return <Outlet />
}

export const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<ProductListPage />} />
        <Route path="products/:productId" element={<ProductPage />} />
        <Route element={<ProtectedRoute />}>
          <>
            <Route path="profile" element={<ProfilePage />} />
          </>
        </Route>

        <Route
          path="admin"
          element={<ProtectedRoute allowedRoles={["admin"]} />}
        >
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="products" replace />} />
            <Route
              path="products"
              element={<AdminProductListPage canEdit={true} />}
            />
            <Route path="orders" element={<AdminOrderListPage />} />
            <Route path="products/new" element={<NewProductPage />} />
            <Route
              path="products/edit/:productId"
              element={<EditProductPage />}
            />
          </Route>
        </Route>

        <Route element={<RedirectIfLoggedIn />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  )

  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  )
}

export default App