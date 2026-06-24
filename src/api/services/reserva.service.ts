import prisma from "@/src/prisma";

export class ReservaService {
    static async listarPorUsuario(usuarioId: string) {
        const reservas = await prisma.reserva.findMany({
            where: { usuarioId }
        });

        return reservas.map(r => ({
            ...r,
            dataCheckIn: r.dataCheckIn.toISOString(),
            dataCheckOut: r.dataCheckOut.toISOString(),
            status: r.status as "pendente" | "confirmada" | "cancelada" | "concluida"
        }));
    }
}
