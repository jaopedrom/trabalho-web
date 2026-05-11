"use client"
import * as React from 'react';
import { NavigationMenu } from '@base-ui/react/navigation-menu';
import { useMediaQuery } from '@base-ui/react/unstable-use-media-query';

import Link from "next/link";
import AuthLoginPage from "@/src/app/autenticacao/login/page";
import CadastroPage from "@/src/app/autenticacao/cadastro/page";

export default function Navbar() {
    const isDesktop = useMediaQuery('(min-width: 700px)', { defaultMatches: true });

    return (
        <NavigationMenu.Root className="bg-gray-50 rounded-lg p-1 text-gray-900 min-w-max">
            <NavigationMenu.List className="flex relative list-none p-0 m-0">
                <NavigationMenu.Item>
                    <Link className="box-border flex items-center justify-center gap-1.5 h-10 px-3.5 m-0 outline-none border-none rounded-md bg-gray-50 text-base font-normal leading-6 text-gray-900 select-none no-underline max-sm:text-[0.925rem] max-sm:px-2 hover:bg-gray-100 data-[popup-open]:bg-gray-100 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:-outline-offset-1"
                          href="/">
                        Home
                    </Link>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                    <Link className="box-border flex items-center justify-center gap-1.5 h-10 px-3.5 m-0 outline-none border-none rounded-md bg-gray-50 text-base font-normal leading-6 text-gray-900 select-none no-underline max-sm:text-[0.925rem] max-sm:px-2 hover:bg-gray-100 data-[popup-open]:bg-gray-100 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:-outline-offset-1"
                          href="/sobre">
                        Sobre
                    </Link>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                    <Link className="box-border flex items-center justify-center gap-1.5 h-10 px-3.5 m-0 outline-none border-none rounded-md bg-gray-50 text-base font-normal leading-6 text-gray-900 select-none no-underline max-sm:text-[0.925rem] max-sm:px-2 hover:bg-gray-100 data-[popup-open]:bg-gray-100 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:-outline-offset-1"
                          href="/autenticacao/cadastro">
                        Cadastro
                    </Link>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                    <Link className="box-border flex items-center justify-center gap-1.5 h-10 px-3.5 m-0 outline-none border-none rounded-md bg-gray-50 text-base font-normal leading-6 text-gray-900 select-none no-underline max-sm:text-[0.925rem] max-sm:px-2 hover:bg-gray-100 data-[popup-open]:bg-gray-100 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:-outline-offset-1"
                          href="/autenticacao/login">
                        Login
                    </Link>
                </NavigationMenu.Item>
            </NavigationMenu.List>
        </NavigationMenu.Root>
    );
}