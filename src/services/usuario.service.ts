import { ImovelType } from "@/src/components/imoveis/types/imoveisType";
import { UsuarioPublico, UsuarioUpdate, UsuarioCreate } from "@/src/api/schemas/usuario.schema";

export type { UsuarioPublico };

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';

export async function getImoveisDoUsuario(usuarioId: string): Promise<ImovelType[]> {
    const response = await fetch(`${API_URL}/imoveis?usuarioId=${usuarioId}`);

    if (!response.ok) {
        throw new Error(`Erro ao buscar imóveis do usuário: ${response.status}`);
    }

    return response.json();
}

export async function getUsuarioPorId(usuarioId: string): Promise<UsuarioPublico> {
    const response = await fetch(`${API_URL}/usuarios/${usuarioId}`);

    if (!response.ok) {
        throw new Error(`Usuário não encontrado: ${response.status}`);
    }

    return response.json();
}

export async function atualizarUsuario(
    usuarioId: string,
    dados: UsuarioUpdate
): Promise<UsuarioPublico> {
    const response = await fetch(`${API_URL}/usuarios/${usuarioId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(dados),
    });

    if (!response.ok) {
        throw new Error(`Erro ao atualizar usuário: ${response.status}`);
    }

    return response.json();
}

export async function criarUsuario(dados: UsuarioCreate): Promise<UsuarioPublico> {
    const response = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Erro ao criar usuário: ${response.status}`);
    }

    return response.json();
}

export async function deletarUsuario(usuarioId: string): Promise<void> {
    const response = await fetch(`${API_URL}/usuarios/${usuarioId}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error(`Erro ao deletar usuário: ${response.status}`);
    }
}