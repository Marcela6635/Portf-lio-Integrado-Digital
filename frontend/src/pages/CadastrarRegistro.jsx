import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar";

function CadastrarRegistro() {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [bimestre, setBimestre] = useState("");
  const [destaque, setDestaque] = useState(false);
  const [secao_id, setSecaoId] = useState("");
  const [secoes, setSecoes] = useState([]);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    async function buscarSecoes() {
      try {
        const resposta = await fetch("http://localhost:3333/secoes");

        if (!resposta.ok) {
          throw new Error("Erro ao buscar seções");
        }

        const dados = await resposta.json();
        setSecoes(dados);
      } catch (erro) {
        console.error(erro);
        setMensagem("Erro ao carregar seções.");
      }
    }

    buscarSecoes();
  }, []);

  const secaoSelecionada = secoes.find(
    (secao) => secao.id === secao_id
  );

  const bimestral =
    secaoSelecionada?.periodo?.toLowerCase() === "bimestral";

  async function cadastrar(e) {
    e.preventDefault();
    setMensagem("");

    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const resposta = await fetch("http://localhost:3333/registros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          titulo,
          conteudo,
          bimestre: bimestral ? bimestre : null,
          destaque,
          secao_id
        })
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.mensagem || "Erro ao cadastrar registro");
      }

      setMensagem("Registro cadastrado com sucesso!");
      setTitulo("");
      setConteudo("");
      setBimestre("");
      setSecaoId("");

    } catch (erro) {
      setMensagem(erro.message);
    }
  }

  return (
    <main className="pagina-login">
      <div className="form-page-stack">
        <BotaoVoltar destino="/admin/registros" />
      <form className="form-login" onSubmit={cadastrar}>
        <h1>Cadastrar Registro</h1>

        <label>Título</label>
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <label>Conteúdo</label>
        <textarea
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          required
          rows="5"
        />

        <label>Seção</label>
        <select
          value={secao_id}
          onChange={(e) => {
            setSecaoId(e.target.value);
            setBimestre("");
          }}
          required
        >
          <option value="">Selecione uma seção</option>

          {secoes.map((secao) => (
            <option key={secao.id} value={secao.id}>
              {secao.origem} - {secao.area_unidade} - {secao.nome}
            </option>
          ))}
        </select>

        {bimestral && (
          <>
            <label>Bimestre</label>
            <select
              value={bimestre}
              onChange={(e) => setBimestre(e.target.value)}
              required
            >
              <option value="">Selecione o bimestre</option>
              <option value="1º">1º Bimestre</option>
              <option value="2º">2º Bimestre</option>
              <option value="3º">3º Bimestre</option>
              <option value="4º">4º Bimestre</option>
            </select>
          </>
        )}

        <label className="campo-destaque">
          <input
            type="checkbox"
            checked={destaque}
            onChange={(e) => setDestaque(e.target.checked)}
          />
          Exibir este projeto em destaque no Portfólio
        </label>

        <button type="submit">Cadastrar registro</button>

        {mensagem && <p>{mensagem}</p>}

      </form>
      </div>
    </main>
  );
}

export default CadastrarRegistro;