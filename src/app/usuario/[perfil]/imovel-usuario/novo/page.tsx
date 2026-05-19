"use client"

import { use } from "react";
import { useRouter } from "next/navigation";
import { ImovelForm, ImovelFormInputs } from "@/src/modules/components/imovel-form";
import { Button } from "@/components/ui/button";

export default function AddImovelPage({ params }: { params: Promise<{ perfil: string }> }) {
    const router = useRouter();

    // extrai o id do usuario
    const { perfil } = use(params);

    // cadasttro
    const lidarComCadastro = (dadosVindosDoForm: ImovelFormInputs) => {
        // objeto de imovel
        const novoImovel = {
            id: `imovel-${Date.now()}`, // id gerado com base em timestamp
            usuarioId: perfil,           // vincula ao dono
            ...dadosVindosDoForm         // espalha dados
        };

        // simulacao de insercao de dados
        console.log("Novo imóvel criado com sucesso:", novoImovel);

        // nao atualiza o mock, pois mock eh um array estatico
        // usuariosMock.find(u => u.id === perfil)?.imoveis.push(novoImovel);
        alert("Imóvel cadastrado com sucesso!");

        // retorna para lista de imoveis do usuario
        router.push(`/usuario/${perfil}/imovel-usuario`);
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            {/* voltar */}
            <Button
                variant="ghost"
                className="mb-4 -ml-4 text-gray-500 hover:text-gray-900"
                onClick={() => router.back()}>
                Voltar para a lista
            </Button>

            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Anunciar Novo Imóvel</h1>
                <p className="text-gray-500 mt-1">
                    Preencha os dados abaixo para disponibilizar sua propriedade para aluguel.
                </p>
            </header>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                {/* formulario de cadastro e imovel */}
                <ImovelForm
                    textoBotao="Cadastrar Propriedade"
                    aoEnviar={lidarComCadastro}
                />
            </div>
        </div>
    );
}