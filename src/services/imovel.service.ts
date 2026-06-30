import { ImovelType } from "@/src/components/imoveis/types/imoveisType";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';

export async function getImovelPorId(id: string): Promise<ImovelType> {
    const response = await fetch(`${API_URL}/imoveis/${id}`);

    if (!response.ok) {
        throw new Error(`Imóvel não encontrado: ${response.status}`);
    }

    return response.json();
}

// listagem de imoveis da pagina principal
export async function listarImoveisDisponiveis(
    checkIn?: string,
    checkOut?: string
): Promise<ImovelType[]> {
    const params = new URLSearchParams();

    if (checkIn) {
        params.set('checkIn', checkIn);
    }
    if (checkOut) {
        params.set('checkOut', checkOut);
    }

    const backendUrl = typeof window !== 'undefined' && !process.env.NEXT_PUBLIC_API_URL
        ? `http://${window.location.hostname}:3333`
        : API_URL;

    const response = await fetch(`${backendUrl}/imoveis?${params.toString()}`);
    
    if (!response.ok) {
        throw new Error(`Erro ao buscar imóveis: ${response.status}`);
    }

    return response.json();
}

export async function criarImovel(
    dados: Omit<ImovelType, "id">
): Promise<ImovelType> {
    const response = await fetch(`${API_URL}/imoveis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(dados),
    });

    if (!response.ok) {
        throw new Error(`Erro ao criar imóvel: ${response.status}`);
    }

    return response.json();
}

export async function atualizarImovel(
    id: string,
    dados: Omit<ImovelType, "id">
): Promise<ImovelType> {
    const response = await fetch(`${API_URL}/imoveis/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(dados),
    });

    if (!response.ok) {
        throw new Error(`Erro ao atualizar imóvel: ${response.status}`);
    }

    return response.json();
}

export async function deletarImovel(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/imoveis/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error(`Erro ao deletar imóvel: ${response.status}`);
    }
}