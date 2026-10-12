import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function RotaProtegida() {
  const [autenticado, setAutenticado] = useState(null);

  useEffect(() => {
    let ativo = true;

    async function verificarLogin() {
      const token = sessionStorage.getItem("token");

      if (!token) {
        if (ativo) setAutenticado(false);
        return;
      }

      try {
        const resposta = await fetch(
          "http://localhost:3333/usuarios/verificar",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!resposta.ok) {
          if (resposta.status === 401 || resposta.status === 403) {
            sessionStorage.removeItem("token");
            window.dispatchEvent(new Event("auth-change"));
          }

          if (ativo) setAutenticado(false);
          return;
        }

        if (ativo) setAutenticado(true);
      } catch (erro) {
        console.error("Erro ao verificar login:", erro);
        if (ativo) setAutenticado(false);
      }
    }

    verificarLogin();

    return () => {
      ativo = false;
    };
  }, []);

  if (autenticado === null) {
    return <p>Verificando acesso...</p>;
  }

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default RotaProtegida;