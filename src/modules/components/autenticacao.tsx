"use client"
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Botão do seu sistema
import { LoginFormInputs, LoginForm } from "./login-form";
import { CadastroForm, CadastroFormInputs } from "./cadastro-form";

// Imports atualizados para o padrão Base UI (conforme seu exemplo)
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { usuariosMock } from "@/src/modules/components/usuario/mock/mockUsuario";
import { useAuth } from "@/src/contexts/AuthContext";
import { UsuarioType } from "@/src/modules/components/usuario/type/usuarioType";

export function Autenticacao() {
    const [telaAtiva, setTelaAtiva] = useState<"login" | "cadastro">("login");
    const [modalAberto, setModalAberto] = useState(false);
    const [erro, setErro] = useState<string>("");

    const { login } = useAuth();
    const router = useRouter();

    // Lógica de Login
    const lidarComLogin = (dados: LoginFormInputs) => {
        const usuarioEncontrado = usuariosMock.find((usuario) =>
            usuario.cpf === dados.cpf && usuario.senha === dados.senha
        );

        if (usuarioEncontrado) {
            login(usuarioEncontrado);
            setModalAberto(false);
            setErro("");
            router.push(`/usuario/${usuarioEncontrado.id}`);
        } else {
            setErro("CPF ou senha incorretos!");
        }
    };

    // Lógica de Cadastro
    const lidarComCadastro = (dados: CadastroFormInputs) => {
        const usuarioJaExiste = usuariosMock.find(u => u.cpf === dados.cpf);

        if (usuarioJaExiste) {
            setErro("Este CPF já está cadastrado!");
            return;
        }

        const novoUsuario: UsuarioType = {
            id: `user-${Date.now()}`,
            ...dados,
            imoveis: []
        };

        usuariosMock.push(novoUsuario);
        alert("Cadastro realizado com sucesso!");
        setTelaAtiva("login");
        setErro("");
    };

    const alternarTela = () => {
        setTelaAtiva(telaAtiva === "login" ? "cadastro" : "login");
        setErro("");
    };

    return (
        <Dialog open={modalAberto} onOpenChange={setModalAberto}>
            {/* No Base UI, usamos a prop 'render' para passar o componente do gatilho */}
            <DialogTrigger render={<Button variant="outline">Acessar Conta</Button>} />

            <DialogContent className="sm:max-w-md bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-xl font-bold text-gray-900">
                        {telaAtiva === "login" ? "Bem-vindo de volta!" : "Crie sua conta"}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        {telaAtiva === "login"
                            ? "Faça login para continuar acessando a plataforma."
                            : "Preencha os dados abaixo para realizar o seu cadastro."}
                    </DialogDescription>
                </DialogHeader>

                {/* Mensagem de Erro */}
                {erro && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded text-sm font-medium">
                        {erro}
                    </div>
                )}

                {/* Área do Formulário */}
                <div className="py-2 mb-4">
                    {telaAtiva === "login" ? (
                        <LoginForm aoEnviar={lidarComLogin} />
                    ) : (
                        <CadastroForm aoEnviar={lidarComCadastro} />
                    )}
                </div>

                {/* Rodapé com alternância e fechamento */}
                <div className="flex flex-col items-center gap-4 border-t pt-4">
                    <Button
                        variant="link"
                        className="text-sm text-blue-600 hover:text-blue-800"
                        onClick={alternarTela}
                    >
                        {telaAtiva === "login"
                            ? "Novo usuário? Crie sua conta!"
                            : "Já tem uma conta? Faça login"}
                    </Button>

                    {/* Botão de fechar padrão do Base UI */}
                    <DialogClose render={<Button variant="ghost" size="sm" className="text-gray-400">Cancelar</Button>} />
                </div>
            </DialogContent>
        </Dialog>
    );
}