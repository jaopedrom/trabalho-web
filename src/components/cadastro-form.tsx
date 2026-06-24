"use client"

import { useForm } from "react-hook-form";
import { Button } from "@base-ui/react/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { UsuarioCreateSchema } from "@/src/api/schemas/usuario.schema";

// extrai as informacoes dos campos
export type CadastroFormInputs = z.infer<typeof UsuarioCreateSchema>;

// prop que vai receber a funcao da pagina pai
// pagina pai: /src/app/autenticacao/cadastro/page.tsx
interface CadastroFormProps {
    aoEnviar: (data: CadastroFormInputs) => void;
}

export function CadastroForm({ aoEnviar }: CadastroFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<CadastroFormInputs>({
        resolver: zodResolver(UsuarioCreateSchema)
    })

    // chama a prop aoEnviar
    return (
        <form
            className="flex flex-col gap-4 w-full max-w-64"
            onSubmit={handleSubmit(aoEnviar, (erros) => console.log("Erros de validação (Zod impediu o envio):", erros))}>

            <label className="text-sm leading-5 font-bold text-gray-900">Nome Completo</label>
            <input className="box-border pl-3.5 m-0 border border-gray-200 w-full h-10 rounded-md text-base font-normal bg-transparent
            text-gray-900 focus:outline-2 focus:outline-blue-500 focus:-outline-offset-1"
                {...register("nome")} />
            {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome.message}</p>}

            <label className="text-sm leading-5 font-bold text-gray-900">Email</label>
            <input className="box-border pl-3.5 m-0 border border-gray-200 w-full h-10 rounded-md text-base font-normal bg-transparent
            text-gray-900 focus:outline-2 focus:outline-blue-500 focus:-outline-offset-1"
                type="email"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
                placeholder="exemplo@email.com" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}

            <label className="text-sm leading-5 font-bold text-gray-900">Telefone</label>
            <input className="box-border pl-3.5 m-0 border border-gray-200 w-full h-10 rounded-md text-base font-normal bg-transparent
            text-gray-900 focus:outline-2 focus:outline-blue-500 focus:-outline-offset-1"
                type="tel"
                {...register("telefone")}
                placeholder="(00) 00000-0000" />
            {errors.telefone && <p className="text-red-500 text-xs mt-1">{errors.telefone.message}</p>}

            <label className="text-sm leading-5 font-bold text-gray-900">CPF</label>
            <input className="box-border pl-3.5 m-0 border border-gray-200 w-full h-10 rounded-md text-base font-normal bg-transparent
            text-gray-900 focus:outline-2 focus:outline-blue-500 focus:-outline-offset-1"
                {...register("cpf")}
                placeholder="000.000.000-00" />
            {errors.cpf && <p className="text-red-500 text-xs mt-1">{errors.cpf.message}</p>}

            <label className="text-sm leading-5 font-bold text-gray-900">Senha</label>
            <input className="box-border pl-3.5 m-0 border border-gray-200 w-full h-10 rounded-md text-base font-normal bg-transparent
            text-gray-900 focus:outline-2 focus:outline-blue-500 focus:-outline-offset-1"
                type="password"
                {...register("senha")}
                placeholder="Digite uma senha:" />
            {errors.senha && <p className="text-red-500 text-xs mt-1">{errors.senha.message}</p>}

            <button className="box-border flex items-center justify-center h-10 px-3.5 m-0 outline-none border border-gray-200 rounded-md
            bg-gray-50 text-base font-normal leading-6 text-gray-900 select-none hover:not-data-disabled:bg-gray-100 active:not-data-disabled:bg-gray-200
            active:not-data-disabled:shadow-[inset_0_1px_3px_var(--color-gray-200)] active:not-data-disabled:border-t-gray-300 focus-visible:outline-2
            focus-visible:outline-blue-500 focus-visible:-outline-offset-1 data-disabled:text-gray-500"
                type="submit">Cadastrar</button>
        </form>
    )
}