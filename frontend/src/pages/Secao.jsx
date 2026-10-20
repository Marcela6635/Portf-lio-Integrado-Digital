
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar";
import {
  BookOpen,
  FlaskConical,
  Earth,
  Calculator,
  Code,
  Laptop,
  FolderOpen
} from "lucide-react";

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

  // ÍCONES DAS ÁREAS
  function escolherIcone(nome) {
    const texto = nome.toLowerCase();

    if (texto.includes("linguagens")) return <BookOpen />;
    if (texto.includes("natureza")) return <FlaskConical />;
    if (texto.includes("humanas")) return <Earth />;
    if (texto.includes("matemática")) return <Calculator />;
    if (texto.includes("front")) return <Laptop />;
    if (texto.includes("programação")) return <Code />;

    return <FolderOpen />;
  }

  if (carregando) {
    return <p>Carregando...</p>;
  }

  return (
    <main className="pagina-areas">
      <div className="areas-container">

        <div className="page-back-row">
          <BotaoVoltar
            destino={area ? `/${origem.toLowerCase()}` : "/"}
          />
        </div>

        {area ? (
          <>
            <div className="areas-cabecalho">
              <span className="areas-etiqueta">{origem}</span>
              <h1>{area}</h1>
              <p>Escolha uma seção para visualizar os registros:</p>
            </div>

            <div className="areas-grid">
              {secoesFiltradas.map((secao) => (
                <Link
                  to={`/registros/${secao.id}`}
                  className="area-card"
                  key={secao.id}
                >
                  <div className="area-icone">
                    <FolderOpen size={36} strokeWidth={1.5} />
                  </div>

                  <h3>{secao.nome}</h3>
                  <p>Período: {secao.periodo}</p>
                </Link>
              ))}
            </div>

            {secoesFiltradas.length === 0 && (
              <p>Nenhuma seção cadastrada nesta área.</p>
            )}
          </>
        ) : (
          <>
            <div className="areas-cabecalho">
              <div className="areas-titulo">
                <h1>
                  {origem === "SESI"
                    ? "Áreas do Conhecimento"
                    : "Unidades Curriculares"}
                </h1>

                <span className="areas-etiqueta">{origem}</span>
              </div>

              <p>
                {origem === "SESI"
                  ? "Escolha uma área para visualizar os registros:"
                  : "Escolha uma unidade curricular para explorar:"}
              </p>
            </div>

            <div className="areas-grid">
              {areas.map((nomeArea) => (
                <Link
                  to={`/${origem.toLowerCase()}/${encodeURIComponent(nomeArea)}`}
                  className="area-card"
                  key={nomeArea}
                >
                  <div className="area-icone">
                    {escolherIcone(nomeArea)}
                  </div>

                  <h3>{nomeArea}</h3>
                </Link>
              ))}
            </div>

            {areas.length === 0 && (
              <p>Nenhuma área ou unidade cadastrada.</p>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default Secao;
