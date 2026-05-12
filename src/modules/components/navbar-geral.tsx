"use client"
import * as React from 'react';
import { NavigationMenu } from '@base-ui/react/navigation-menu';
import Link from "next/link";
import { Autenticacao } from "./autenticacao";
import { useAuth } from "@/src/contexts/AuthContext";

export default function NavbarGeral() {
    // contexto global
    // extrai usuário que esta logado e quem eh o usuário (usuarioLogado).
    // crucial para pegar o id dele e montar a URL do painel
    const { estaAutenticado, usuarioLogado } = useAuth();

    // estados locais da navbar
    const [montado, setMontado] = React.useState(false);
    // 'logadoLocalStorage' serve como uma verificação extra para garantir que
    // a Navbar não "pisque" o botão de login antes de ler o Contexto completamente.
    const [logadoLocalStorage, setLogadoLocalStorage] = React.useState(false);

    // montagem e sincronização
    // executa apenas uma vez quando o componente surge na tela do navegador
    React.useEffect(() => {
        // o componente já está no navegador,entao renderizar as coisas dinamicas
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMontado(true);

        // faz uma leitura direta no localStorage
        const usuarioSalvo = localStorage.getItem('@ProjetoWeb:usuario');

        // se tem algo salvo no HD ou no contexto global diz que esta logado,
        // garante que a navbar saiba que o usuario esta autenticado.
        if (usuarioSalvo || estaAutenticado) {
            setLogadoLocalStorage(true);
        } else {
            setLogadoLocalStorage(false);
        }
    }, [estaAutenticado]);

    const triggerClassName = "box-border flex items-center justify-center gap-1.5 h-10 px-3.5 m-0 outline-none border-none rounded-md bg-gray-50 text-gray-900 text-base font-normal leading-6 select-none no-underline hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-blue-500";

    return (
        // container raiz do menu de navegação
        <NavigationMenu.Root className="bg-gray-50 rounded-lg p-1 text-gray-900 min-w-max">
            <NavigationMenu.List className="flex gap-4 relative list-none p-0 m-0">

                {/* Link padrão estatico: Home */}
                <NavigationMenu.Item>
                    <Link className={triggerClassName} href="/">
                        Home
                    </Link>
                </NavigationMenu.Item>

                {/* rendeizacao condicional do botao de autenticacao */}
                <NavigationMenu.Item>
                    {/* verifica se o componente foi rederizado, caso nao foi, mostra uma espaco vazio */}
                    {!montado ? (
                            <div className="w-[140px] h-10 bg-transparent"></div>
                        ) :

                        // componente montado, usuario esta logado, verifica se os dados existem
                        (logadoLocalStorage || estaAutenticado) && usuarioLogado ? (

                            // se sim, renderiza um botao que leva para a rota dinâmica do perfil dele
                            // Template Literals (Crase ` ` e ${}) para injetar o ID do usuario na URL
                            // se o ID for "123", o link vira "/usuario/123".
                            <Link
                                className="box-border flex items-center justify-center gap-1.5 h-10 px-3.5 m-0 outline-none border-none rounded-md bg-gray-800 text-white text-base font-normal leading-6 select-none no-underline hover:bg-black transition-colors"
                                href={`/usuario/${usuarioLogado.id}`}
                            >
                                Painel do Usuário
                            </Link>
                        ) : (

                            // se não estiver logado, mostra o componente Autenticacao
                            <Autenticacao />
                        )}
                </NavigationMenu.Item>
            </NavigationMenu.List>
        </NavigationMenu.Root>
    );
}