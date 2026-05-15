"use client"

import { use } from "react";
import Link from "next/link";
import { usuariosMock } from "@/src/modules/components/usuario/mock/mockUsuario";
import { imoveisMock } from "@/src/modules/components/imoveis/mocks/imoveisMock";
import { Button } from "@/components/ui/button";
import { CardImage } from "@/src/modules/components/card-imoveis";

export default function ImoveisPage({ params }: { params: Promise<{ perfil: string }> }) {
    // captura parametro e desempacota
    const unwrappedParams = use(params);

    // busca o usuario no mock
    const usuarioEncontrado = usuariosMock.find((user) => user.id === unwrappedParams.perfil);

    // se o utilizador não for encontrado
    if (!usuarioEncontrado) {
        return (
            <div className="p-8">
                <h2 className="text-xl font-semibold text-gray-700">Utilizador não encontrado.</h2>
            </div>
        );
    }

    // isolar os imoveis
    const imoveisDoUsuario = imoveisMock.filter((i) => i.usuarioId === unwrappedParams.perfil);

    return (
        <div className="p-8 w-full">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Os Meus Imóveis</h1>
                    <p className="text-gray-500 mt-1">Gira e acompanhe as suas propriedades</p>
                </div>

                {imoveisDoUsuario.length > 0 && (
                    <Link href={`/usuario/${unwrappedParams.perfil}/imovel-usuario/novo`}>
                        <Button>Adicionar Imóvel</Button>
                    </Link>
                )}
            </div>

            {/* exibicao condicional */}
            {imoveisDoUsuario.length === 0 ? (
                /* array vazio */
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
                /* array com imoveis */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {imoveisDoUsuario.map((imovel) => (
                        <CardImage
                            key={imovel.id}
                            data={imovel}
                            perfilId={unwrappedParams.perfil}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}