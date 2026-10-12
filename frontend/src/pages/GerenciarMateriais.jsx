import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function GerenciarMateriais() {
  const [materiais, setMateriais] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function buscarMateriais() {
      try {
        const resposta = await fetch(
          "http://localhost:3333/materiais"
        );

        if (!resposta.ok) {
          throw new Error("Erro ao buscar materiais.");
        }

        const dados = await resposta.json();
        setMateriais(dados);
      } catch (erro) {
        setErro(erro.message);
      } finally {
        setCarregando(false);
      }
    }

    buscarMateriais();
  }, []);

  async function excluirMaterial(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este material?"
    );

    if (!confirmar) return;

    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("Você precisa fazer login.");
      return;
    }

    try {
      const resposta = await fetch(
        `http://localhost:3333/materiais/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!resposta.ok) {
        throw new Error("Erro ao excluir material.");
      }

      setMateriais((anteriores) =>
        anteriores.filter((material) => material.id !== id)
      );

      alert("Material excluído com sucesso!");
    } catch (erro) {
      alert(erro.message);
    }
  }

  if (carregando) {
    return <p>Carregando materiais...</p>;
  }

  return (
    <main className="portfolio">
      <h1>Gerenciar Materiais</h1>

      <Link
        to="/admin/materiais/novo"
        className="botao"
      >
        + Novo material
      </Link>

      {erro && <p>{erro}</p>}

      {materiais.length === 0 && !erro && (
        <p>Nenhum material cadastrado.</p>
      )}

      <div className="opcoes">
        {materiais.map((material) => (
          <div className="cartao" key={material.id}>
            <h3>{material.tipo}</h3>

            {material.tipo === "imagem" && (
              <img
                src={material.url}
                alt="Material cadastrado"
                style={{
                  width: "100%",
                  maxHeight: "180px",
                  objectFit: "contain"
                }}
              />
            )}

            <p>
              <a
                href={material.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir material
              </a>
            </p>

            <div className="acoes-secao">
              <Link to={`/admin/materiais/editar/${material.id}`} className="botao"> Editar </Link>
              <button className="botao-excluir" onClick={() => excluirMaterial(material.id)}> Excluir </button>
            </div>
          </div>
        ))}
      </div>

      <Link to="/admin">Voltar ao painel</Link>
    </main>
  );
}

export default GerenciarMateriais;