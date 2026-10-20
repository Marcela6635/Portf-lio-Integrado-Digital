import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

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
    <header className="header">
        <div className="header-container">
            <div className="header-logo">
                <h2>MARÉ</h2>
                <span>PORTFÓLIO INTEGRADO DIGITAL</span>
            </div>

            <nav className="header-links">
                <NavLink to="/" end className={({ isActive }) => isActive ? "link-ativo" : ""} >
                Início
                </NavLink>

                <NavLink to="/sobre-mim" className={({ isActive }) => isActive ? "link-ativo" : ""}>
                Sobre Mim
                </NavLink>

                <NavLink to="/portfolio" className={({ isActive }) => isActive ? "link-ativo" : ""}>
                Portfólio
                </NavLink>
            </nav>

            <div className="icone-login">
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
            </div>
      </div>
    </header>
  );
}

export default Navbar;