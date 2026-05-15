"use client"

import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { usuariosMock } from "@/src/modules/components/usuario/mock/mockUsuario";
import { EdicaoUsuarioForm, EdicaoUsuarioFormInputs } from "@/src/modules/components/edicao-usuario-form";
import { useState } from "react";

export default function PerfilUsuarioPage({ params }: { params: Promise<{ perfil: string }> }) {

    // extrai os dados e funcoes globais do contexto de autenticacao
    const { usuarioLogado, logout, estaAutenticado } = useAuth();
    const router = useRouter();

    // desempacotamento de parametros
    // hook 'use' do react para "abrir" a promise de forma sincronica
    // e extrair o id que esta na url. ex: se a URL for /usuario/123, perfil sera "123".
    const unwrappedParams = use(params);

    // protecao de rota
    useEffect(() => {
        if (!estaAutenticado) {
            router.push("/");
        }
    }, [estaAutenticado, router]);

    // busca de dados toda vez que a url muda (unwrappedParams) o useEffect eh chamado
    // varre o array de usuariosMock procurando o usuario com o mesmo id da url
    const usuarioDestaPagina = unwrappedParams?.perfil
        ? usuariosMock.find((user) => user.id === unwrappedParams.perfil) || null
        : null;

    // encerramento de sessão
    const handleLogout = () => {
        logout(); // limpa o Contexto e o localStorage
        router.push("/"); // volta para a home
    };

    // enquanto o useEffect está procurando o usuário, eh exibido essa tela de carregamento
    if (!usuarioDestaPagina) {
        return (
            <div className="flex justify-center items-center h-full w-full mt-20">
                <p className="text-gray-500">Usuário não encontrado.</p>
            </div>
        );
    }

    const [estaEditando, setEstaEditando] = useState(false);
    const [montado, setMontado] = useState(false);

    useEffect(() => {
        setMontado(true);
    }, []);

    // callback do form que sera passado para o filho
    const processarAtualizacao = (data: EdicaoUsuarioFormInputs) => {
        console.log("Dados para serem salvo:", data);
        // requisao de atualizacao, implementacao futura
        setEstaEditando(false); // sai do modo de edicao
    };

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
                {montado && usuarioLogado?.id === usuarioDestaPagina.id && (
                    <Button onClick={handleLogout} variant="outline" className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200">
                        Sair da Conta
                    </Button>
                )}
            </div>

            <div className="space-y-4 flex justify-center">
                <EdicaoUsuarioForm
                    aoEnviar={processarAtualizacao}
                    estaEditando={estaEditando}
                    usuario={usuarioDestaPagina}
                    aoEditar={() => setEstaEditando(true)}
                    aoCancelar={() => setEstaEditando(false)} />
            </div>
        </div>
    );
}