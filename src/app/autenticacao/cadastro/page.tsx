"use client"

import { CadastroForm, CadastroFormInputs } from "@/src/modules/components/cadastro-form";
import { criarUsuario } from "@/src/services/usuario.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadastroPage() {
    const router = useRouter();
    const [erro, setErro] = useState<string>("");

    const processarCadastro = async (data: CadastroFormInputs) => {
        setErro("");

        try {
            const novoUsuario = await criarUsuario(data);
            console.log("Novo usuário cadastrado:", novoUsuario);

            // redireciona para a página de login
            alert("Cadastro realizado com sucesso! Faça login para continuar.");
            router.push("/autenticacao/login");
        } catch (error: any) {
            setErro(error.message || "Ocorreu um erro ao realizar o cadastro. Tente novamente.");
        }
    };

    return (
        <main className="flex justify-center items-center min-h-screen bg-gray-100 py-10">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Crie sua Conta</h1>

                {/* mensagem de erro */}
                {erro && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {erro}
                    </div>
                )}

                {/* componente de formulário de cadastro */}
                <CadastroForm aoEnviar={processarCadastro} />

                {/* Link para login */}
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Já tem uma conta?{" "}
                        <a
                            href="/autenticacao/login"
                            className="text-blue-600 hover:underline font-medium"
                        >
                            Faça login aqui
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}