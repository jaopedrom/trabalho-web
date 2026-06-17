"use client"

import { CardImage } from "../modules/components/card-imoveis";
import { useEffect, useState } from "react";
import { ImovelType } from "@/src/modules/components/imoveis/types/imoveisType";
import Datepicker from "react-tailwindcss-datepicker";
import { listarImoveisDisponiveis } from "@/src/services/imovel.service";

export default function Home() {
    const [imoveis, setMoveis] = useState<ImovelType[]>([]);

    const [dataSelecionada, setDataSelecionada] = useState({
        startDate: null,
        endDate: null,
    });

    const mudancaDeData = (newValue: any) => {
        setDataSelecionada(newValue);
    };

    useEffect(() => {
        listarImoveisDisponiveis(
            dataSelecionada.startDate || undefined,
            dataSelecionada.endDate || undefined
        )
            .then(setMoveis)
            .catch(console.error);
    }, [dataSelecionada]);

    return (
        <main className="p-4 md:p-8 max-w-7xl mx-auto">

            {/* bloco de busca */}
            <div className="relative z-50 mb-10 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Quando será sua próxima viagem?
                </h2>

                {/* componente de date picker */}
                <div className="w-full md:w-[400px]">
                    <Datepicker
                        primaryColor={"blue"}
                        value={dataSelecionada}
                        onChange={mudancaDeData}
                        displayFormat={"DD/MM/YYYY"}
                        placeholder={"Selecione Check-in e Check-out"}
                    />
                </div>
            </div>

            {/* bloco que exibe os imoveis filtrados */}
            <div className="relative z-10">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Imóveis disponíveis:
                </h1>

                {/* caso o filtro nao encontre nenhum imovel */}
                {imoveis.length === 0 && (
                    <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg border border-dashed">
                        Nenhum imóvel disponível para estas datas.
                    </div>
                )}

                {/* Grid responsivo com os Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {imoveis.map((imovel) => (
                        <CardImage
                            key={imovel.id}
                            data={imovel}
                        />
                    ))}
                </div>
            </div>

        </main>
    );
}