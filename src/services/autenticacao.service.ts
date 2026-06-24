import { LoginType } from "@/src/api/schemas/autenticacao.schema";
import { UsuarioPublico } from "@/src/api/schemas/usuario.schema";

const API_URL = "http://localhost:3333/autenticacao";

export async function realizarLogin(dados: LoginType): Promise<UsuarioPublico> {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
        credentials: "include", // recebimento/envio do cookie
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Erro ao realizar login: ${response.status}`);
    }

    return response.json();
}

export async function verificarSessao(): Promise<UsuarioPublico> {
    const response = await fetch(`${API_URL}/me`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // envia o cookie automaticamente
    });

    if (!response.ok) {
        throw new Error("Sessão inválida ou não autorizado");
    }

    return response.json();
}

export async function realizarLogout(): Promise<void> {
    const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // envia o cookie para o backend apagar
    });

    if (!response.ok) {
        console.error("Erro ao tentar fazer logout no servidor.");
    }
}
