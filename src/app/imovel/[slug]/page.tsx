"use client"
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getImovelPorId } from "@/src/services/imovel.service";
import { ImovelType } from "@/src/modules/components/imoveis/types/imoveisType";

export default function ImovelPublicoDetalhes({ params }: { params: Promise<{ slug: string }> }) {
    const router = useRouter();
    const { slug } = use(params);

    const [imovel, setImovel] = useState<ImovelType | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [naoEncontrado, setNaoEncontrado] = useState(false);

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

    if (carregando) {
        return <p className="text-center mt-8 text-gray-500">Carregando...</p>;
    }

    if (naoEncontrado || !imovel) {
        return (
            <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Imóvel não encontrado</h1>
                <p className="text-gray-500 mb-6">O imóvel que você procura não existe ou foi removido.</p>
                <Button variant="outline" onClick={() => router.push("/")}>
                    Voltar para a página inicial
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="p-6 md:p-8 max-w-7xl mx-auto">
                <Button
                    variant="ghost"
                    className="mb-6 -ml-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    onClick={() => router.back()}
                >
                    Voltar
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* imagem */}
                    <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-gray-100">
                        <img src={imovel.foto} alt={imovel.titulo} className="w-full h-full object-cover" />
                        <div className="absolute top-4 right-4">
                            <Badge
                                variant={imovel.status === "livre" ? "default" : "secondary"}
                                className="px-4 py-2 text-sm font-bold shadow-lg uppercase tracking-wider"
                            >
                                {imovel.status}
                            </Badge>
                        </div>
                    </div>

                    {/* infos */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                                {imovel.titulo}
                            </h1>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200">
                                    <div className="flex-1">
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                            Localização
                                        </p>
                                        <p className="text-lg text-gray-900 font-medium">{imovel.localizacao}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200">
                                    <div className="flex-1">
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                            Valor da Diária
                                        </p>
                                        <p className="text-2xl md:text-3xl font-bold text-gray-900">
                                            R$ {imovel.valorDiaria.toFixed(2)}
                                            <span className="text-base font-normal text-gray-500 ml-2">/ noite</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto">
                            <Button
                                className="w-full h-14 text-base md:text-lg font-bold shadow-lg hover:shadow-xl transition-all active:scale-95"
                                size="lg"
                                disabled={imovel.status !== "livre"}
                                onClick={() => {
                                    // implementacao da pagina de reserva
                                    alert("Redirecionando para a página de finalização de reserva...");
                                }}
                            >
                                {imovel.status === "livre" ? "Realizar Reserva" : "Imóvel Indisponível no Momento"}
                            </Button>

                            {imovel.status === "livre" && (
                                <p className="text-sm text-gray-500 text-center mt-3">
                                    Você pode reservar este imóvel agora mesmo
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}