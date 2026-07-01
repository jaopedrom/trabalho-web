import prisma from "@/src/prisma";

export class ReservaService {
    static async listarPorUsuario(usuarioId: string) {
        const reservas = await prisma.reserva.findMany({
            where: { usuarioId },
            include: { imovel: true }
        });

        return reservas.map(r => ({
            ...r,
            dataCheckIn: r.dataCheckIn.toISOString(),
            dataCheckOut: r.dataCheckOut.toISOString(),
            status: r.status as "pendente" | "confirmada" | "cancelada" | "concluida"
        }));
    }
    static async listarPorProprietario(usuarioId: string) {
        const reservas = await prisma.reserva.findMany({
            where: {
                imovel: {
                    usuarioId: usuarioId
                }
            },
            include: {
                imovel: true,
                usuario: true
            }
        });

        return reservas.map(r => ({
            ...r,
            dataCheckIn: r.dataCheckIn.toISOString(),
            dataCheckOut: r.dataCheckOut.toISOString(),
            status: r.status as "pendente" | "confirmada" | "cancelada" | "concluida"
        }));
    }
    static async listarDatasIndisponiveis(imovelId: string) {
        const reservas = await prisma.reserva.findMany({
            where: {
                imovelId,
                status: {
                    not: "cancelada"
                }
            },
            select: {
                dataCheckIn: true,
                dataCheckOut: true
            }
        });

        return reservas.map(r => ({
            startDate: r.dataCheckIn.toISOString().split('T')[0],
            endDate: r.dataCheckOut.toISOString().split('T')[0]
        }));
    }

    static async criarReserva(dados: { usuarioId: string, imovelId: string, dataCheckIn: string, dataCheckOut: string }) {
        const dataInicio = new Date(dados.dataCheckIn);
        const dataFim = new Date(dados.dataCheckOut);

        if (dataInicio > dataFim) {
            throw new Error("A data de check-in não pode ser posterior à data de check-out.");
        }

        // verifica conflitos de datas (overbooking)
        const conflitos = await prisma.reserva.findFirst({
            where: {
                imovelId: dados.imovelId,
                status: {
                    not: "cancelada"
                },
                OR: [
                    {
                        // Check-in ou check-out solicitado intercepta o período existente
                        dataCheckIn: { lte: dataFim },
                        dataCheckOut: { gte: dataInicio }
                    }
                ]
            }
        });

        if (conflitos) {
            throw new Error("As datas selecionadas não estão mais disponíveis.");
        }

        // busca imovel para pegar o valor da diaria
        const imovel = await prisma.imovel.findUnique({
            where: { id: dados.imovelId }
        });

        if (!imovel) {
            throw new Error("Imóvel não encontrado.");
        }

        // calcula os dias
        const dias = Math.ceil((dataFim.getTime() - dataInicio.getTime()) / (1000 * 3600 * 24));
        const diasCobrados = dias === 0 ? 1 : dias;
        const valorTotal = diasCobrados * imovel.valorDiaria;

        // cria a reserva
        const novaReserva = await prisma.reserva.create({
            data: {
                usuarioId: dados.usuarioId,
                imovelId: dados.imovelId,
                dataCheckIn: dataInicio,
                dataCheckOut: dataFim,
                valorTotal: valorTotal,
                status: "pendente"
            }
        });

        return novaReserva;
    }
    static async atualizarStatus(reservaId: string, usuarioLogadoId: string, novoStatus: "confirmada" | "cancelada") {
        // busca a reserva incluindo o imovel para checar o proprietario
        const reserva = await prisma.reserva.findUnique({
            where: { id: reservaId },
            include: { imovel: true }
        });

        if (!reserva) {
            throw new Error("Reserva não encontrada");
        }

        // verifica se o usuario logado é o proprietario do imovel da reserva
        if (reserva.imovel.usuarioId !== usuarioLogadoId) {
            throw new Error("Não autorizado");
        }

        // atualiza a reserva
        const reservaAtualizada = await prisma.reserva.update({
            where: { id: reservaId },
            data: { status: novoStatus }
        });

        return {
            ...reservaAtualizada,
            dataCheckIn: reservaAtualizada.dataCheckIn.toISOString(),
            dataCheckOut: reservaAtualizada.dataCheckOut.toISOString(),
            status: reservaAtualizada.status as "pendente" | "confirmada" | "cancelada" | "concluida"
        };
    }
}
