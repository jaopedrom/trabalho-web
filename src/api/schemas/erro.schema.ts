import { z } from 'zod';

export const ErroSchema = z.object({
    erro: z.string().describe('Mensagem de erro'),
    detalhes: z.string().optional().describe('Detalhes tecnicos opcionais do erro'),
});

export const MensagemErroSchema = z.object({
    message: z.string()
});
