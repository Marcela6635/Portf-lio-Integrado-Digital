import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Secao({ origem }) {
  const { area } = useParams();

  const [secoes, setSecoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarSecoes() {
      setCarregando(true);

      try {
        const resposta = await fetch(
          `http://localhost:3333/secoes?origem=${origem}`
        );

        if (!resposta.ok) {
          throw new Error("Erro ao buscar seções");
        }

        const dados = await resposta.json();
        setSecoes(dados);
      } catch (erro) {
        console.error(erro);
        setSecoes([]);
      } finally {
        setCarregando(false);
      }
    }

    buscarSecoes();
  }, [origem]);

  const areas = [
    ...new Set(secoes.map((secao) => secao.area_unidade))
  ].filter(Boolean);

  const secoesFiltradas = secoes.filter(
    (secao) => secao.area_unidade === area
  );

  if (carregando) {
    return <p>Carregando...</p>;
  }

  return (
    <main className="portfolio">
      {area ? (
        <>
          <h1>{area}</h1>
          <h2>Seções do portfólio</h2>

          <div className="opcoes">
            {secoesFiltradas.map((secao) => (
                <Link
                    to={`/registros/${secao.id}`}
                    className="cartao link-cartao"
                    key={secao.id}
                >
                    <h3>{secao.nome}</h3>
                    <p>Período: {secao.periodo}</p>
                </Link>
            ))}
          </div>

          {secoesFiltradas.length === 0 && (
            <p>Nenhuma seção cadastrada nesta área.</p>
          )}

          <Link to={`/${origem.toLowerCase()}`}>
            Voltar para áreas
          </Link>
        </>
      ) : (
        <>
          <h1>Portfólio {origem}</h1>

          <h2>
            {origem === "SESI"
              ? "Áreas do conhecimento"
              : "Unidades curriculares"}
          </h2>

          <div className="opcoes">
            {areas.map((nomeArea) => (
              <Link
                to={`/${origem.toLowerCase()}/${encodeURIComponent(nomeArea)}`}
                className="cartao link-cartao"
                key={nomeArea}
              >
                <h3>{nomeArea}</h3>
                <p>
                  {
                    secoes.filter(
                      (secao) => secao.area_unidade === nomeArea
                    ).length
                  }{" "}
                  seções cadastradas
                </p>
              </Link>
            ))}
          </div>

          {areas.length === 0 && (
            <p>Nenhuma área ou unidade cadastrada.</p>
          )}
        </>
      )}
    </main>
  );
}

export default Secao;