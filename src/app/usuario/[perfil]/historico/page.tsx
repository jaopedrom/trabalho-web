"use client"

import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, use, useState } from "react";
import HospedagensUsuario, { ImoveisHospedagem } from "@/src/modules/components/tabela-historico";
import { getReservasPorUsuario } from "@/src/services/reserva.service";

// para rotas dinâmicas como /historico/[perfil]
export default function HistoricoPage({ params }: { params: Promise<{ perfil: string }> }) {
    // verifica se o usuário esta logado
    const { estaAutenticado } = useAuth();

    // instancia o roteador do next
    const router = useRouter();

    // desempacotamento do params
    const unwrappedParams = use(params);

    // estado para armazenar as reservas
    const [reservas, setReservas] = useState<ImoveisHospedagem[]>([]);
    const [carregando, setCarregando] = useState(true);

    // busca e uniao dos dados das reservas do usuario com informacoes dos imoveis
    useEffect(() => {
        if (!estaAutenticado) {
            router.push("/");
            return;
        }

        async function buscarReservas() {
            try {
                const dados = await getReservasPorUsuario(unwrappedParams.perfil);
                setReservas(dados);
            } catch (erro) {
                console.error("Erro ao buscar reservas:", erro);
            } finally {
                setCarregando(false);
            }
        }

        buscarReservas();

    }, [estaAutenticado, router, unwrappedParams.perfil]);

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 p-6 mt-8">

            {/* cabeçalho da pagina */}
            <div className="mb-6 pb-4 border-b">
                <h1 className="text-3xl font-bold text-gray-800">
                    Histórico de Hospedagens
                </h1>
                <p className="text-gray-600 mt-1">
                    {/* parâmetro dinamico da URL que foi extraído */}
                    Visualizando o histórico do usuário ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">{unwrappedParams.perfil}</span>
                </p>
            </div>

            {/* exibe a tabela se houver reservas, caso contrario mostra um estado vazio */}
            {reservas.length > 0 ? (
                <HospedagensUsuario reservas={reservas} />
            ) : (
                <div className="bg-gray-50 p-8 rounded-lg text-center border border-dashed border-gray-300">
                    <p className="text-gray-500 font-medium">Nenhuma hospedagem encontrada no histórico.</p>
                    <p className="text-sm text-gray-400 mt-2">As viagens futuras e passadas aparecerão aqui.</p>
                </div>
            )}

        </div>
    );
}