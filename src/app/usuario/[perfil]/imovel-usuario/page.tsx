"use client"

import { use } from "react";
import Link from "next/link";
import { usuariosMock} from "@/src/modules/components/usuario/mock/mockUsuario";
import { Button } from "@/components/ui/button";
import { CardImage} from "@/src/modules/components/card-imoveis";

export default function ImoveisPage({ params }: { params: Promise<{ perfil: string }> }) {
    // 1. Capturar o Parâmetro: Desempacotar a promessa da rota
    const unwrappedParams = use(params);

    // 2. Buscar o Utilizador no mock
    const usuarioEncontrado = usuariosMock.find((user) => user.id === unwrappedParams.perfil);

    // Proteção básica: se o utilizador não for encontrado
    if (!usuarioEncontrado) {
        return (
            <div className="p-8">
                <h2 className="text-xl font-semibold text-gray-700">Utilizador não encontrado.</h2>
            </div>
        );
    }

    // 3. Isolar os Imóveis
    // O fallback "|| []" garante que nunca teremos erro caso a propriedade venha indefinida
    const imoveisDoUsuario = usuarioEncontrado.imoveis || [];

    return (
        <div className="p-8 w-full">
            {/* Cabeçalho da Página */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Os Meus Imóveis</h1>
                    <p className="text-gray-500 mt-1">Gira e acompanhe as suas propriedades</p>
                </div>

                {/* Botão de adicionar no topo, visível se já existirem imóveis */}
                {imoveisDoUsuario.length > 0 && (
                    <Link href={`/usuario/${unwrappedParams.perfil}/imovel-usuario/novo`}>
                        <Button>Adicionar Imóvel</Button>
                    </Link>
                )}
            </div>

            {/* 4. Renderização Condicional (O Pulo do Gato) */}
            {imoveisDoUsuario.length === 0 ? (
                /* Cenário A: Array Vazio (Empty State) */
                <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Sem imóveis registados</h3>
                    <p className="text-gray-500 mb-6 text-center max-w-md">
                        Ainda não possui nenhum imóvel anunciado na plataforma. Comece agora a hospedar pessoas de todo o mundo.
                    </p>
                    <Link href={`/usuario/${unwrappedParams.perfil}/imovel-usuario/novo`}>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            Cadastrar o meu primeiro imóvel
                        </Button>
                    </Link>
                </div>
            ) : (
                /* Cenário B: Array com Imóveis (Laço de Repetição) */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {imoveisDoUsuario.map((imovel) => (
                        <CardImage
                            key={imovel.id}
                            data={imovel} // 'data' em vez de 'imovel' para bater com o seu componente
                            perfilId={unwrappedParams.perfil} // Isso faz o botão azul aparecer!
                        />
                    ))}
                </div>
            )}
        </div>
    );
}