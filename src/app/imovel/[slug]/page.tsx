"use client"

import { use } from "react";
import { useRouter } from "next/navigation";
import { usuariosMock } from "@/src/modules/components/usuario/mock/mockUsuario";
import { imoveisMock } from "@/src/modules/components/imoveis/mocks/imoveisMock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { ChevronLeft, MapPin, DollarSign, User, Calendar, Home } from "lucide-react";

export default function ImovelPublicoDetalhes({ params }: { params: Promise<{ slug: string }> }) {
    const router = useRouter();

    // 1. Desempacotar o parâmetro da URL (ID do imóvel)
    const { slug } = use(params);

    // DEBUG: Ver o que está chegando
    console.log("=== DEBUG ===");
    console.log("Slug recebido:", slug);
    console.log("Total de imóveis no mock:", imoveisMock.length);
    console.log("IDs disponíveis:", imoveisMock.map(i => i.id));

    // 2. Busca o imóvel no mock de imóveis
    const imovelEncontrado = imoveisMock.find((imovel) => imovel.id === slug);

    console.log("Imóvel encontrado:", imovelEncontrado);

    // 3. Se encontrou o imóvel, busca o dono pelo usuarioId
    const donoDoImovel = imovelEncontrado
        ? usuariosMock.find((usuario) => usuario.id === imovelEncontrado.usuarioId)
        : null;

    console.log("Dono encontrado:", donoDoImovel);
    console.log("=== FIM DEBUG ===");

    // Proteção: se o imóvel não existir
    if (!imovelEncontrado || !donoDoImovel) {
        return (
            <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
                {/*<Home className="w-16 h-16 text-gray-300 mb-4" />*/}
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Imóvel não encontrado</h1>
                <p className="text-gray-500 mb-6">O imóvel que você procura não existe ou foi removido.</p>
                <p className="text-xs text-gray-400 mb-6">Debug: Slug = {slug}</p>
                <Button variant="outline" onClick={() => router.push('/')}>
                    {/*<ChevronLeft className="w-4 h-4 mr-2" />*/}
                    Voltar para a página inicial
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="p-6 md:p-8 max-w-7xl mx-auto">
                {/* Botão de Voltar */}
                <Button
                    variant="ghost"
                    className="mb-6 -ml-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    onClick={() => router.back()}
                >
                    Voltar
                </Button>

                {/* Grid Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* COLUNA ESQUERDA: Imagem Principal */}
                    <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-gray-100">
                        <img
                            src={imovelEncontrado.foto}
                            alt={imovelEncontrado.titulo}
                            className="w-full h-full object-cover"
                        />
                        {/* Badge de Status */}
                        <div className="absolute top-4 right-4">
                            <Badge
                                variant={imovelEncontrado.status === 'livre' ? 'default' : 'secondary'}
                                className="px-4 py-2 text-sm font-bold shadow-lg uppercase tracking-wider"
                            >
                                {imovelEncontrado.status}
                            </Badge>
                        </div>
                    </div>

                    {/* COLUNA DIREITA: Informações */}
                    <div className="flex flex-col justify-between">
                        {/* Cabeçalho */}
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                                {imovelEncontrado.titulo}
                            </h1>

                            {/* Informações do Anfitrião */}
                            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 mb-6">
                                <div className="p-3 bg-blue-50 rounded-full">
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Anfitrião</p>
                                    <p className="font-semibold text-gray-900">{donoDoImovel.nome}</p>
                                </div>
                            </div>

                            {/* Detalhes do Imóvel */}
                            <div className="space-y-4 mb-8">
                                {/* Localização */}
                                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                            Localização
                                        </p>
                                        <p className="text-lg text-gray-900 font-medium">
                                        </p>
                                    </div>
                                </div>

                                {/* Preço */}
                                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200">
                                    <div className="p-2 bg-green-50 rounded-lg">
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                            Valor da Diária
                                        </p>
                                        <p className="text-2xl md:text-3xl font-bold text-gray-900">
                                            R$ {imovelEncontrado.valorDiaria.toFixed(2)}
                                            <span className="text-base font-normal text-gray-500 ml-2">/ noite</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Botão de Ação */}
                        <div className="mt-auto">
                            <Button
                                className="w-full h-14 text-base md:text-lg font-bold shadow-lg hover:shadow-xl transition-all active:scale-95"
                                size="lg"
                                disabled={imovelEncontrado.status !== 'livre'}
                                onClick={() => {
                                    // TODO: Implementar lógica de autenticação e reserva
                                    alert("Redirecionando para a página de finalização de reserva...");
                                }}
                            >
                                {imovelEncontrado.status === 'livre' ? (
                                    <>
                                        Realizar Reserva
                                    </>
                                ) : (
                                    'Imóvel Indisponível no Momento'
                                )}
                            </Button>

                            {/* Informação adicional */}
                            {imovelEncontrado.status === 'livre' && (
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