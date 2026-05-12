"use client"

import { use } from "react";
import { useRouter } from "next/navigation";
// import { usuariosMock } from "@/src/mocks/usuariosMock";
import { usuariosMock } from "@/src/modules/components/usuario/mock/mockUsuario";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { MapPin, DollarSign, Info } from "lucide-react";

export default function ImovelDetalhes({ params }: { params: Promise<{ perfil: string, slug: string }> }) {
    const router = useRouter();

    // 1. Desempacotar os parâmetros da URL (usuário e imóvel)
    const { perfil, slug } = use(params);

    // 2. Buscar o usuário dono e, dentro dele, o imóvel específico
    const usuarioDono = usuariosMock.find((u) => u.id === perfil);
    const imovel = usuarioDono?.imoveis.find((i) => i.id === slug);

    // Proteção: Caso o link esteja quebrado ou o ID não exista
    if (!imovel) {
        return (
            <div className="p-8 flex flex-col items-center justify-center min-h-[50vh]">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Imóvel não encontrado!</h1>
                <Button variant="outline" onClick={() => router.back()}>
                    Voltar para a lista
                </Button>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-6xl mx-auto">
            {/* Botão Superior de Voltar */}
            <Button
                variant="ghost"
                className="mb-6 -ml-4 text-gray-500 hover:text-gray-900 transition-colors"
                onClick={() => router.back()}
            >
                {/*<ChevronLeft className="w-4 h-4 mr-1" />*/}
                Voltar para a listagem
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* COLUNA ESQUERDA: Galeria/Imagem Principal */}
                <div className="relative aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-100">
                    <img
                        src={imovel.foto}
                        alt={imovel.titulo}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-6 right-6">
                        <Badge
                            variant={imovel.status === 'livre' ? 'default' : 'secondary'}
                            className="px-4 py-1.5 text-sm font-bold shadow-lg uppercase tracking-widest"
                        >
                            {imovel.status}
                        </Badge>
                    </div>
                </div>

                {/* COLUNA DIREITA: Informações e Ações */}
                <div className="flex flex-col py-4">
                    <h1 className="text-4xl font-black text-gray-900 mb-6 leading-tight">
                        {imovel.titulo}
                    </h1>

                    <div className="space-y-8">
                        {/* Seção: Localização */}
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-100 rounded-xl text-blue-700">
                                {/*<MapPin className="w-6 h-6" />*/}
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Localização</p>
                                <p className="text-xl text-gray-700 font-medium">{imovel.localizacao}</p>
                            </div>
                        </div>

                        {/* Seção: Preço */}
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-green-100 rounded-xl text-green-700">
                                {/*<DollarSign className="w-6 h-6" />*/}
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Valor da Diária</p>
                                <p className="text-3xl font-black text-gray-900">
                                    R$ {imovel.valorDiaria.toFixed(2)}
                                    <span className="text-base font-normal text-gray-500 ml-2">/ noite</span>
                                </p>
                            </div>
                        </div>

                        {/* Seção: Info de Status */}
                        <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                            {/*<Info className="w-6 h-6 text-gray-400 mt-1" />*/}
                            <div>
                                <p className="text-sm font-semibold text-gray-900 mb-1">Status da Propriedade</p>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {imovel.status === 'livre'
                                        ? 'Atualmente disponível para novas reservas e check-ins imediatos.'
                                        : imovel.status === 'manutencao'
                                            ? 'Indisponível temporariamente para realização de serviços de limpeza ou reparos.'
                                            : 'O imóvel está ocupado por hóspedes neste exato momento.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Ações Inferiores */}
                    <div className="mt-12 flex flex-col sm:flex-row gap-4">
                        <Button className="flex-1 h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95">
                            Realizar Reserva
                        </Button>
                        <Button
                            variant="outline"
                            className="h-14 px-8 border-2 font-semibold hover:bg-gray-50 transition-all"
                            onClick={() => router.push(`/usuario/${perfil}/imoveis/${slug}/editor`)}
                        >
                            Editar Detalhes
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}