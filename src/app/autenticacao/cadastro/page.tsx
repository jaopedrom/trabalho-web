"use client"
import { CadastroForm, CadastroFormInputs} from "@/src/modules/components/CadastroForm";
import { hospedesMock } from "@/src/modules/components/hospede/mocks/mockHospede";
import { HospedeType } from "@/src/modules/components/hospede/types/hospedeType";

export default function CadastroPage() {

    const processarCadastro = (data: CadastroFormInputs) => {
        //verifica se cpf existe
        const usuarioJaExiste = hospedesMock.find(h => h.cpf === data.cpf);

        if (usuarioJaExiste) {
            alert("Este CPF já está cadastrado em nosso sistema!");
            return;
        }

        // monta objeto novoHospede no formato HospedeType gerando um ID falso
        const novoHospede: HospedeType = {
            id: `hospede-${Date.now()}`, // id gerado com base na data atual
            ...data // insere os dados do formulário (nome, email, cpf, etc)
        };

        // salva no mock da dados
        hospedesMock.push(novoHospede);

        // exibe no console e mensagem de confirmacao
        console.log("Novo hóspede cadastrado:", novoHospede);
        alert("Cadastro realizado com sucesso!");
    };

    return (
        <main className="flex justify-center items-center min-h-screen bg-gray-100 py-10">
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-6 text-center">Crie sua Conta</h1>

                {/*chamada do componente*/}
                <CadastroForm aoEnviar={processarCadastro} />

            </div>
        </main>
    );
}