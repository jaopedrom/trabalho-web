"use client"

import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UsuarioRootPage() {
    const { usuarioLogado, estaAutenticado } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // se não estiver logado, redireciona para a home
        if (!estaAutenticado) {
            router.push("/");
            return;
        }

        // se estiver logado, redireciona para a pasta do perfil
        if (usuarioLogado?.id) {
            router.push(`/usuario/${usuarioLogado.id}`);
        }
    }, [estaAutenticado, usuarioLogado, router]);

    // aviso enquanto faz o redirecionamento
    return (
        <div className="flex justify-center items-center h-screen w-full">
            <p className="text-gray-500">Carregando seu painel...</p>
        </div>
    );
}