"use client"

import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, use } from "react"; // Removido o useState, pois não precisamos mais dele!
import { Button } from "@/components/ui/button";
import { usuariosMock} from "@/src/modules/components/usuario/mock/mockUsuario";

export default function PerfilUsuarioPage({ params }: { params: Promise<{ perfil: string }> }) {

    // extrai os dados e funções globais do contexto de autenticação
    const { usuarioLogado, logout, estaAutenticado } = useAuth();
    const router = useRouter();

    // desempacotamento de parâmetros
    // hook 'use' do react para "abrir" a promise de forma síncrona
    // e extrair o id que está na url. ex: se a URL for /usuario/123, perfil será "123".
    const unwrappedParams = use(params);

    // protecao de rota
    useEffect(() => {
        if (!estaAutenticado) {
            router.push("/");
        }
    }, [estaAutenticado, router]);

    // busca de dados toda vez que a URL muda (unwrappedParams) o useEffect eh chamado
    // varre o array estático (usuariosMock) procurando alguém com o mesmo ID da URL
    const usuarioDestaPagina = unwrappedParams?.perfil
        ? usuariosMock.find((user) => user.id === unwrappedParams.perfil) || null
        : null;

    // encerramento de sessão
    const handleLogout = () => {
        logout(); // limpa o Contexto e o localStorage
        router.push("/"); // volta para a Home
    };

    // tela de carregamento
    // enquanto o useEffect está procurando o usuário, eh exibido essa tela de carregamento
    // para evitar que o codigo quebre tentando ler 'nome' ou 'email' de algo nulo
    if (!usuarioDestaPagina) {
        return (
            <div className="flex justify-center items-center h-full w-full mt-20">
                <p className="text-gray-500">Usuário não encontrado.</p>
            </div>
        );
    }

    return (
        // container principal no estilo card
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 p-6 mt-8">
            <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Bem-vindo, {usuarioDestaPagina.nome}!
                    </h1>
                    <p className="text-gray-600 mt-1">Gerencie suas informações pessoais</p>
                </div>

                {/* validacao condicional
                    botão de "Sair" apenas aparece se o ID do usuário logado no navegador for igual ao ID do perfil
                    que está sendo exibido na tela */}
                {usuarioLogado?.id === usuarioDestaPagina.id && (
                    <Button onClick={handleLogout} variant="outline" className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200">
                        Sair da Conta
                    </Button>
                )}
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <p className="text-sm text-gray-500 font-medium mb-1">Nome Completo</p>
                        <p className="text-lg text-gray-800">{usuarioDestaPagina.nome}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <p className="text-sm text-gray-500 font-medium mb-1">Email</p>
                        <p className="text-lg text-gray-800">{usuarioDestaPagina.email}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <p className="text-sm text-gray-500 font-medium mb-1">CPF</p>
                        <p className="text-lg text-gray-800">{usuarioDestaPagina.cpf}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <p className="text-sm text-gray-500 font-medium mb-1">Telefone</p>
                        <p className="text-lg text-gray-800">{usuarioDestaPagina.telefone}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}