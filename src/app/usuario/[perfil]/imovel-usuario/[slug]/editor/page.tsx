"use client"

import { use } from "react";
import { useRouter } from "next/navigation";
import { imoveisMock } from "@/src/modules/components/imoveis/mocks/imoveisMock";
import { ImovelForm, ImovelFormInputs} from "@/src/modules/components/imovel-form";
import { Button } from "@/components/ui/button";


export default function AttImovel({ params }: { params: Promise<{ perfil: string, slug: string }> }) {
    const router = useRouter();

    // capturar os parametros, ID do usuario e o ID do imóvel sao extraidos
    const { perfil, slug } = use(params);

    // encontrar dados
    const imovelParaEditar = imoveisMock.find(i => i.id === slug && i.usuarioId === perfil);

    // caso imovel nao exista
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

    // submissao
    const lidarComAtualizacao = (dadosVindosDoForm: ImovelFormInputs) => {
        //objeto eh montado completo para a atualização
        const imovelAtualizado = {
            id: slug,           // mantem o ID original
            usuarioId: perfil,  // mantem o dono original (recuperado da URL)
            ...dadosVindosDoForm // inserido as novas informações do formulário
        };

        // atualizacao do mock simulada
        console.log("Objeto pronto para persistência:", imovelAtualizado);

        alert("As alterações foram guardadas com sucesso!");

        // redireciona para a pagina de imoveis do usuario
        router.push(`/usuario/${perfil}/imovel-usuario/`);
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <Button
                variant="ghost"
                className="mb-4 -ml-4 text-gray-500 hover:text-gray-900"
                onClick={() => router.back()}
            >
                Voltar
            </Button>

            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Editar Propriedade</h1>
                <p className="text-gray-500 mt-1">
                    Você está editando: <span className="font-semibold text-gray-700">{imovelParaEditar.titulo}</span>
                </p>
            </header>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <ImovelForm
                    textoBotao="Guardar Alterações"
                    // dados atuais para o formulário ja abrir preenchido
                    valoresIniciais={imovelParaEditar}
                    aoEnviar={lidarComAtualizacao}
                />
            </div>
        </div>
    );
}