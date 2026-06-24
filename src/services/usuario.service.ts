import { ImovelType } from "@/src/components/imoveis/types/imoveisType";
import { UsuarioPublico, UsuarioUpdate, UsuarioCreate } from "@/src/api/schemas/usuario.schema";

export type { UsuarioPublico };

export async function getImoveisDoUsuario(usuarioId: string): Promise<ImovelType[]> {
    const response = await fetch(`http://localhost:3333/imoveis?usuarioId=${usuarioId}`);

    if (!response.ok) {
        throw new Error(`Erro ao buscar imóveis do usuário: ${response.status}`);
    }

    return response.json();
}

export async function getUsuarioPorId(usuarioId: string): Promise<UsuarioPublico> {
    const response = await fetch(`http://localhost:3333/usuarios/${usuarioId}`);

    if (!response.ok) {
        throw new Error(`Usuário não encontrado: ${response.status}`);
    }

    return response.json();
}

export async function atualizarUsuario(
    usuarioId: string,
    dados: UsuarioUpdate
): Promise<UsuarioPublico> {
    const response = await fetch(`http://localhost:3333/usuarios/${usuarioId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
    });

    if (!response.ok) {
        throw new Error(`Erro ao atualizar usuário: ${response.status}`);
    }

    return response.json();
}

export async function criarUsuario(dados: UsuarioCreate): Promise<UsuarioPublico> {
    const response = await fetch(`http://localhost:3333/usuarios`, {
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
    const response = await fetch(`http://localhost:3333/usuarios/${usuarioId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Erro ao deletar usuário: ${response.status}`);
    }
}