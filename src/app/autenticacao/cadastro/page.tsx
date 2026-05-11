"use client"

import { CadastroForm, CadastroFormInputs} from "@/src/modules/components/CadastroForm";
import { usuariosMock } from "@/src/modules/components/usuario/mock/mockUsuario";
import { UsuarioType} from "@/src/modules/components/usuario/type/usuarioType";


export default function CadastroPage() {

    const processarCadastro = (data: CadastroFormInputs) => {
        // verifica se o CPF ja existe na lista de usuários
        const usuarioJaExiste = usuariosMock.find(u => u.cpf === data.cpf);

        if (usuarioJaExiste) {
            alert("Este CPF já está cadastrado em nosso sistema!");
            return;
        }

        // monta o objeto novoUsuario no formato UsuarioType
        const novoUsuario: UsuarioType = {
            id: `user-${Date.now()}`, // ID gerado com base no timestamp
            ...data, // insere nome, email, cpf, senha, telefone
            imoveis: [] // todo novo usuário começa com a lista de imoveis vazia
        };

        // salva no mock
        usuariosMock.push(novoUsuario);

        // exibe no console e mensagem de confirmação
        console.log("Novo usuário cadastrado:", novoUsuario);
        alert("Cadastro realizado com sucesso!");
    };

    return (
        <main className="flex justify-center items-center min-h-screen bg-gray-100 py-10">
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-6 text-center">Crie sua Conta</h1>

                {/* chamada do componente de formulário */}
                <CadastroForm aoEnviar={processarCadastro} />
            </div>
        </main>
    );
}