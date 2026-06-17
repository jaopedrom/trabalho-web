"use client"
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LoginFormInputs, LoginForm } from "./login-form";
import { CadastroForm, CadastroFormInputs } from "./cadastro-form";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { useAuth } from "@/src/contexts/AuthContext";
import { criarUsuario } from "@/src/services/usuario.service";
import { realizarLogin } from "@/src/services/autenticacao.service";

export function Autenticacao() {
    const [telaAtiva, setTelaAtiva] = useState<"login" | "cadastro">("login");
    const [modalAberto, setModalAberto] = useState(false);
    const [erro, setErro] = useState<string>("");

    const { login } = useAuth();
    const router = useRouter();

    // login
    const lidarComLogin = async (dados: LoginFormInputs) => {
        setErro("");
        try {
            const usuarioAutenticado = await realizarLogin(dados);
            login(usuarioAutenticado);
            setModalAberto(false);
            router.push(`/usuario/${usuarioAutenticado.id}`);
        } catch (error: any) {
            setErro(error.message || "CPF ou senha incorretos!");
        }
    };

    // cadastro
    const lidarComCadastro = async (dados: CadastroFormInputs) => {
        setErro("");
        try {
            await criarUsuario(dados);
            alert("Cadastro realizado com sucesso!");
            setTelaAtiva("login");
        } catch (error: any) {
            setErro(error.message || "Este CPF ou Email já está cadastrado!");
        }
    };

    const alternarTela = () => {
        setTelaAtiva(telaAtiva === "login" ? "cadastro" : "login");
        setErro("");
    };

    return (
        <Dialog open={modalAberto} onOpenChange={setModalAberto}>
            {/* No Base UI, eh atualizada a prop 'render' para passar o componente do gatilho */}
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