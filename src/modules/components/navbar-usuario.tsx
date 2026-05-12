"use client"

import * as React from 'react';
import { NavigationMenu } from '@base-ui/react/navigation-menu';
import Link from "next/link";
import { useAuth } from "@/src/contexts/AuthContext";

export function MenubarDemo() {
    // usoo do Contexto, extrai os dados do usuário e a função de logout do nosso contexto global.
    const { usuarioLogado, logout } = useAuth();

    // Como a Navbar depende do localStorage (que só existe no navegador),
    // começamos com o componente "desmontado" no servidor.
    const [montado, setMontado] = React.useState(false);

    // assim que a tela carrega no navegador, o useEffect dispara e muda o estado
    React.useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMontado(true);
    }, []);

    // se o React não terminou de montar a tela, segura a renderização e mostra uma mensagem neutra para evitar erro na tela
    if (!montado) {
        return <div className="p-4 text-sm text-gray-400">Preparando menu...</div>;
    }

    // Segurança extra: Se por algum motivo o sistema achar que está logado mas o 
    // objeto 'usuarioLogado' for nulo, evitamos que o código quebre na linha de baixo.
    if (!usuarioLogado) {
        return <div className="p-4 text-sm text-gray-400">Carregando menu...</div>;
    }

    // variáveis auxiliares
    // baseUrl: cria a raiz da URL dinamica (ex: "/usuario/123")
    const baseUrl = `/usuario/${usuarioLogado.id}`;

    // itemClass: todo o Tailwind dos botoes
    const itemClass = "box-border flex w-full items-center justify-between px-3 py-2 outline-none border-none rounded-md bg-transparent text-gray-700 text-sm font-medium select-none no-underline hover:bg-gray-100 focus-visible:bg-gray-100 cursor-pointer transition-colors";

    return (
        // container principal da navegacao
        <NavigationMenu.Root orientation="vertical" className="flex flex-col w-full relative">
            <NavigationMenu.List className="flex flex-col w-full m-0 p-0 list-none space-y-1">

                {/* Link: Perfil */}
                <NavigationMenu.Item>
                    <Link href={baseUrl} className={itemClass}>
                        Perfil
                    </Link>
                </NavigationMenu.Item>

                {/* Link: Histórico */}
                <NavigationMenu.Item>
                    <Link href={`${baseUrl}/historico`} className={itemClass}>
                        Histórico de hospedagens
                    </Link>
                </NavigationMenu.Item>

                {/* Menu Dropdown (Sub-menu de Imóveis) */}
                <NavigationMenu.Item className="relative">
                    {/* Trigger: botão que o usuario clica para abrir as opções */}
                    <NavigationMenu.Trigger className={`${itemClass} data-[state=open]:bg-gray-100`}>
                        Imóveis
                        <span aria-hidden="true" className="ml-2 text-[10px] opacity-50">▶</span>
                    </NavigationMenu.Trigger>

                    {/* Content: caixa com as opções*/}
                    <NavigationMenu.Content className="absolute left-full top-0 ml-2 min-w-50 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50 flex flex-col gap-1 outline-none">
                        <Link href={`${baseUrl}/imoveis`} className={itemClass}>
                            Dashboard
                        </Link>
                        <div className="h-px bg-gray-100 my-1 mx-2" />
                        <div className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            CRUD
                        </div>
                        <Link href={`${baseUrl}/imoveis/novo`} className={itemClass}>
                            Cadastrar novo
                        </Link>
                        <Link href={`${baseUrl}/imoveis`} className={itemClass}>
                            Editar imóveis
                        </Link>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>

                {/* linha divisoria */}
                <div className="h-px bg-gray-200 my-2 mx-1" />

                {/* botao de acao: Logout */}
                <NavigationMenu.Item>
                    {/* botão que dispara a função logout() extraída do contexto */}
                    <button
                        onClick={logout}
                        className="box-border flex w-full items-center px-3 py-2 outline-none border-none rounded-md bg-transparent text-red-600 text-sm font-medium select-none cursor-pointer hover:bg-red-50 hover:text-red-700 focus-visible:bg-red-50 transition-colors"
                    >
                        Sair
                    </button>
                </NavigationMenu.Item>

            </NavigationMenu.List>
        </NavigationMenu.Root>
    )
}