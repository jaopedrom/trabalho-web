import ReactDOM from "react-dom"
import { useForm, SubmitHandler } from "react-hook-form"
import { HospedeType} from "@/src/modules/components/hospede/types/hospedeType";

type HospedeFormInputs = Omit<HospedeType, 'id'>;

export default function Login() {
    const { register, handleSubmit } = useForm<HospedeFormInputs>()
    const onSubmit: SubmitHandler<HospedeFormInputs> = (data) => console.log(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Nome Completo</label>
            <input {...register("nome")} />

            <label >Email</label>
            <input type="email" {...register("email")} placeholder="exemplo@email.com" />

            <label>Telefone</label>
            <input type="tel" {...register("telefone")} placeholder="(00) 00000-0000" />

            <label>CPF</label>
            <input {...register("cpf")} placeholder="000.000.000-00" />

            <input type="Cadastrar Usuario" />
        </form>
    )
}
