import './dragAndDropFiles.css';
import { useState, useRef } from 'react';

function DragAndDrop() {
  const [imagenes, setImagenes] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const inputRef = useRef(null);

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDragLeave = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    handleFiles(e.target.files);
  };

  const handleFiles = async function (files) {
    const validFiles = [];
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') {
        alert('Solo se permiten archivos de imagen');
        continue;
      }
      if (files[i].size > 1000000) {
        alert('Solo se permiten archivos de 1MB como máximo');
        continue;
      } 
      if (imagenes.length + validFiles.length >= 3) {
        alert('Solo se permiten 3 archivos');
        break; // Detener el bucle si se alcanza el límite
      }
      validFiles.push(files[i]);
    }

    // Cargar todas las imágenes utilizando FileReader
    const fileArray = await Promise.all(validFiles.map(file => createFileObjectAsync(file)));
    setImagenes(prev => [...prev, ...fileArray]);
  };

  const createFileObjectAsync = async function (file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve({ file, url: e.target.result });
      reader.readAsDataURL(file);
    });
  };

  const deleteImage = (index) => {
    setImagenes(prev => prev.filter((imagen, i) => i !== index)); 
  };

  return (
    <>
      <div
        id="file-upload"
        className={dragActive ? "drag-active" : ""}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDragLeave} 
        onDrop={handleDrop}
      >
        <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
        <label id="label-file-upload" htmlFor="input-file-upload">
          <div>
            <p>Suelte archivos aquí o cargue uno</p>
          </div>
        </label>
      </div>
      <div className="imagenes">
        {imagenes.map((fileData, index) => (
          <div key={index}>
            <span>{fileData.file.name}</span>
            <img src={fileData.url} alt={fileData.file.name} />
            <button onClick={() => deleteImage(index)}>borrar</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default DragAndDrop;
