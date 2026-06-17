"use client"

import { useForm } from "react-hook-form";
import { Button } from "@base-ui/react/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UsuarioPublico } from "@/src/services/usuario.service";
import { UsuarioUpdateSchema } from "@/src/schemas/usuario.schema";

// extrai as informacoes dos campos
export type EdicaoUsuarioFormInputs = z.infer<typeof UsuarioUpdateSchema>;

// prop que vai receber a funcao da pagina pai
// pagina pai: /src/app/usuario/[perfil]/page.tsx
interface EdicaoUsuarioFormProps {
    aoEnviar: (data: EdicaoUsuarioFormInputs) => void;
    estaEditando: boolean;
    usuario: UsuarioPublico;
    aoEditar: () => void;
    aoCancelar: () => void;
    aoDeletar?: () => void;
}

export function EdicaoUsuarioForm({ aoEnviar, estaEditando, usuario, aoEditar, aoCancelar, aoDeletar }: EdicaoUsuarioFormProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<EdicaoUsuarioFormInputs>({
        resolver: zodResolver(UsuarioUpdateSchema),
        defaultValues: {
            nome: usuario.nome,
            email: usuario.email,
            telefone: usuario.telefone,
            cpf: usuario.cpf,
            senha: "",
        }
    })

    const cancelarEdicao = () => {
        reset();
        aoCancelar();
    }

    // chama a prop aoEnviar
    return (
        <form className="w-full" onSubmit={handleSubmit(aoEnviar)}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-6">

                {/* nome */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm leading-5 font-bold text-gray-900">Nome Completo</label>
                    <input
                        disabled={!estaEditando}
                        className="box-border pl-3.5 m-0 border border-gray-200 w-full h-10 rounded-md text-base font-normal bg-transparent text-gray-900 focus:outline-2 focus:outline-blue-500 disabled:opacity-50"
                        {...register("nome")}
                    />
                    {errors.nome && <p className="text-red-500 text-xs">{errors.nome.message}</p>}
                </div>

                {/* email */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm leading-5 font-bold text-gray-900">Email</label>
                    <input
                        disabled={!estaEditando}
                        className="box-border pl-3.5 m-0 border border-gray-200 w-full h-10 rounded-md text-base font-normal bg-transparent text-gray-900 focus:outline-2 focus:outline-blue-500 disabled:opacity-50"
                        type="email"
                        {...register("email")}
                        placeholder="exemplo@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>

                {/* telefone */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm leading-5 font-bold text-gray-900">Telefone</label>
                    <input
                        disabled={!estaEditando}
                        className="box-border pl-3.5 m-0 border border-gray-200 w-full h-10 rounded-md text-base font-normal bg-transparent text-gray-900 focus:outline-2 focus:outline-blue-500 disabled:opacity-50"
                        type="tel"
                        {...register("telefone")}
                        placeholder="(00) 00000-0000"
                    />
                    {errors.telefone && <p className="text-red-500 text-xs">{errors.telefone.message}</p>}
                </div>

                {/* cpf */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm leading-5 font-bold text-gray-900">CPF</label>
                    <input
                        disabled={!estaEditando}
                        className="box-border pl-3.5 m-0 border border-gray-200 w-full h-10 rounded-md text-base font-normal bg-transparent text-gray-900 focus:outline-2 focus:outline-blue-500 disabled:opacity-50"
                        {...register("cpf")}
                        placeholder="000.000.000-00"
                    />
                    {errors.cpf && <p className="text-red-500 text-xs">{errors.cpf.message}</p>}
                </div>

                {/* senha */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm leading-5 font-bold text-gray-900">Senha</label>
                    <input
                        disabled={!estaEditando}
                        className="box-border pl-3.5 m-0 border border-gray-200 w-full h-10 rounded-md text-base font-normal bg-transparent text-gray-900 focus:outline-2 focus:outline-blue-500 disabled:opacity-50"
                        type="password"
                        {...register("senha")}
                        placeholder="Digite uma senha"
                    />
                    {errors.senha && <p className="text-red-500 text-xs">{errors.senha.message}</p>}
                </div>
            </div>

            {/* controle dos botoes */}
            <div className="flex gap-4">
                {!estaEditando && (
                    <button
                        type="button"
                        onClick={aoEditar}
                        className="text-red-600 border border-red-600 hover:bg-red-600 hover:text-white transition-colors rounded-lg px-4 py-2">
                        Editar Perfil
                    </button>
                )}

                {estaEditando && (
                    <>
                        <button
                            type="submit"
                            className="text-green-600 border border-green-600 hover:bg-green-600 hover:text-white transition-colors rounded-lg px-4 py-2">
                            Salvar Alterações
                        </button>

                        <button
                            type="button"
                            onClick={cancelarEdicao}
                            className="text-red-600 border border-red-600 hover:bg-red-600 hover:text-white transition-colors rounded-lg px-4 py-2">
                            Cancelar
                        </button>

                        {aoDeletar && (
                            <button
                                type="button"
                                onClick={() => {
                                    if (window.confirm("Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.")) {
                                        aoDeletar();
                                    }
                                }}
                                className="text-white bg-red-600 hover:bg-red-700 transition-colors rounded-lg px-4 py-2 ml-auto">
                                Deletar Conta
                            </button>
                        )}
                    </>
                )}
            </div>
        </form>
    );
}