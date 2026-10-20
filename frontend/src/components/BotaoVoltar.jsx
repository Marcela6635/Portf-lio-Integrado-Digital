import { useNavigate } from "react-router-dom";

function BotaoVoltar({ destino = "/" }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="botao-voltar"
      onClick={() => navigate(destino)}
      aria-label="Voltar"
    >
      <span aria-hidden="true">←</span>
      Voltar
    </button>
  );
}

export default BotaoVoltar;
