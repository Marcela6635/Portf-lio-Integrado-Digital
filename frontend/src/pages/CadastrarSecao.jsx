import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar";

function CadastrarSecao() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [origem, setOrigem] = useState("SESI");
  const [area_unidade, setAreaUnidade] = useState("");
  const [periodo, setPeriodo] = useState("anual");
  const [mensagem, setMensagem] = useState("");

  async function cadastrar(e) {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const resposta = await fetch("http://localhost:3333/secoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          nome,
          origem,
          area_unidade,
          periodo
        })
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.mensagem || "Erro ao cadastrar seção");
      }

      setMensagem("Seção cadastrada com sucesso!");
      setNome("");
      setAreaUnidade("");

    } catch (erro) {
      setMensagem(erro.message);
    }
  }

  return (
    <main className="pagina-login">
      <div className="form-page-stack">
        <BotaoVoltar destino="/admin/secoes" />
        <form className="form-login" onSubmit={cadastrar}>
          <h1>Cadastrar Seção</h1>

          <label>Nome da seção</label>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <label>Origem</label>
          <select
            value={origem}
            onChange={(e) => setOrigem(e.target.value)}
          >
            <option value="SESI">SESI</option>
            <option value="SENAI">SENAI</option>
          </select>

          <label>Área ou unidade curricular</label>
          <input
            value={area_unidade}
            onChange={(e) => setAreaUnidade(e.target.value)}
            required
          />

          <label>Período</label>
          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
          >
            <option value="anual">Anual</option>
            <option value="bimestral">Bimestral</option>
          </select>

          <button type="submit">Cadastrar seção</button>

          {mensagem && <p>{mensagem}</p>}
        </form>
        </div>
    </main>
  );
}

export default CadastrarSecao;