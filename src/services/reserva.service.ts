import { ReservaType } from "@/src/components/reserva/reserva-type";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';

export async function getReservasPorUsuario(usuarioId: string): Promise<ReservaType[]> {
    const response = await fetch(
        `${API_URL}/reservas?usuarioId=${usuarioId}`,
        { credentials: "include" }
    );

    if (!response.ok) {
        throw new Error(`Erro ao buscar reservas: ${response.status}`);
    }

    return response.json();
}

export async function getDatasIndisponiveis(imovelId: string): Promise<{ startDate: string, endDate: string }[]> {
    const response = await fetch(
        `${API_URL}/reservas/indisponiveis?imovelId=${imovelId}`
    );

    if (!response.ok) {
        throw new Error(`Erro ao buscar datas indisponíveis: ${response.status}`);
    }

    return response.json();
}

export async function criarReserva(dados: any): Promise<any> {
    const response = await fetch(
        `${API_URL}/reservas`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(dados)
        }
    );

    if (!response.ok) {
        throw new Error(`Erro ao criar reserva: ${response.status}`);
    }

    return response.json();
}

export async function getReservasDoProprietario(): Promise<any[]> {
    const response = await fetch(
        `${API_URL}/reservas/proprietario`,
        { credentials: "include" }
    );

    if (!response.ok) {
        throw new Error(`Erro ao buscar reservas do proprietário: ${response.status}`);
    }

    return response.json();
}

export async function atualizarStatusReserva(reservaId: string, status: "confirmada" | "cancelada"): Promise<ReservaType> {
    const response = await fetch(
        `${API_URL}/reservas/${reservaId}/status`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ status })
        }
    );

    if (!response.ok) {
        throw new Error(`Erro ao atualizar reserva: ${response.status}`);
    }

    return response.json();
}