"use client"

import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, use } from "react";
import { reservasMock } from "@/src/modules/components/reserva/mocks/reserva-mock";
import { imoveisMock } from "@/src/modules/components/imoveis/mocks/imoveisMock";
import HospedagensUsuario, { ImoveisHospedagem } from "@/src/modules/components/tabela-historico";

// para rotas dinâmicas como /historico/[perfil]
export default function HistoricoPage({ params }: { params: Promise<{ perfil: string }> }) {
    // verifica se o usuário esta logado
    const { estaAutenticado } = useAuth();

    // instancia o roteador do next
    const router = useRouter();

    // desempacotamento do params
    const unwrappedParams = use(params);

    // proteção de rota, se o usuario nao estiver logado, ele é redirecionado para a pagina inicial
    useEffect(() => {
        if (!estaAutenticado) {
            router.push("/");
        }
    }, [estaAutenticado, router]);

    // busca e uniao dos dados das reservas do usuario com informacoes dos imoveis
    const reservasUsuario: ImoveisHospedagem[] = reservasMock
        .filter((reserva) => reserva.usuarioId === unwrappedParams.perfil)
        .map((reserva) => {
            const imovel = imoveisMock.find(i => i.id === reserva.imovelId);

            return {
                ...reserva,
                imovel: imovel
            };
        });

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
            {reservasUsuario.length > 0 ? (
                <HospedagensUsuario reservas={reservasUsuario} />
            ) : (
                <div className="bg-gray-50 p-8 rounded-lg text-center border border-dashed border-gray-300">
                    <p className="text-gray-500 font-medium">Nenhuma hospedagem encontrada no histórico.</p>
                    <p className="text-sm text-gray-400 mt-2">As viagens futuras e passadas aparecerão aqui.</p>
                </div>
            )}

        </div>
    );
}