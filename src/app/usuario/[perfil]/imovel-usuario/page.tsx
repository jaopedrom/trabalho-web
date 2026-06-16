"use client"
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardImage } from "@/src/modules/components/card-imoveis";
import { getImoveisDoUsuario } from "@/src/services/usuario.service";
import { ImovelType } from "@/src/modules/components/imoveis/types/imoveisType";

export default function ImoveisPage({ params }: { params: Promise<{ perfil: string }> }) {
    const { perfil } = use(params);

    const [imoveis, setImoveis] = useState<ImovelType[]>([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function buscarImoveis() {
            try {
                const dados = await getImoveisDoUsuario(perfil);
                setImoveis(dados);
            } catch (erro) {
                console.error("Erro ao buscar imóveis:", erro);
            } finally {
                setCarregando(false);
            }
        }

        buscarImoveis();
    }, [perfil]);

    if (carregando) {
        return <p className="text-center mt-8 text-gray-500">Carregando...</p>;
    }

    return (
        <div className="p-8 w-full">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Os Meus Imóveis</h1>
                    <p className="text-gray-500 mt-1">Gira e acompanhe as suas propriedades</p>
                </div>
                {imoveis.length > 0 && (
                    <Link href={`/usuario/${perfil}/imovel-usuario/novo`}>
                        <Button>Adicionar Imóvel</Button>
                    </Link>
                )}
            </div>

            {imoveis.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Sem imóveis registados</h3>
                    <p className="text-gray-500 mb-6 text-center max-w-md">
                        Ainda não possui nenhum imóvel anunciado na plataforma. Comece agora a hospedar pessoas de todo o mundo.
                    </p>
                    <Link href={`/usuario/${perfil}/imovel-usuario/novo`}>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            Cadastrar o meu primeiro imóvel
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {imoveis.map((imovel) => (
                        <CardImage key={imovel.id} data={imovel} perfilId={perfil} />
                    ))}
                </div>
            )}
        </div>
    );
}