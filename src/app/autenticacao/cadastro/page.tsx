"use client"

import { CadastroForm, CadastroFormInputs } from "@/src/modules/components/cadastro-form";
import { usuariosMock } from "@/src/modules/components/usuario/mock/mockUsuario";
import { UsuarioType } from "@/src/modules/components/usuario/type/usuarioType";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadastroPage() {
    const router = useRouter();
    const [erro, setErro] = useState<string>("");

    const processarCadastro = (data: CadastroFormInputs) => {
        // verifica se o CPF já existe na lista de usuários
        const usuarioJaExiste = usuariosMock.find(u => u.cpf === data.cpf);

        if (usuarioJaExiste) {
            setErro("Este CPF já está cadastrado em nosso sistema!");
            return;
        }

        // monta o objeto novoUsuario no formato UsuarioType
        const novoUsuario: UsuarioType = {
            id: `user-${Date.now()}`, // ID gerado com base no timestamp
            ...data, // insere nome, email, cpf, senha, telefone
            imoveis: [] // Todo novo usuário começa com a lista de imóveis vazia
        };

        // salva no mock
        usuariosMock.push(novoUsuario);

        console.log("Novo usuário cadastrado:", novoUsuario);

        // redireciona para a página de login
        alert("Cadastro realizado com sucesso! Faça login para continuar.");
        router.push("/autenticacao/login");
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