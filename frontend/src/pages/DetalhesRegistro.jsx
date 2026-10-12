import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function DetalhesRegistro() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [registro, setRegistro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarRegistro() {
      try {
        const resposta = await fetch(
          `http://localhost:3333/registros/${id}`
        );

        if (!resposta.ok) {
          throw new Error("Erro ao buscar registro");
        }

        const dados = await resposta.json();
        
        setRegistro(dados);
      } catch (erro) {
        console.error(erro);
      } finally {
        setCarregando(false);
      }
    }

    buscarRegistro();
  }, [id]);

  if (carregando) {
    return <p>Carregando registro...</p>;
  }

  if (!registro) {
    return <p>Registro não encontrado.</p>;
  }

  const materiais = registro.materiais || [];

  return (
    <main className="portfolio">
      <h1>{registro.titulo}</h1>
      <p>{registro.conteudo}</p>

      <h2>Materiais anexados</h2>

      {materiais.length === 0 ? (
        <p>Nenhum material anexado.</p>
      ) : (
        materiais.map((material) => (
            <div className="cartao" key={material.id}>
                {material.tipo === "imagem" ? (
                    <img src={material.url} alt="Material do registro" className="imagem-material"/>
                ) : material.tipo === "video" ? (
                    <video controls className="video-material">
                        <source src={material.url} />
                        Seu navegador não suporta vídeos.
                    </video>
                ) : (
                    <a href={material.url} target="_blank" rel="noreferrer">
                        Abrir material
                    </a>
                )}
            </div>
        ))
      )}

      <button className="botao" onClick={() => navigate(-1)}>
        Voltar
      </button>
    </main>
  );
}

export default DetalhesRegistro;