"use client"

import { use } from "react";
import { useRouter } from "next/navigation";
import { ImovelForm, ImovelFormInputs} from "@/src/modules/imovel-form";
import { Button } from "@/components/ui/button";
// import { ChevronLeft } from "lucide-react";

export default function AddImovelPage({ params }: { params: Promise<{ perfil: string }> }) {
    const router = useRouter();

    // 1. Capturar o Parâmetro: Extraímos o ID do utilizador (perfil)
    const { perfil } = use(params);

    // 2. Lógica de Cadastro
    const lidarComCadastro = (dadosVindosDoForm: ImovelFormInputs) => {
        // Criamos o objeto final do imóvel
        const novoImovel = {
            id: `imovel-${Date.now()}`, // Geramos um ID único temporário baseado no timestamp
            usuarioId: perfil,           // Vinculamos ao dono (ID da URL)
            ...dadosVindosDoForm         // Espalhamos os dados (titulo, foto, valor, etc)
        };

        // Simulação de persistência
        console.log("Novo imóvel criado com sucesso:", novoImovel);

        // No futuro, aqui você faria:
        // usuariosMock.find(u => u.id === perfil).imovel-usuario.push(novoImovel);

        alert("Imóvel cadastrado com sucesso!");

        // Redirecionamos para a lista de imóveis do utilizador
        router.push(`/usuario/${perfil}/imoveis`);
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            {/* Botão de Voltar */}
            <Button
                variant="ghost"
                className="mb-4 -ml-4 text-gray-500 hover:text-gray-900"
                onClick={() => router.back()}
            >
                {/*<ChevronLeft className="w-4 h-4 mr-1" />*/}
                Voltar para a lista
            </Button>

            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Anunciar Novo Imóvel</h1>
                <p className="text-gray-500 mt-1">
                    Preencha os dados abaixo para disponibilizar sua propriedade para aluguer.
                </p>
            </header>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                {/* 3. Renderização do Formulário */}
                <ImovelForm
                    textoBotao="Cadastrar Propriedade"
                    aoEnviar={lidarComCadastro}
                />
            </div>
        </div>
    );
}