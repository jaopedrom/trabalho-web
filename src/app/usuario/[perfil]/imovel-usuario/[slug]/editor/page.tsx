"use client"
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ImovelForm, ImovelFormInputs } from "@/src/components/imovel-form";
import { Button } from "@/components/ui/button";
import { getImovelPorId, atualizarImovel, deletarImovel } from "@/src/services/imovel.service";
import { ImovelType } from "@/src/components/imoveis/types/imoveisType";

export default function AttImovel({ params }: { params: Promise<{ perfil: string; slug: string }> }) {
    const router = useRouter();
    const { perfil, slug } = use(params);

    const [imovel, setImovel] = useState<ImovelType | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [naoEncontrado, setNaoEncontrado] = useState(false);
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
        async function buscarImovel() {
            try {
                const dados = await getImovelPorId(slug);
                setImovel(dados);
            } catch (erro) {
                console.error("Erro ao buscar imóvel:", erro);
                setNaoEncontrado(true);
            } finally {
                setCarregando(false);
            }
        }

        buscarImovel();
    }, [slug]);

    async function lidarComAtualizacao(dadosVindosDoForm: ImovelFormInputs) {
        setSalvando(true);
        try {
            await atualizarImovel(slug, { ...dadosVindosDoForm, usuarioId: perfil });
            alert("As alterações foram guardadas com sucesso!");
            router.push(`/usuario/${perfil}/imovel-usuario/`);
        } catch (error) {
            alert("Erro ao atualizar o imóvel!");
            console.error(error);
        } finally {
            setSalvando(false);
        }
    }

    async function lidarComDelecao() {
        try {
            await deletarImovel(slug);
            alert("O imóvel foi deletado com sucesso!");
            router.push(`/usuario/${perfil}/imovel-usuario/`);
        } catch (error) {
            alert("Erro ao deletar o imóvel!");
            console.error(error);
        }
    }

    if (carregando) {
        return <p className="text-center mt-8 text-gray-500">Carregando...</p>;
    }

    if (naoEncontrado || !imovel) {
        return (
            <div className="p-8 flex flex-col items-center">
                <h1 className="text-2xl font-bold text-red-600">Imóvel não encontrado.</h1>
                <Button variant="link" onClick={() => router.back()}>
                    Voltar para a lista
                </Button>
            </div>
        );
    }

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
                    Você está editando:{" "}
                    <span className="font-semibold text-gray-700">{imovel.titulo}</span>
                </p>
            </header>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <ImovelForm
                    textoBotao={salvando ? "Salvando..." : "Guardar Alterações"}
                    valoresIniciais={imovel}
                    aoEnviar={lidarComAtualizacao}
                    aoDeletar={lidarComDelecao}
                />
            </div>
        </div>
    );
}