import './dragAndDropFiles.css'
import { useState, useRef } from 'react'

function DragAndDrop() {
  const [imagenes, setImagenes] = useState([])
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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = function (files) {
    const fileArray = [];
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') {
        alert('Solo se permiten archivos de imagen');
        continue;
      }
      if (files.length > 3) {
        alert('Solo se permiten 3 archivos');
        continue;
      }
      if (files[i].size > 1000000) {
        alert('Solo se permiten archivos de menos de 1MB');
        continue;
      }
      if (!imagenes.some((e) => e.name === files[i].name)) {
        fileArray.push({
          url: URL.createObjectURL(files[i]),
          name: files[i].name
        });
      }
    }
    setImagenes((prev) => [...prev, ...fileArray]);
  };


  const deleteImage = (index) => {
    const newImagenes = imagenes.filter((imagen, i) => i !== index)
    setImagenes(newImagenes)
}

  return (
    <>
      <div id="file-upload" onDragEnter={handleDrag}>
        <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
        <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
          <div>
            <p>Suelte archivos aqui o cargue uno</p>
          </div>
        </label>
        {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
      </div>
      <div className="imagenes">
        {imagenes.map((imagen, index) => (
          <div key={index}>
            <span>{imagen.name}</span>
            <img src={imagen.url} alt={imagen.name} />
            <button onClick={() => deleteImage(index)}>borrar</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default DragAndDrop