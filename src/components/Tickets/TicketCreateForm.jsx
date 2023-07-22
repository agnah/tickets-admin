import { useForm } from 'react-hook-form'
// import Select from '../Form/Input/Select'
// const optionListSelect = ['Area Técnica', 'CID', 'Data Center', 'Telefonía']

export const TicketCreateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}
    noValidate
    autoComplete="off">

    </form>
  )
}
