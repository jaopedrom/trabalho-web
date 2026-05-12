// Diretiva obrigatória no Next.js (App Router) quando usamos hooks (useState, useEffect, use, etc) 
// ou eventos do navegador. Indica que este código será executado do lado do cliente.
"use client"

import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, use } from "react";

// interface define que 'params' é uma Promise
// para rotas dinâmicas como /historico/[perfil]
export default function HistoricoPage({ params }: { params: Promise<{ perfil: string }> }) {
    // verifica se o usuário esta logado
    const { estaAutenticado } = useAuth();

    // instancia o roteador do Next.js para permitir redirecionamentos
    const router = useRouter();

    // usamos o hook 'use()' do React para "abrir" a Promise e ler o valor de { perfil } de forma síncrona.
    const unwrappedParams = use(params);

    // protecap de rota
    // observa a variável 'estaAutenticado' assim que a tela carrega,
    // se o usuario nao estiver logado, ele é redirecionado para a pagina inicial "/".
    useEffect(() => {
        if (!estaAutenticado) {
            router.push("/");
        }
    }, [estaAutenticado, router]);

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 p-6 mt-8">

            {/* cabeçalho da pagina */}
            <div className="mb-6 pb-4 border-b">
                <h1 className="text-3xl font-bold text-gray-800">
                    Histórico de Hospedagens
                </h1>
                <p className="text-gray-600 mt-1">
                    {/* parâmetro dinâmico da URL que foi extraído se a URL for /usuario/123/historico, ele vai exibir "123". */}
                    Visualizando o histórico do usuário ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">{unwrappedParams.perfil}</span>
                </p>
            </div>

            {/* Área de conteúdo "vazio" (Empty State) map do array de histórico no futuro usando .map() */}
            <div className="bg-gray-50 p-8 rounded-lg text-center border border-dashed border-gray-300">
                <p className="text-gray-500 font-medium">Nenhuma hospedagem encontrada no histórico.</p>
                <p className="text-sm text-gray-400 mt-2">As viagens futuras e passadas aparecerão aqui.</p>
            </div>

        </div>
    );
}