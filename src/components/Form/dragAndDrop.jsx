import './dragAndDropFiles.css';
import { useState, useRef } from 'react';

function DragAndDrop() {
  const [imagenes, setImagenes] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

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
      if (imagenes.some((img) => img.name === files[i].name && img.size === files[i].size)) {
        alert(`El archivo ${files[i].name} ya ha sido cargado.`);
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
    setImagenes((prev) => [...prev, ...newFiles]);
    inputRef.current.value = '';
  };

  const deleteImage = (id) => {
    setImagenes((prev) => prev.filter((imagen) => imagen !== id));
    inputRef.current.value = '';
  };

  console.log(imagenes);

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
        <input type="file" id="input-file-upload" multiple={true} onChange={handleChange} ref={inputRef} />
        <label id="label-file-upload" htmlFor="input-file-upload">
          <div>
            <p>Suelte archivos aquí o cargue uno </p>
          </div>
        </label>
      </div>
      <div className="imagenes">
        {imagenes.map((file, index) => (
          <div key={index}>
            <span>{file.name}</span>
            <img src={URL.createObjectURL(file)} alt={file.name} />
            <button onClick={() => deleteImage(file)}>borrar</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default DragAndDrop;
