// listar reservas de um usuario
import { ReservaType } from "@/src/modules/components/reserva/reserva-type";

export async function getReservasPorUsuario(usuarioId: string): Promise<ReservaType[]> {
    const response = await fetch(
        `http://localhost:3333/reservas?usuarioId=${usuarioId}`
    );

    if (!response.ok) {
        throw new Error(`Erro ao buscar reservas: ${response.status}`);
    }

    return response.json();
}