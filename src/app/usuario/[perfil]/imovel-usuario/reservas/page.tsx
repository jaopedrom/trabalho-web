"use client"
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getReservasDoProprietario, atualizarStatusReserva } from "@/src/services/reserva.service";
import { Check, X, ArrowLeft } from "@phosphor-icons/react";

export default function ReservasImoveisPage({ params }: { params: Promise<{ perfil: string }> }) {
    const { perfil } = use(params);

    const [reservas, setReservas] = useState<any[]>([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        carregarReservas();
    }, []);

    async function carregarReservas() {
        try {
            setCarregando(true);
            const dados = await getReservasDoProprietario();
            // Ordenar por data de check-in (mais recente primeiro, ou pendentes primeiro)
            dados.sort((a, b) => {
                if (a.status === 'pendente' && b.status !== 'pendente') return -1;
                if (a.status !== 'pendente' && b.status === 'pendente') return 1;
                return new Date(b.dataCheckIn).getTime() - new Date(a.dataCheckIn).getTime();
            });
            setReservas(dados);
        } catch (erro) {
            console.error("Erro ao buscar reservas:", erro);
        } finally {
            setCarregando(false);
        }
    }

    async function handleAprovar(id: string) {
        try {
            await atualizarStatusReserva(id, "confirmada");
            // Atualizar o estado local
            setReservas(reservas.map(r => r.id === id ? { ...r, status: "confirmada" } : r));
        } catch (erro) {
            console.error("Erro ao aprovar:", erro);
            alert("Erro ao aprovar reserva.");
        }
    }

    async function handleCancelar(id: string) {
        if (!confirm("Tem certeza que deseja cancelar esta reserva?")) return;
        try {
            await atualizarStatusReserva(id, "cancelada");
            // Atualizar o estado local
            setReservas(reservas.map(r => r.id === id ? { ...r, status: "cancelada" } : r));
        } catch (erro) {
            console.error("Erro ao cancelar:", erro);
            alert("Erro ao cancelar reserva.");
        }
    }

    const formatarData = (dataStr: string) => {
        return new Intl.DateTimeFormat('pt-BR').format(new Date(dataStr));
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pendente':
                return <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">Pendente</span>;
            case 'confirmada':
                return <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">Confirmada</span>;
            case 'cancelada':
                return <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200">Cancelada</span>;
            case 'concluida':
                return <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200">Concluída</span>;
            default:
                return null;
        }
    };

    if (carregando) {
        return <p className="text-center mt-8 text-gray-500">Carregando reservas...</p>;
    }

    return (
        <div className="p-8 w-full">
            <div className="flex items-center gap-4 mb-8">
                <Link href={`/usuario/${perfil}/imovel-usuario`}>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Aprovação de Reservas</h1>
                    <p className="text-gray-500 mt-1">Gerencie as solicitações de hospedagem nos seus imóveis</p>
                </div>
            </div>

            {reservas.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhuma reserva encontrada</h3>
                    <p className="text-gray-500 mb-6 text-center max-w-md">
                        Ainda não há solicitações de reservas para os seus imóveis.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {reservas.map((reserva) => (
                        <div key={reserva.id} className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-40 w-full overflow-hidden bg-gray-100 relative">
                                {/* Imagem do imovel (mock/fallback if no photo) */}
                                <img 
                                    src={reserva.imovel?.foto || "/placeholder-house.jpg"} 
                                    alt={reserva.imovel?.titulo}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4">
                                    {getStatusBadge(reserva.status)}
                                </div>
                            </div>
                            
                            <div className="p-5">
                                <h3 className="font-bold text-lg text-gray-900 line-clamp-1 mb-1">
                                    {reserva.imovel?.titulo}
                                </h3>
                                <p className="text-sm text-gray-500 mb-4 line-clamp-1">{reserva.imovel?.localizacao}</p>
                                
                                <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Hóspede:</span>
                                        <span className="font-medium text-gray-900">{reserva.usuario?.nome}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Período:</span>
                                        <span className="font-medium text-gray-900">
                                            {formatarData(reserva.dataCheckIn)} até {formatarData(reserva.dataCheckOut)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm border-t pt-2 mt-2">
                                        <span className="font-medium text-gray-900">Valor Total:</span>
                                        <span className="font-bold text-blue-600">
                                            R$ {reserva.valorTotal?.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {reserva.status === 'pendente' && (
                                    <div className="flex gap-3 mt-4">
                                        <Button 
                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white" 
                                            onClick={() => handleAprovar(reserva.id)}
                                        >
                                            <Check className="w-4 h-4 mr-2" />
                                            Aprovar
                                        </Button>
                                        <Button 
                                            variant="outline" 
                                            className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                                            onClick={() => handleCancelar(reserva.id)}
                                        >
                                            <X className="w-4 h-4 mr-2" />
                                            Recusar
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
