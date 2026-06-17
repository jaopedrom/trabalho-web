"use client"

import { useForm } from "react-hook-form";
import { Button } from "@base-ui/react/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { ImovelFormSchema } from "@/src/schemas/imovel.schema";

export type ImovelFormInputs = z.infer<typeof ImovelFormSchema>;

interface ImovelFormProps {
    aoEnviar: (data: ImovelFormInputs) => void;
    valoresIniciais?: ImovelFormInputs;
    textoBotao?: string;
    aoDeletar?: () => void;
}

export function ImovelForm({ aoEnviar, valoresIniciais, textoBotao = "Salvar", aoDeletar }: ImovelFormProps) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ImovelFormInputs>({
        resolver: zodResolver(ImovelFormSchema),
        defaultValues: valoresIniciais
    });

    useEffect(() => {
        if (valoresIniciais) {
            reset(valoresIniciais);
        }
    }, [valoresIniciais, reset]);

    return (
        <form
            className="flex flex-col gap-4 w-full max-w-md"
            onSubmit={handleSubmit(aoEnviar)}
        >
            <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-900">Título do Imóvel</label>
                <input
                    className="box-border px-3 border border-gray-200 w-full h-10 rounded-md text-base bg-white text-gray-900 focus:outline-blue-500"
                    placeholder="Ex: Casa na Praia com Piscina"
                    {...register("titulo")}
                />
                {errors.titulo && <p className="text-red-500 text-xs">{errors.titulo.message}</p>}
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-900">URL da Foto</label>
                <input
                    className="box-border px-3 border border-gray-200 w-full h-10 rounded-md text-base bg-white text-gray-900 focus:outline-blue-500"
                    placeholder="https://exemplo.com/foto.jpg"
                    type="url"
                    {...register("foto")}
                />
                {errors.foto && <p className="text-red-500 text-xs">{errors.foto.message}</p>}
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-900">Localização</label>
                <input
                    className="box-border px-3 border border-gray-200 w-full h-10 rounded-md text-base bg-white text-gray-900 focus:outline-blue-500"
                    placeholder="Ex: Florianópolis, SP"
                    {...register("localizacao")}
                />
                {errors.localizacao && <p className="text-red-500 text-xs">{errors.localizacao.message}</p>}
            </div>

            <div className="flex gap-4">
                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-bold text-gray-900">Valor da Diária (R$)</label>
                    <input
                        className="box-border px-3 border border-gray-200 w-full h-10 rounded-md text-base bg-white text-gray-900 focus:outline-blue-500"
                        placeholder="0.00"
                        type="number"
                        step="0.01"
                        {...register("valorDiaria", { valueAsNumber: true })}
                    />
                    {errors.valorDiaria && <p className="text-red-500 text-xs">{errors.valorDiaria.message}</p>}
                </div>

                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-bold text-gray-900">Status</label>
                    <select
                        className="box-border px-3 border border-gray-200 w-full h-10 rounded-md text-base bg-white text-gray-900 focus:outline-blue-500"
                        {...register("status")}
                    >
                        <option value="livre">Livre</option>
                        <option value="ocupado">Ocupado</option>
                        <option value="manutencao">Manutenção</option>
                    </select>
                    {errors.status && <p className="text-red-500 text-xs">{errors.status.message}</p>}
                </div>
            </div>

            <div className="flex gap-4 mt-4">
                {aoDeletar && (
                    <button
                        type="button"
                        onClick={() => {
                            if (window.confirm("Tem certeza que deseja deletar este imóvel? Esta ação não pode ser desfeita.")) {
                                aoDeletar();
                            }
                        }}
                        className="box-border flex items-center justify-center h-10 px-4 outline-none border border-red-600 rounded-md bg-transparent text-base font-medium text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                    >
                        Deletar Imóvel
                    </button>
                )}

                <Button
                    className="box-border flex items-center justify-center h-10 px-4 outline-none border-none rounded-md bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:-outline-offset-1 transition-colors ml-auto"
                    type="submit"
                >
                    {textoBotao}
                </Button>
            </div>
        </form>
    );
}