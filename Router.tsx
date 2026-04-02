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
import { PaymentStatusChecker } from "./src/components/PaymentStatusChecker";

export function Router() {
  return (
    <main>
      <ToastContainer autoClose={2000} />

      <Routes>
        {/* públicas */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cronograma" element={<Cronograma />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/admin/login" element={<LoginAdmin />} />

        {/* retorno do Mercado Pago */}
        <Route
          path="/sucesso"
          element={<PaymentStatusChecker mode="success" />}
        />
        <Route
          path="/pendente"
          element={<PaymentStatusChecker mode="pending" />}
        />
        <Route
          path="/erro"
          element={<PaymentStatusChecker mode="error" />}
        />

        {/* grupo protegido */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardAdmin />}>
            <Route path="/admin/home" element={<HomeEditor />} />
            <Route path="/admin/eventos" element={<EventosEditor />} />
            <Route path="/admin/cronograma" element={<CronogramaEditor />} />
            <Route path="/admin/depoimentos" element={<DepoimentosEditor />} />
            <Route path="/admin/config" element={<ConfigAdmin />} />
            <Route path="/admin/configInscricoes" element={<ContentEditor />} />
            <Route path="/admin/exports" element={<ExportaFormulario />} />
            <Route path="/admin/exportsServos" element={<ExportaServos />} />
          </Route>
        </Route>
      </Routes>
    </main>
  );
}