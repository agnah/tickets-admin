import { useState } from 'react'
import Input from '../../Form/Input/InputForm'
import Select from '../../Form/Input/Select'
import { useForm } from 'react-hook-form'

const REGEX_EMAIL = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/

const optionListArea = ['computos', 'telefonia', 'soportes', 'sistemas', 'gde']
const optionListSede = ['nueve_de_julio', 'anexo1', 'anexo2', 'anexo3']
const optionListPerfil = ['administrativo', 'tecnico', 'administrador', 'superadmin']
const optionListRol = ['admin', 'editor', 'lector', 'dios']

const rolMapping = {
  1: 'admin',
  2: 'editor',
  3: 'lector',
  4: 'dios'
}

const perfilMapping = {
  1: 'administrativo',
  2: 'tecnico',
  3: 'admin',
  4: 'superadmin'
}

const UserDetail2 = ({ user, datos }) => {
  const [edit, setEdit] = useState(false)
  const [userInfo, setUserInfo] = useState({
    nombre: datos?.nombre || '',
    apellido: datos?.apellido || '',
    email: datos?.email || '',
    telefono: datos?.telefono || '',
    celular: datos?.celular || '',
    interno: datos?.interno || '',
    piso: datos?.piso || '',
    sector: datos?.area_id,
    sede: datos?.sede || '',
    perfil: datos?.perfil || '',
    rolUsuario: datos?.rol || ''
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onChangeInput = (e) => {
    const { value, name } = e.target
    setUserInfo({ ...userInfo, [name]: value })
  }

  const sendPatchRequest = async (formData) => {
    try {
      const api = `http://localhost:8000/api/usuario/id/${datos?.id}`
      console.log('datos', datos.id)
      const areaId = formData.sector !== null ? parseInt(formData.sector) : null
      const body = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        celular: formData.celular,
        telefono: formData.telefono,
        interno: formData.interno,
        area_id: areaId,
        piso: formData.piso,
        perfil: formData.perfil,
        rol: formData.rolUsuario
      }
      const jsonString = JSON.stringify(body)
      console.log('jsonString:', jsonString)
      const res = await fetch(api, {
        method: 'PATCH',
        body: jsonString,
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!res.ok) {
        throw new Error(`Error de red: ${res.status} ${res.statusText}`)
      }

      setEdit(false)
      const responseData = await res.json()
      console.log('Respuesta:', responseData)
    } catch (error) {
      console.error('Error al actualizar los datos:', error)
    }
  }

  const onSubmit = (data) => {
    data.perfil = perfilMapping[data.perfil]
    data.rolUsuario = rolMapping[data.rolUsuario]
    const formData = { ...data }
    console.log(formData)
    setUserInfo({ ...userInfo, ...data })
    sendPatchRequest(formData)
  }

  const handleCancelEdit = () => {
    setEdit(false)
    setUserInfo({
      nombre: datos?.nombre || '',
      apellido: datos?.apellido || '',
      email: datos?.email || '',
      telefono: datos?.telefono || '',
      celular: datos?.celular || '',
      interno: datos?.interno || '',
      piso: datos?.piso || '',
      sector: datos?.area_id,
      sede: datos?.sede || '',
      perfil: datos?.perfil || '',
      rolUsuario: datos?.rol || ''
    })
  }

  const handleEdit = () => {
    setEdit(true)
  }

  return (
        <section className="position-relative pt-5">
            {!edit && (
                <i
                    className="fa fa-edit position-absolute top-0 end-0"
                    onClick={handleEdit}
                ></i>
            )}
            {!edit
              ? (
                    <div id="user-detail-info">
                        <article className="row">
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <p>
                                    <strong>Nombre:</strong> {userInfo?.nombre}
                                </p>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <p>
                                    <strong>Apellido:</strong> {userInfo?.apellido}
                                </p>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <p>
                                    <strong>Email:</strong> {userInfo?.email}
                                </p>
                            </div>
                        </article>
                        <article className="row">
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <p>
                                    <strong>Celular:</strong> {userInfo?.celular}
                                </p>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <p>
                                    <strong>Teléfono:</strong> {userInfo?.telefono}
                                </p>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <p>
                                    <strong>Interno:</strong> {userInfo?.interno}
                                </p>
                            </div>
                        </article>
                        <article className="row">
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <p>
                                    <strong>Area:</strong> {userInfo?.sector}
                                </p>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <p>
                                    <strong>Sede:</strong> {userInfo?.sede}
                                </p>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <p>
                                    <strong>Piso:</strong> {userInfo?.piso}
                                </p>
                            </div>
                        </article>
                        <article className="row">
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <p>
                                    <strong>Perfil:</strong> {userInfo?.perfil}
                                </p>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <p>
                                    <strong>Rol:</strong> {userInfo?.rolUsuario}
                                </p>
                            </div>
                        </article>
                    </div>
                )
              : (
                    <form id="user-detail-edit" onSubmit={handleSubmit(onSubmit)}>
                        <article className="row">
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <p>
                                    <Input
                                        label="Nombre"
                                        type="text"
                                        name="nombre"
                                        placeholder=""
                                        register={register}
                                        errors={errors}
                                        classCol="col-md-8 col-lg-8 d-flex form-group item-form align-items-center gap-2"
                                        options={{
                                          required: 'Campo obligatorio'
                                        }}
                                        value={userInfo?.nombre}
                                        onChangeInput={onChangeInput}
                                    />
                                </p>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <p>
                                    <Input
                                        label="Apellido"
                                        type="text"
                                        name="apellido"
                                        placeholder=""
                                        register={register}
                                        errors={errors}
                                        classCol="col-md-8 col-lg-8 d-flex form-group item-form align-items-center gap-2"
                                        options={{
                                          required: 'Campo obligatorio'
                                        }}
                                        value={userInfo?.apellido}
                                        onChangeInput={onChangeInput}
                                    />
                                </p>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <p>
                                    <Input
                                        label="Email"
                                        type="email"
                                        name="email"
                                        placeholder=""
                                        register={register}
                                        errors={errors}
                                        classCol="col-md-8 col-lg-8 d-flex form-group item-form align-items-center gap-2"
                                        options={{
                                          required: 'Campo obligatorio',
                                          pattern: {
                                            value: REGEX_EMAIL,
                                            message: 'El e-mail tiene que ser valido'
                                          }
                                        }}
                                        value={userInfo?.email}
                                        onChangeInput={onChangeInput}
                                    />
                                </p>
                            </div>
                        </article>
                        <article className="row">
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <p>
                                    <Input
                                        label="Celular"
                                        type="text"
                                        name="celular"
                                        placeholder=""
                                        register={register}
                                        errors={errors}
                                        classCol="col-md-8 col-lg-8 d-flex form-group item-form align-items-center gap-2"
                                        options={{}}
                                        value={userInfo?.celular}
                                        onChangeInput={onChangeInput}
                                    />
                                </p>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <p>
                                    <Input
                                        label="Telefono"
                                        type="text"
                                        name="telefono"
                                        placeholder=""
                                        register={register}
                                        errors={errors}
                                        classCol="col-md-8 col-lg-8 d-flex form-group item-form align-items-center gap-2"
                                        options={{}}
                                        value={userInfo?.telefono}
                                        onChangeInput={onChangeInput}
                                    />
                                </p>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <p>
                                    <Input
                                        label="Interno"
                                        type="text"
                                        name="interno"
                                        placeholder=""
                                        register={register}
                                        errors={errors}
                                        classCol="col-md-8 col-lg-8 d-flex form-group item-form align-items-center gap-2"
                                        options={{}}
                                        value={userInfo?.interno}
                                        onChangeInput={onChangeInput}
                                    />
                                </p>
                            </div>
                        </article>
                        <article className="row">
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <p>
                                    <Select
                                        label="Area"
                                        name="sector"
                                        placeholder="Selecciona un área"
                                        optionList={optionListArea}
                                        register={register}
                                        errors={errors}
                                        classCol="col-md-6 col-lg-6 d-flex align-items-center gap-2"
                                        // options={{}}
                                        value={userInfo?.sector}
                                        onChangeInput={onChangeInput}
                                    />
                                </p>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <p>
                                    <Select
                                        label="Sede"
                                        name="sede"
                                        placeholder="Selecciona la sede"
                                        optionList={optionListSede}
                                        register={register}
                                        errors={errors}
                                        classCol="col-md-6 col-lg-6 d-flex align-items-center gap-2"
                                        // options={{}}
                                        selectedOption={userInfo?.sede}
                                        onChangeInput={onChangeInput}
                                    />
                                </p>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <p>
                                    <Select
                                        label="Piso"
                                        name="piso"
                                        placeholder="Seleccione el piso"
                                        optionList={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                                        register={register}
                                        errors={errors}
                                        classCol="col-md-12 col-lg-12 d-flex align-items-center gap-2"
                                        options={{}}
                                        value={userInfo?.piso}
                                        onChangeInput={onChangeInput}
                                    />
                                </p>
                            </div>
                        </article>
                        <article className="row">
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <p>
                                    <Select
                                        label="Perfil"
                                        name="perfil"
                                        placeholder="Seleccione el perfil"
                                        optionList={
                                            optionListPerfil
                                        }
                                        register={register}
                                        errors={errors}
                                        classCol="col-md-12 col-lg-12 d-flex align-items-center gap-2"
                                        // options={{ optionListPerfil }}
                                        selectedOption={userInfo?.perfil}
                                        onChangeInput={onChangeInput}
                                    />
                                </p>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <p>
                                    <Select
                                        label="Rol"
                                        name="rolUsuario"
                                        placeholder="Seleccione el rol"
                                        optionList={optionListRol}
                                        register={register}
                                        errors={errors}
                                        classCol="col-md-12 col-lg-12 d-flex align-items-center gap-2"
                                        selectedOption={userInfo?.rolUsuario}
                                        onChangeInput={onChangeInput}
                                    />
                                </p>
                            </div>
                            <div>
                                <button onClick={handleCancelEdit}>Cancelar</button>
                                <button type="submit">Guardar</button>
                            </div>
                        </article>
                    </form>
                )}
        </section>
  )
}

export default UserDetail2