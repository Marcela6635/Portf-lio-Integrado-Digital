import BotaoVoltar from "../components/BotaoVoltar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Registros() {
  const { id } = useParams();

  const [registros, setRegistros] = useState([]);
  const [secao, setSecao] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function buscarDados() {
      setCarregando(true);
      setErro("");

      try {
        const [respostaSecao, respostaRegistros] = await Promise.all([
          fetch(`http://localhost:3333/secoes/${id}`),
          fetch(`http://localhost:3333/registros?secao_id=${id}`)
        ]);

        if (!respostaSecao.ok || !respostaRegistros.ok) {
          throw new Error("Erro ao buscar dados");
        }

        const dadosSecao = await respostaSecao.json();
        const dadosRegistros = await respostaRegistros.json();

        setSecao(dadosSecao);
        setRegistros(dadosRegistros);
      } catch (erro) {
        console.error(erro);
        setErro("Não foi possível carregar os registros.");
      } finally {
        setCarregando(false);
      }
    }

    buscarDados();
  }, [id]);

  function mostrarRegistros(lista) {
    if (lista.length === 0) {
      return <p>Nenhum registro cadastrado.</p>;
    }

    return (
      <div className="opcoes">
        {lista.map((registro) => (
            <Link to={`/registro/${registro.id}`} className="cartao link-cartao" key={registro.id}>
                <h3>{registro.titulo}</h3>
                <p>{registro.conteudo}</p>
            </Link>
        ))}
      </div>
    );
  }

  if (carregando) {
    return <p>Carregando registros...</p>;
  }

  if (erro) {
    return <p>{erro}</p>;
  }

  const bimestres = [1, 2, 3, 4];

  return (
    <main className="portfolio">
      <div className="page-back-row"><BotaoVoltar destino={secao?.area_unidade && secao?.origem ? `/${secao.origem.toLowerCase()}/${encodeURIComponent(secao.area_unidade)}` : "/"} /></div>
      <h1>{secao?.nome}</h1>

      <p>Período: {secao?.periodo}</p>

      {secao?.periodo?.toLowerCase() === "bimestral" ? (
        bimestres.map((bimestre) => (
          <section key={bimestre} className="grupo-bimestre">
            <h2>{bimestre} Bimestre</h2>

            {mostrarRegistros(
              registros.filter(
                (registro) => parseInt(registro.bimestre, 10) === bimestre
              )
            )}
          </section>
        ))
      ) : (
        mostrarRegistros(registros)
      )}
    </main>
  );
}

export default Registros;