import { useState } from 'react'
import Input from '../../Form/Input/InputForm'
import Select from '../../Form/Input/Select'
import { useForm } from 'react-hook-form'

const REGEX_EMAIL = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/

const optionListSelect = ['CSTIMI', 'GDE', 'Computos', 'CID', 'Telefonía']

const UserDetail = ({ user, datos }) => {
  console.log('llego a detalle', datos) // aca estan los datos del usuario sin fetch
  const [edit, setEdit] = useState(false)
  const [userInfo, setUserInfo] = useState({
    nombre: user?.nombre || null,
    apellido: user?.apellido || null,
    // TODO: INVERTIR!
    email: 'prueba@gmail.com' || user?.email,
    telefono: user?.telefono || null,
    celular: user?.celular || null,
    interno: user?.interno || null,
    piso: user?.piso || null,
    sector: user?.sector || null,
    sede: user?.sede || null,
    perfil: user?.perfil || null,
    rolUsuario: user?.rolUsuario || null
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

  const onSubmit = (data) => {
    console.log(data)
    setUserInfo({ ...userInfo, ...data })
    setEdit(!edit)
  }

  const handleCancelEdit = () => {
    setEdit(!edit)
    setUserInfo({
      nombre: user?.nombre || null,
      apellido: user?.apellido || null,
      // TODO: INVERTIR!
      email: 'prueba@gmail.com' || user?.email,
      telefono: user?.telefono || null,
      celular: user?.celular || null,
      interno: user?.interno || null,
      piso: user?.piso || 5,
      sector: user?.sector || null,
      sede: user?.sede || null,
      perfil: user?.perfil || null,
      rolUsuario: user?.rolUsuario || null
    })
  }

  const handleEdit = () => {
    setEdit(!edit)
  }

  return (
    <section className="position-relative pt-5">
      {!edit && (
        <i
          className="fa fa-edit position-absolute top-0 end-0"
          onClick={handleEdit}
        ></i>
      )}
      {!edit ? (
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
      ) : (
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
                    // pattern: {
                    //   value: REGEX_EMAIL,
                    //   message: "El e-mail tiene que ser valido",
                    // },
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
                    // pattern: {
                    //   value: REGEX_EMAIL,
                    //   message: "El e-mail tiene que ser valido",
                    // },
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
                  options={
                    {
                      //   required: "Campo obligatorio",
                      // pattern: {
                      //   value: REGEX_EMAIL,
                      //   message: "El e-mail tiene que ser valido",
                      // },
                    }
                  }
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
                  options={
                    {
                      //   required: "Campo obligatorio",
                      // pattern: {
                      //   value: REGEX_EMAIL,
                      //   message: "El e-mail tiene que ser valido",
                      // },
                    }
                  }
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
                  options={
                    {
                      //   required: "Campo obligatorio",
                      // pattern: {
                      //   value: REGEX_EMAIL,
                      //   message: "El e-mail tiene que ser valido",
                      // },
                    }
                  }
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
                  optionList={optionListSelect}
                  register={register}
                  errors={errors}
                  classCol="col-md-6 col-lg-6 d-flex align-items-center gap-2"
                  options={
                    {
                      //   required: "Campo obligatorio",
                    }
                  }
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
                  optionList={optionListSelect}
                  register={register}
                  errors={errors}
                  classCol="col-md-6 col-lg-6 d-flex align-items-center gap-2"
                  options={
                    {
                      //   required: "Campo obligatorio",
                    }
                  }
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
                  options={
                    {
                      //   required: "Campo obligatorio",
                    }
                  }
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
                  optionList={[
                    'Colaborador',
                    'Coordinador',
                    'Director',
                    'Responsable',
                    'Operador'
                  ]}
                  register={register}
                  errors={errors}
                  classCol="col-md-12 col-lg-12 d-flex align-items-center gap-2"
                  options={
                    {
                      //   required: "Campo obligatorio",
                    }
                  }
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
                  optionList={['Admin', 'Editor', 'Usuario']}
                  register={register}
                  errors={errors}
                  classCol="col-md-12 col-lg-12 d-flex align-items-center gap-2"
                  options={
                    {
                      //   required: "Campo obligatorio",
                    }
                  }
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

export default UserDetail
