import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CadastrarMaterial() {
  const navigate = useNavigate();

  const [tipo, setTipo] = useState("");
  const [url, setUrl] = useState("");
  const [registro_id, setRegistroId] = useState("");
  const [registros, setRegistros] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);

    useEffect(() => {
    async function buscarRegistros() {
        try {
        const resposta = await fetch(
            "http://localhost:3333/registros"
        );

        if (!resposta.ok) {
            throw new Error("Erro ao buscar registros.");
        }

        const dados = await resposta.json();
        setRegistros(dados);
        } catch (erro) {
        setMensagem(erro.message);
        }
    }

    buscarRegistros();
    }, []);

    useEffect(() => {
    return () => {
        if (preview) {
        URL.revokeObjectURL(preview);
        }
    };
    }, [preview]);

  function selecionarImagem(e) {
  const arquivo = e.target.files[0];

  setImagem(arquivo || null);

  if (arquivo) {
    const urlTemporaria = URL.createObjectURL(arquivo);
    setPreview(urlTemporaria);
  } else {
    setPreview(null);
  }
}

  async function cadastrar(e) {
    e.preventDefault();
    setMensagem("");

    const token = sessionStorage.getItem("token");

    if (!token) {
        navigate("/login");
        return;
    }

    try {
        let urlFinal = url;

        if (tipo === "imagem") {
        if (!imagem) {
            setMensagem("Selecione uma imagem.");
            return;
        }

        const formData = new FormData();
        formData.append("imagem", imagem);

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
        "http://localhost:3333/materiais",
        {
            method: "POST",
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
            dados.mensagem || "Erro ao cadastrar material."
        );
        }

        setMensagem("Material cadastrado com sucesso!");
        setTipo("");
        setUrl("");
        setImagem(null);
        setPreview(null)
        setRegistroId("");

    } catch (erro) {
        setMensagem(erro.message);
    }
}

  return (
    <main className="pagina-login">
      <form className="form-login" onSubmit={cadastrar}>
        <h1>Cadastrar Material</h1>

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

        {tipo === "imagem" ? (
            <>
                <label>Selecionar imagem do computador</label>

                <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={selecionarImagem}
                    required
                />

                {preview && (
                <div className="preview-imagem">
                    <p>Pré-visualização:</p>

                    <img
                    src={preview}
                    alt="Pré-visualização da imagem selecionada"
                    />
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
                placeholder="https://exemplo.com/material"
                required
                />
            </>
        )}

        <button type="submit">
          Cadastrar material
        </button>

        {mensagem && <p>{mensagem}</p>}

        <Link to="/admin">
          Voltar ao painel
        </Link>
      </form>
    </main>
  );
}

export default CadastrarMaterial;