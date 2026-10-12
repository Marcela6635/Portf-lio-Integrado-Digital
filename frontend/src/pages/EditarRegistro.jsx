import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditarRegistro() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [secao_id, setSecaoId] = useState("");
  const [bimestre, setBimestre] = useState("");
  const [secoes, setSecoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    async function buscarDados() {
      try {
        const [respostaRegistro, respostaSecoes] = await Promise.all([
          fetch(`http://localhost:3333/registros/${id}`),
          fetch("http://localhost:3333/secoes")
        ]);

        if (!respostaRegistro.ok || !respostaSecoes.ok) {
          throw new Error("Erro ao carregar os dados.");
        }

        const registro = await respostaRegistro.json();
        const listaSecoes = await respostaSecoes.json();

        setTitulo(registro.titulo);
        setConteudo(registro.conteudo);
        setSecaoId(registro.secao_id);
        setBimestre(registro.bimestre || "");
        setSecoes(listaSecoes);
      } catch (erro) {
        setMensagem(erro.message);
      } finally {
        setCarregando(false);
      }
    }

    buscarDados();
  }, [id]);

  const secaoSelecionada = secoes.find(
    (secao) => secao.id === secao_id
  );

  const bimestral =
    secaoSelecionada?.periodo?.toLowerCase() === "bimestral";

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
        `http://localhost:3333/registros/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            titulo,
            conteudo,
            secao_id,
            bimestre: bimestral ? bimestre : null
          })
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.mensagem || "Erro ao editar registro.");
      }

      navigate("/admin/registros");
    } catch (erro) {
      setMensagem(erro.message);
    }
  }

  if (carregando) {
    return <p>Carregando registro...</p>;
  }

  return (
    <main className="pagina-login">
      <form className="form-login" onSubmit={salvarAlteracoes}>
        <h1>Editar Registro</h1>

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
          rows="5"
          required
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

        <button type="submit">Salvar alterações</button>

        {mensagem && <p>{mensagem}</p>}
      </form>
    </main>
  );
}

export default EditarRegistro;