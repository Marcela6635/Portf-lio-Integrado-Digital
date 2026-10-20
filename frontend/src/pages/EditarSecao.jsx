import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar";

function EditarSecao() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [origem, setOrigem] = useState("SESI");
  const [area_unidade, setAreaUnidade] = useState("");
  const [periodo, setPeriodo] = useState("anual");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarSecao() {
      try {
        const resposta = await fetch(
          `http://localhost:3333/secoes/${id}`
        );

        if (!resposta.ok) {
          throw new Error("Erro ao buscar seção");
        }

        const dados = await resposta.json();

        setNome(dados.nome);
        setOrigem(dados.origem);
        setAreaUnidade(dados.area_unidade);
        setPeriodo(dados.periodo.toLowerCase());
      } catch (erro) {
        setMensagem(erro.message);
      } finally {
        setCarregando(false);
      }
    }

    buscarSecao();
  }, [id]);

  async function salvarAlteracoes(e) {
    e.preventDefault();
    setMensagem("");

    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const resposta = await fetch(
        `http://localhost:3333/secoes/${id}`,
        {
          method: "PATCH",
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
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.mensagem || "Erro ao editar seção");
      }

      navigate("/admin/secoes");
    } catch (erro) {
      setMensagem(erro.message);
    }
  }

  if (carregando) {
    return <p>Carregando seção...</p>;
  }

  return (
    <main className="pagina-login">
      <div className="form-page-stack">
        <BotaoVoltar destino="/admin/secoes" />
      <form className="form-login" onSubmit={salvarAlteracoes}>
        <h1>Editar Seção</h1>

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

        <button type="submit">Salvar alterações</button>

        {mensagem && <p>{mensagem}</p>}
      </form>
      </div>
    </main>
  );
}

export default EditarSecao;