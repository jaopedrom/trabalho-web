"use client"

import { use } from "react";
import { useRouter } from "next/navigation";
// Ajuste os caminhos de importação conforme a sua estrutura
// import { usuariosMock } from "@/src/mocks/usuariosMock";
import { usuariosMock } from "@/src/modules/components/usuario/mock/mockUsuario";
// import { ImovelForm, ImovelFormInputs } from "@/src/components/ImovelForm";
import { ImovelForm, ImovelFormInputs} from "@/src/modules/imovel-form";
import { Button } from "@/components/ui/button";
// import { ChevronLeft } from "lucide-react"; // Opcional: ícone de voltar


export default function AttImovel({ params }: { params: Promise<{ perfil: string, slug: string }> }) {
    const router = useRouter();

    // 1. Capturar os Parâmetros: Extraímos o ID do utilizador (perfil) e o ID do imóvel (slug)
    const { perfil, slug } = use(params);

    // 2. Localizar os Dados Atuais
    const usuarioDono = usuariosMock.find(u => u.id === perfil);
    const imovelParaEditar = usuarioDono?.imoveis.find(i => i.id === slug);

    // Proteção: Se o imóvel não existir (ex: ID errado na URL)
    if (!imovelParaEditar) {
        return (
            <div className="p-8 flex flex-col items-center">
                <h1 className="text-2xl font-bold text-red-600">Imóvel não encontrado.</h1>
                <Button variant="link" onClick={() => router.back()}>
                    Voltar para a lista
                </Button>
            </div>
        );
    }

    // 3. Lógica de Submissão
    const lidarComAtualizacao = (dadosVindosDoForm: ImovelFormInputs) => {
        // Aqui montamos o objeto completo para a atualização
        const imovelAtualizado = {
            id: slug,           // Mantemos o ID original (slug)
            usuarioId: perfil,  // Mantemos o dono original (recuperado da URL)
            ...dadosVindosDoForm // Inserimos as novas informações do formulário
        };

        // Simulação da atualização no Mock
        console.log("Objeto pronto para persistência:", imovelAtualizado);

        // Feedback ao utilizador
        alert("As alterações foram guardadas com sucesso!");

        // Redirecionamos de volta para a página de listagem de imóveis do utilizador
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
                Voltar
            </Button>

            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Editar Propriedade</h1>
                <p className="text-gray-500 mt-1">
                    Você está editando: <span className="font-semibold text-gray-700">{imovelParaEditar.titulo}</span>
                </p>
            </header>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                {/* 4. Renderização do Formulário */}
                <ImovelForm
                    textoBotao="Guardar Alterações"
                    // Passamos os dados atuais para o formulário já abrir preenchido
                    valoresIniciais={imovelParaEditar}
                    aoEnviar={lidarComAtualizacao}
                />
            </div>
        </div>
    );
}