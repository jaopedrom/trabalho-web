// src/app/gerenciamento-usuario/page.tsx
"use client"

import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GerenciamentoUsuarioPage() {
    const { usuarioLogado, logout, estaAutenticado } = useAuth();
    const router = useRouter();

    // Verifica se o usuário está autenticado
    // Se não estiver, redireciona para login
    useEffect(() => {
        if (!estaAutenticado) {
            console.log("Usuário não autenticado, redirecionando para login...");
            router.push("/autenticacao/login");
        }
    }, [estaAutenticado, router]);

    // Função para fazer logout
    const handleLogout = () => {
        logout();
        router.push("/autenticacao/login");
    };

    // Enquanto verifica autenticação, mostra loading
    if (!estaAutenticado || !usuarioLogado) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Carregando...</p>
            </div>
        );
    }

    // Usuário está autenticado, mostra a página
    return (
        <main className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                {/* Cabeçalho com informações do usuário */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Bem-vindo, {usuarioLogado.nome}!
                        </h1>
                        <p className="text-gray-600 mt-1">Gerencie suas informações</p>
                    </div>
                    <Button onClick={handleLogout} variant="outline">
                        Sair
                    </Button>
                </div>

                {/* Informações do usuário */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        Dados do Usuário
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 font-medium">Nome</p>
                            <p className="text-lg text-gray-800">{usuarioLogado.nome}</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 font-medium">Email</p>
                            <p className="text-lg text-gray-800">{usuarioLogado.email}</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 font-medium">CPF</p>
                            <p className="text-lg text-gray-800">{usuarioLogado.cpf}</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 font-medium">Telefone</p>
                            <p className="text-lg text-gray-800">{usuarioLogado.telefone}</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                            <p className="text-sm text-gray-600 font-medium">ID do Usuário</p>
                            <p className="text-lg text-gray-800 font-mono">{usuarioLogado.id}</p>
                        </div>
                    </div>

                    {/* Seção de imóveis */}
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">
                            Meus Imóveis
                        </h2>
                        {usuarioLogado.imoveis && usuarioLogado.imoveis.length > 0 ? (
                            <div className="space-y-2">
                                {usuarioLogado.imoveis.map((imovel, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-800">{JSON.stringify(imovel)}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gray-50 p-6 rounded-lg text-center">
                                <p className="text-gray-600">Você ainda não possui imóveis cadastrados.</p>
                                <Button className="mt-4" variant="outline">
                                    Adicionar Imóvel
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}