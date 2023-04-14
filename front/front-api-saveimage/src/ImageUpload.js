import React, { useState } from "react";
import ImageDisplay from "./ImageDisplay";

const App = () => {
  const [file, setFile] = useState(null);
  const [imageId, setImageId] = useState(null);

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append("imagem", file);

      fetch("http://localhost:8080/api/imagens", {
        method: "POST",
        body: formData
      })
        .then(async (response) => {
          if (response.ok) {

            const data = await response.json();
            const imageId = data.id; // Captura o ID retornado pela API

            setImageId(imageId) //seta id da imagem no state imageId
          } else {
            console.error("Erro ao salvar a imagem.");
          }
        })
        .catch((error) => {
          console.error("Erro ao comunicar com a API:", error);
        });
    } else {
      console.error("Nenhum arquivo selecionado.");
    }
  };

  return (
    <div>
      <h1>Upload de Imagem</h1>
      <input type="file" onChange={handleFileInputChange} />
      <button onClick={handleUpload}>Enviar</button>
      {imageId && (
        <ImageDisplay imageId={imageId} /> // Passa o ID da imagem para o componente de exibição
      )}
    </div>
  );
};

export default App;
