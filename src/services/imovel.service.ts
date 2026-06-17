import { ImovelType } from "@/src/modules/components/imoveis/types/imoveisType";

export async function getImovelPorId(id: string): Promise<ImovelType> {
    const response = await fetch(`http://localhost:3333/imoveis/${id}`);

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

    const backendUrl = typeof window !== 'undefined'
        ? `http://${window.location.hostname}:3333`
        : 'http://localhost:3333';

    const response = await fetch(`${backendUrl}/imoveis?${params.toString()}`);
    
    if (!response.ok) {
        throw new Error(`Erro ao buscar imóveis: ${response.status}`);
    }

    return response.json();
}

export async function criarImovel(
    dados: Omit<ImovelType, "id">
): Promise<ImovelType> {
    const response = await fetch(`http://localhost:3333/imoveis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    const response = await fetch(`http://localhost:3333/imoveis/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
    });

    if (!response.ok) {
        throw new Error(`Erro ao atualizar imóvel: ${response.status}`);
    }

    return response.json();
}

export async function deletarImovel(id: string): Promise<void> {
    const response = await fetch(`http://localhost:3333/imoveis/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Erro ao deletar imóvel: ${response.status}`);
    }
}