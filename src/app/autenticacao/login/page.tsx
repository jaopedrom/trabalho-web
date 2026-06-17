// src/app/autenticacao/login/page.tsx
"use client"

import { LoginForm, LoginFormInputs } from "@/src/modules/components/login-form";
import { realizarLogin } from "@/src/services/autenticacao.service";
import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [erro, setErro] = useState<string>("");

    const processarLogin = async (data: LoginFormInputs) => {
        setErro("");
        console.log("Processando login...");

        try {
            // usa a api para buscar e validar o usuario
            const usuarioAutenticado = await realizarLogin(data);

            // usa o contexto para salvar a sessao e estado
            login(usuarioAutenticado);

            console.log("Login realizado com sucesso!");

            // redireciona para a pagina de gerenciamento de usuario
            router.push(`/usuario/${usuarioAutenticado.id}`);
        } catch (error: any) {
            // define mensagem de erro vinda do backend
            setErro(error.message || "CPF ou senha incorretos!");
            console.log("Falha no login: credenciais inválidas");
        }
    };

    return (
        <main className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Acesse sua conta</h1>

                {/* exibe mensagem de erro se houver */}
                {erro && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {erro}
                    </div>
                )}

                {/* componente de formulario de login */}
                <LoginForm aoEnviar={processarLogin} />

                {/* Link para cadastro */}
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Não tem uma conta?{" "}
                        <a
                            href="/autenticacao/cadastro"
                            className="text-blue-600 hover:underline font-medium"
                        >
                            Cadastre-se aqui
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}