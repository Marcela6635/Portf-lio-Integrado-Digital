import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [ logado, setLogado ] = useState(
        Boolean(sessionStorage.getItem("token"))
    );

    useEffect(() => {
        function atualizarLogin(){
            setLogado(Boolean(sessionStorage.getItem("token")));
        }

        window.addEventListener("auth-change", atualizarLogin);

        return () => {
            window.removeEventListener("auth-change", atualizarLogin);
        };
    }, []);

  return (
    <header className="cabecalho">
      <h2>MARÉ</h2>

      <nav>
        <a href="/">Início</a>
        <a href="#sobreMim">Sobre Mim</a>
        <a href="#portfolio">Portfólio</a>
        <a href="#contato">Contato</a>

        <Link
        to={logado ? "/admin" : "/login"}
        className={`icone-usuario ${logado ? "usuario-logado" : ""}`}
        title={logado ? "Painel Administrativo" : "Entrar"}
        aria-label={logado ? "Painel Administrativo" : "Entrar"}
        >
            
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
        </Link>
      </nav>
      
    </header>
  );
}

export default Navbar;