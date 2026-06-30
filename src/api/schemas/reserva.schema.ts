import { z } from "zod";

export const ReservaSchema = z.object({
    id: z.string(),
    usuarioId: z.string(),
    imovelId: z.string(),
    dataCheckIn: z.string(),
    dataCheckOut: z.string(),
    valorTotal: z.number(),
    status: z.enum(["pendente", "confirmada", "cancelada", "concluida"]),
});

export const ReservaQuerySchema = z.object({
    usuarioId: z.string(),
});

export const DatasIndisponiveisQuerySchema = z.object({
    imovelId: z.string(),
});

export const CriarReservaSchema = z.object({
    usuarioId: z.string(),
    imovelId: z.string(),
    dataCheckIn: z.string(),
    dataCheckOut: z.string(),
});

export const AtualizarStatusReservaBodySchema = z.object({
    status: z.enum(["confirmada", "cancelada"]),
});

export const AtualizarStatusReservaParamsSchema = z.object({
    id: z.string(),
});
