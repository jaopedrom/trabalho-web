// componente para cadastro de usuarios
"use client"

import {SubmitHandler, useForm} from "react-hook-form";
import {HospedeType} from "@/src/modules/components/hospede/types/hospedeType";

type HospedeFormInputs = Omit<HospedeType, "id">;

export default function Login() {
    const { register, handleSubmit } = useForm<HospedeFormInputs>()
    const onSubmit: SubmitHandler<HospedeFormInputs> = (data) => console.log(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Informe o cpf</label>
            <input {...register("cpf")} placeholder="XXXXXXXXXXX" />

            <label>Senha</label>
            <input {...register("senha")} placeholder="Senha" />
            <input type="submit" />
        </form>
    )
}
