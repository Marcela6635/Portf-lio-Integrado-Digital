import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar";

function EditarMaterial() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tipo, setTipo] = useState("");
  const [url, setUrl] = useState("");
  const [registro_id, setRegistroId] = useState("");
  const [registros, setRegistros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [novaImagem, setNovaImagem] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    async function buscarDados() {
      try {
        const [respostaMaterial, respostaRegistros] =
          await Promise.all([
            fetch(`http://localhost:3333/materiais/${id}`),
            fetch("http://localhost:3333/registros")
          ]);

        if (!respostaMaterial.ok || !respostaRegistros.ok) {
          throw new Error("Erro ao carregar os dados.");
        }

        const material = await respostaMaterial.json();
        const listaRegistros = await respostaRegistros.json();

        setTipo(material.tipo);
        setUrl(material.url);
        setRegistroId(material.registro_id);
        setRegistros(listaRegistros);
      } catch (erro) {
        setMensagem(erro.message);
      } finally {
        setCarregando(false);
      }
    }

    buscarDados();
  }, [id]);

  useEffect(() => {
  if (!novaImagem) {
    setPreview(null);
    return;
  }

  const urlTemporaria = URL.createObjectURL(novaImagem);
  setPreview(urlTemporaria);

  return () => {
    URL.revokeObjectURL(urlTemporaria);
  };
}, [novaImagem]);

  async function salvarAlteracoes(e) {
    e.preventDefault();
    setMensagem("");

    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
        let urlFinal = url;

        if (tipo === "imagem" && novaImagem) {
        const formData = new FormData();
        formData.append("imagem", novaImagem);

        const respostaUpload = await fetch(
            "http://localhost:3333/upload/imagem",
            {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
            }
        );

        const dadosUpload = await respostaUpload.json();

        if (!respostaUpload.ok) {
            throw new Error(
            dadosUpload.mensagem || "Erro ao enviar imagem."
            );
        }

        urlFinal = `http://localhost:3333${dadosUpload.url}`;
        }

        const resposta = await fetch(
        `http://localhost:3333/materiais/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            tipo,
            url: urlFinal,
            registro_id
          })
        }
      );

      if (!resposta.ok) {
        const dados = await resposta.json();

        throw new Error(
          dados.mensagem || "Erro ao editar material."
        );
      }

      navigate("/admin/materiais");
    } catch (erro) {
      setMensagem(erro.message);
    }
  }

  if (carregando) {
    return <p>Carregando material...</p>;
  }

  return (
    <main className="pagina-login">
      <div className="form-page-stack">
        <BotaoVoltar destino="/admin/materiais" />
      <form className="form-login" onSubmit={salvarAlteracoes}>
        <h1>Editar Material</h1>

        <label>Registro</label>
        <select
          value={registro_id}
          onChange={(e) => setRegistroId(e.target.value)}
          required
        >
          <option value="">Selecione um registro</option>

          {registros.map((registro) => (
            <option key={registro.id} value={registro.id}>
              {registro.titulo}
            </option>
          ))}
        </select>

        <label>Tipo de material</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
        >
          <option value="">Selecione o tipo</option>
          <option value="imagem">Imagem</option>
          <option value="video">Vídeo</option>
          <option value="link">Link</option>
          <option value="arquivo">Arquivo</option>
        </select>

        <label>URL do material</label>
            {tipo === "imagem" ? (
                <>
                <label>Imagem atual</label>

                {url && (
                <img
                    src={url}
                    alt="Imagem atual"
                    className="imagem-edicao"
                />
                )}

                <label>Substituir imagem (opcional)</label>

                <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) =>
                    setNovaImagem(e.target.files[0] || null)
                }
                />

                {preview && (
                <div className="preview-imagem">
                    <p>Nova imagem:</p>
                    <img src={preview} alt="Nova imagem selecionada" />
                </div>
                )}
            </>
            ) : (
            <>
                <label>URL do material</label>

                <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                />
            </>
           )}

        <button type="submit">
          Salvar alterações
        </button>

        {mensagem && <p>{mensagem}</p>}

      </form>
      </div>
    </main>
  );
}

export default EditarMaterial;