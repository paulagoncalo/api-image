import React, { useState, useEffect } from "react";

const ImageDisplay = ({ imageId }) => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/imagens/${imageId}`, {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
          },
          responseType: 'blob',
        });
        if (response.ok) {
          
          const data = await response.blob();
          setImageData(data);
          //saveAs(blob, `imagem_${imageId}.png`); faz download da imagem
        } else {
          console.error(`Erro ao obter imagem: ${response.statusText}`);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchImageData();
  }, [imageId]);

  return (
    <div>
      {imageData ? (
        <img src={imageData.url} alt="Imagem" />
      ) : (
        <p>Carregando imagem...</p>
      )}
    </div>
  );
};

export default ImageDisplay;