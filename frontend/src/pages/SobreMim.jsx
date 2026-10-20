import "../App.css";
import BotaoVoltar from "../components/BotaoVoltar";

function SobreMim() {
  return (
    <main className="pagina-sobre">
      <div className="sobre-container">

        <div className="page-back-row">
          <BotaoVoltar destino="/" />
        </div>

        <div className="sobre-topo">

          <div className="sobre-foto">
            <img
              src="/foto-animacao03.png"
              alt="Foto de apresentação"
            />
          </div>

          <div className="sobre-conteudo">
            <h1>Quem sou eu?</h1>

            <p className="sobre-descricao">
              Sou estudante do 3º ano do Ensino Médio e do
              curso Técnico em Informática, integrando minha
              formação acadêmica e técnica.
            </p>

            <section className="sobre-identificacao">
              <h2>Minha Identificação</h2>

              <div className="sobre-dados">
                <p>
                  <strong>Nome:</strong> Marcela Souza Bastos
                </p>
                <p>
                  <strong>Série:</strong> 3º ano
                </p>
                <p>
                  <strong>Turma:</strong> G
                </p>
                <p>
                  <strong>Itinerário Formativo:</strong>
                  {" "}Técnico em Informática
                </p>
              </div>
            </section>
          </div>
        </div>

        <section className="sobre-reflexao">
          <h2>Reflexão Pessoal</h2>

          <p>
            Neste ano, pretendo me dedicar mais aos estudos,
            buscando melhorar meu desempenho em todas as
            disciplinas e ter um compromisso maior com as
            atividades e trabalhos. Já no curso, pretendo
            ter mais interesse nas áreas estudadas,
            desenvolver habilidades e me dedicar mais.
          </p>

          <p>
            Além disso, pretendo participar mais ativamente
            das aulas, realizando todas as atividades e
            trabalhos dentro dos prazos. Também buscarei
            melhorar minha organização, disciplina e
            dedicação aos estudos.
          </p>

          <p>
            Outro objetivo importante é conquistar a aprovação
            no curso que desejo e alcançar um bom desempenho
            no ENEM. Para isso, pretendo me dedicar aos
            estudos, revisar os conhecimentos adquiridos ao
            longo dos anos e me preparar da melhor forma
            possível para essa nova etapa da minha vida.
          </p>

          <p>
            No final do ano, espero concluir o Ensino Médio
            e o curso técnico com bons resultados, alcançar
            a aprovação em Biomedicina, ampliar meus
            conhecimentos e fortalecer minhas habilidades
            de organização, comunicação, responsabilidade
            e trabalho em equipe.
          </p>
        </section>

      </div>
    </main>
  );
}

export default SobreMim;
