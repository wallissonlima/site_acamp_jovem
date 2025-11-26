import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./src/pages/home";
import { ToastContainer } from "react-toastify";
import { ProtectedRoute } from "./src/config/protectedRoute";
import { Cronograma } from "./src/pages/cronograma";
import { Contato } from "./src/pages/contato";
import { LoginAdmin } from "./src/pages/admin/login";
import { DashboardAdmin } from "./src/pages/admin/DashboardAdmin";
import { EventosEditor } from "./src/pages/admin/EventosEditor";
import { HomeEditor } from "./src/pages/admin/HomeEditor";

export function Router() {
  return (
    <main>
      <ToastContainer
        newestOnTop
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ width: '30%', marginTop: '60px', textAlign: 'center', zIndex: 3500 }}
      />

      <Routes>

        {/* ROTAS PÚBLICAS */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cronograma" element={<Cronograma />} />
        <Route path="/contato" element={<Contato />} />

        {/* ROTAS DO ADMIN */}
        <Route path="/admin/home" element={<HomeEditor />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/eventos" element={<EventosEditor />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <HomeEditor />
            </ProtectedRoute>
          }
        />

      </Routes>
    </main>
  );
}
