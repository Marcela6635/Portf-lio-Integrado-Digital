import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar";

function GerenciarSecoes() {
  const [secoes, setSecoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

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
      } finally {
        setCarregando(false);
      }
    }

    buscarSecoes();
  }, []);

    async function excluirSecao(id) {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir esta seção?"
        );

        if (!confirmar) return;

        const token = sessionStorage.getItem("token");

        if (!token) {
            alert("Você precisa fazer login.");
            return;
        }

        try {
            const resposta = await fetch(
            `http://localhost:3333/secoes/${id}`,
            {
                method: "DELETE",
                headers: {
                Authorization: `Bearer ${token}`
                }
            }
            );

            if (!resposta.ok) {
            throw new Error("Erro ao excluir seção");
            }

            setSecoes(secoes.filter((secao) => secao.id !== id));

            alert("Seção excluída com sucesso!");
        } catch (erro) {
            console.error(erro);
            alert("Não foi possível excluir a seção.");
        }
}

  return (
    <main className="portfolio">
      <div className="page-back-row"><BotaoVoltar destino="/admin" /></div>
        <h1>Gerenciar Seções</h1>

        <Link to="/admin/secoes/nova" className="botao">
          + Nova seção
        </Link>

        {carregando ? (
          <p>Carregando seções...</p>
        ) : secoes.length === 0 ? (
          <p>Nenhuma seção cadastrada.</p>
        ) : (
          <div className="opcoes">
            {secoes.map((secao) => (
                <div className="cartao" key={secao.id}>
                  <h3>{secao.nome}</h3>
                  <p>Origem: {secao.origem}</p>
                  <p>Área/Unidade: {secao.area_unidade}</p>
                  <p>Período: {secao.periodo}</p>
                  
                  <div className="acoes-secao">
                  <Link to={`/admin/secoes/editar/${secao.id}`} className="botao"> Editar </Link>
                  <button className="botao-excluir" onClick={() => excluirSecao(secao.id)}> Excluir </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </main>
  );
}

export default GerenciarSecoes;