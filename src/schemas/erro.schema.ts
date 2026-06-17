import { z } from 'zod/v4';

export const ErroSchema = z.object({
    erro: z.string().describe('Mensagem de erro'),
    detalhes: z.string().optional().describe('Detalhes tecnicos opcionais do erro'),
});
