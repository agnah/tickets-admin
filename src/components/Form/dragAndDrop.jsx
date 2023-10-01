import './dragAndDropFiles.css'
import { useState, useRef, forwardRef, useImperativeHandle } from 'react'

function DragAndDropComponent ({ register, errors }, ref) {
  const [imagenes, setImagenes] = useState([])
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef(null)

  useImperativeHandle(ref, () => ({
    getData: () => imagenes
  }))

  const handleDrag = function (e) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = function (e) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = function (e) {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = function (files) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'text/plain', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    const newFiles = []

    for (let i = 0; i < files.length; i++) {
      if (!allowedTypes.includes(files[i].type)) {
        alert('Solo se permiten archivos de imagen, texto, PDF y Word')
        continue
      }

      if (files[i].type.split('/')[0] === 'image') {
        // Resto de las validaciones para imágenes
        if (imagenes.some((img) => img.name === files[i].name && img.size === files[i].size)) {
          alert(`El archivo ${files[i].name} ya ha sido cargado.`)
          continue
        }
        if (files[i].size > 10000000) {
          alert('Solo se permiten archivos de menos de 10MB')
          continue
        }
      }

      if (imagenes.length + newFiles.length >= 5) {
        alert('Solo se permiten 5 archivos')
        break
      }

      newFiles.push(files[i])
    }

    setImagenes((prev) => [...prev, ...newFiles])
    inputRef.current.value = ''
  }

  // const deleteImage = (id) => {
  //   setImagenes((prev) => prev.filter((imagen) => imagen !== id))
  //   inputRef.current.value = ''
  // }

  const deleteImage = (index) => {
    setImagenes((prev) => prev.filter((imagen, i) => i !== index))
    inputRef.current.value = ''
  }

  return (
    <>
      <div
        id="file-upload"
        className={dragActive ? 'drag-active' : ''}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input type="file" id="input-file-upload" name="archivos" multiple={true}
        accept="image/jpeg, image/png, image/gif, text/plain, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleChange} ref={inputRef} register={register}
          errors={errors}/>
        <label id="label-file-upload" htmlFor="input-file-upload">
          <div>
            <p><span style={{ color: 'var(--celeste)' }}>Suelte archivos aquí</span> o seleccionelos</p>
          </div>
        </label>
      </div>
      <div className="imagenes">
        {imagenes.map((file, index) => (
          <div key={index}>
            <span>{file.name}</span>
            <img src={URL.createObjectURL(file)} alt={file.name} />
            {/* <button onClick={() => deleteImage(file)}>borrar</button> */}
            <button onClick={() => deleteImage(index)}>Eliminar</button>
          </div>
        ))}
      </div>
    </>
  )
};

const DragAndDrop = forwardRef(DragAndDropComponent)

export default DragAndDrop
