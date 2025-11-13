import { Route, Routes } from "react-router-dom";
import { Home } from "./src/pages/home";
import { ToastContainer } from "react-toastify";
import { ProtectedRoute } from "./src/config/protectedRoute";
import { Cronograma } from "./src/pages/cronograma";
import { Contato } from "./src/pages/contato";


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
        {/* <Route path="/" element={<Login />} /> */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cronograma"
          element={
            <ProtectedRoute>
              <Cronograma />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Contato"
          element={
            <ProtectedRoute>
              <Contato />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/carrinho"
          element={
            <ProtectedRoute>
              <Carrinho />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </main>
  );
}

