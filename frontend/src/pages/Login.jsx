import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function fazerLogin(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const resposta = await fetch(
        "http://localhost:3333/usuarios/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, senha })
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.mensagem || "Erro ao fazer login");
      }

      if (!dados.token) {
        throw new Error("Token não recebido");
      }

      sessionStorage.setItem("token", dados.token);

      window.dispatchEvent(new Event("auth-change"));

      navigate("/admin");

    } catch (erro) {
      setErro(erro.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="pagina-login">
      <div className="form-page-stack">
        <BotaoVoltar destino="/" />

        <form className="form-login" onSubmit={fazerLogin}>
          <h1>Login Administrativo</h1>

          <p>Acesse o painel do MARÉ</p>

          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          {erro && <p className="erro-login">{erro}</p>}

          <button type="submit" disabled={carregando}>
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>
        </div>
    </main>
  );
}

export default Login;