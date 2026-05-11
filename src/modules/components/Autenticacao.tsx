"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { LoginForm } from "./Login";
import { CadastroForm } from "./CadastroForm";

// tipos com o que a estrutura exata que os formulários exigem
type DadosCadastro = {
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    senha: string;
};

type DadosLogin = {
    cpf: string;
    senha: string;
};

export function Autenticacao() {
    const [telaAtiva, setTelaAtiva] = useState<"login" | "cadastro">("login");

    const lidarComLogin = (dados: DadosLogin) => {
        console.log("Tentando fazer login com os dados:", dados);
    };

    const lidarComCadastro = (dados: DadosCadastro) => {
        console.log("Tentando fazer cadastro com os dados:", dados);
    };

    return (
        <Dialog>
            <DialogTrigger render={<Button variant="outline">Acessar Conta</Button>} />

            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>
                        {telaAtiva === "login" ? "Bem-vindo de volta!" : "Crie sua conta"}
                    </DialogTitle>
                    <DialogDescription>
                        {telaAtiva === "login"
                            ? "Faça login para continuar acessando a plataforma."
                            : "Preencha os dados abaixo para realizar o seu credenciamento."}
                    </DialogDescription>
                </DialogHeader>

                <div className="py-2">
                    {telaAtiva === "login"
                        ? <LoginForm aoEnviar={lidarComLogin} />
                        : <CadastroForm aoEnviar={lidarComCadastro} />
                    }
                </div>

                <div className="flex justify-center mt-2">
                    <Button
                        variant="link"
                        className="text-sm text-blue-600"
                        onClick={() => setTelaAtiva(telaAtiva === "login" ? "cadastro" : "login")}
                    >
                        {telaAtiva === "login"
                            ? "Novo usuário? Crie sua conta!"
                            : "Já tem uma conta? Faça login"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}