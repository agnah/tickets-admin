import './dragAndDropFiles.css';
import { useState, useRef } from 'react';

function DragAndDrop() {
  const [imagenes, setImagenes] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const idCounterRef = useRef(0);
  // const inputRef = useRef(null);


  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = function (files) {
    const newFiles = [];
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") {
        alert("Solo se permiten archivos de imagen");
        continue;
      }
      if (files[i].size > 10000000) {
        alert("Solo se permiten archivos de menos de 10MB");
        continue;
      }
      if (imagenes.length + newFiles.length >= 5) {
        alert("Solo se permiten 5 archivos");
        break;
      }
      newFiles.push(files[i]);
    }
    const filesWithUrls = newFiles.map((file) => ({
      id: idCounterRef.current++,
      file,
      url: URL.createObjectURL(file),
    }));
    setImagenes((prev) => [...prev, ...filesWithUrls]);
  };

  const deleteImage = (id) => {
    URL.revokeObjectURL(imagenes.find((img) => img.id === id).url);
    setImagenes((prev) => prev.filter((imagen) => imagen.id !== id));
  };

  console.log(imagenes)
  return (
    <>
      <div
        id="file-upload"
        className={dragActive ? "drag-active" : ""}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
        <label id="label-file-upload" htmlFor="input-file-upload">
          <div>
            <p>Suelte archivos aquí o cargue uno </p>
          </div>
        </label>
      </div>
      <div className="imagenes">
        {imagenes.map((fileData) => (
          <div key={fileData.id}>
            <span>{fileData.file.name}</span>
            <img src={fileData.url} alt={fileData.file.name} />
            <button onClick={() => deleteImage(fileData.id)}>borrar</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default DragAndDrop;
