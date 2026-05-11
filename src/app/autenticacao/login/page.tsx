"use client"

import { LoginForm, LoginFormInputs} from "@/src/modules/components/Login";
import { usuariosMock } from "@/src/modules/components/usuario/mock/mockUsuario";

export default function LoginPage() {

    // validar dados de login
    const processarLogin = (data: LoginFormInputs) => {
        console.log("Dados capturados na Página:", data);

        // salva dados do usuario encontrado no localstorage
        const usuarioEncontrado = usuariosMock.find((usuario) =>
            usuario.cpf === data.cpf && usuario.senha === data.senha
        );

        if (usuarioEncontrado) {
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
            alert("Login realizado com sucesso! (Aqui você redirecionaria o usuário)");
        } else {
            alert("Usuário ou senha não encontrados!");
        }
    };

    return (
        <main className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Acesse sua conta</h1>

                {/*chamada do componente*/}
                <LoginForm aoEnviar={processarLogin} />

            </div>
        </main>
    );
}