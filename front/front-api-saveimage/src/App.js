//import logo from './logo.svg';
import React, { useState } from "react";
import ImageUpload from "./ImageUpload"; 
import ImageDisplay from './ImageDisplay';
import './App.css';

const App = () => {
  const [imageId, setImageId] = useState(null);

  const handleImageUploadSuccess = (id) => {
    setImageId(id);
  };

  return (
    <div>
      {/* Renderiza o componente de upload de imagem */}
      <ImageUpload onSuccess={handleImageUploadSuccess} />

      
    </div>
  );
};

export default App;
