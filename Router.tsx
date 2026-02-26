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
import { CronogramaEditor } from "./src/pages/admin/CronogramaEditor";
import { DepoimentosEditor } from "./src/pages/admin/DepoimentosEditor";
import { ConfigAdmin } from "./src/pages/admin/components";
import { ExportaFormulario } from "./src/pages/admin/ExportaFomulario";
import { ExportaServos } from "./src/pages/admin/ExportaServos";
import { ContentEditor } from "./src/pages/admin/ContentEditor";

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
        style={{
          width: "30%",
          marginTop: "60px",
          textAlign: "center",
          zIndex: 3500,
        }}
      />

      <Routes>

        {/* ROTAS PÚBLICAS */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cronograma" element={<Cronograma />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/admin/login" element={<LoginAdmin />} />

        {/* ROTAS PROTEGIDAS DO ADMIN */}
        <Route
          path="/admin/home"
          element={
            <ProtectedRoute>
              <HomeEditor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/eventos"
          element={
            <ProtectedRoute>
              <EventosEditor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/cronograma"
          element={
            <ProtectedRoute>
              <CronogramaEditor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/depoimentos"
          element={
            <ProtectedRoute>
              <DepoimentosEditor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/config"
          element={
            <ProtectedRoute>
              <ConfigAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/configInscricoes"
          element={
            <ProtectedRoute>
              <ContentEditor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/exports"
          element={
            <ProtectedRoute>
              <ExportaFormulario />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/exportsServos"
          element={
            <ProtectedRoute>
              <ExportaServos />
            </ProtectedRoute>
          }
        />

      </Routes>
    </main>
  );
}