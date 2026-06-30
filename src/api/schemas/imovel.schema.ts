import { z } from 'zod';

// schema base para representar um imovel
export const ImovelSchema = z.object({
    id: z.string().describe('ID único do imóvel'),
    usuarioId: z.string().describe('ID do usuário dono do imóvel'),
    titulo: z.string().min(3, "O título precisa ter pelo menos 3 caracteres").describe('Título ou nome do imóvel'),
    foto: z.string().url("Insira uma URL de imagem válida").describe('URL da foto principal do imóvel'),
    localizacao: z.string().min(5, "A localização é obrigatória").describe('Localização do imóvel (ex: cidade, estado)'),
    valorDiaria: z.number({
        message: "O valor da diária é obrigatório e deve ser numérico",
    }).min(1, "O valor deve ser maior que zero").describe('Valor cobrado por diária no imóvel'),
    status: z.enum(['livre', 'ocupado', 'manutencao'], {
        message: "O status é obrigatório e deve ser válido",
    }).describe('Status atual do imóvel'),
});

// schema para o formulario de imovel
export const ImovelFormSchema = ImovelSchema.omit({
    id: true,
    usuarioId: true,
});

// schema para criacao de um novo imovel
export const ImovelCreateSchema = ImovelSchema.omit({
    id: true,
});

// schema para atualizacao de um imovel (todos os campos opcionais)
export const ImovelUpdateSchema = ImovelSchema.omit({
    id: true,
    usuarioId: true,
}).partial();

// schema para parametros de rota que buscam por um imovel especifico
export const ImovelParamsSchema = z.object({
    id: z.string().describe('ID único do imóvel na base de dados')
});

// schema para query params filtros de busca
export const ImovelBuscaQuerySchema = z.object({
    status: z.enum(['livre', 'ocupado', 'manutencao']).optional().describe('Filtrar imóveis por status'),
    localizacao: z.string().optional().describe('Filtrar imóveis por localização'),
    pagina: z.string().optional().describe('Página dos resultados'),
    limite: z.string().optional().describe('Limite de itens (opcional)'),
    usuarioId: z.string().optional().describe('Filtrar imóveis por dono')
});

// schema para lista de imoveis na resposta
export const ImoveisResponseSchema = z.array(ImovelSchema).describe('Lista de imóveis retornados');
