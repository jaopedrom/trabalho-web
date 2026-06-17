import { z } from 'zod/v4';
import { ImovelSchema, ImovelCreateSchema, ImovelUpdateSchema, ImovelBuscaQuerySchema, ImoveisResponseSchema } from './imovel.schema';
import { UsuarioSchema, UsuarioCreateSchema, UsuarioUpdateSchema, LoginSchema as UsuarioLoginSchema } from './usuario.schema';
import { LoginSchema as AutenticacaoLoginSchema } from './autenticacao.schema';
import { ErroSchema } from './erro.schema';

// Registrar schemas de Imóvel
z.globalRegistry.add(ImovelSchema, { id: 'Imovel' });
z.globalRegistry.add(ImovelCreateSchema, { id: 'ImovelCreate' });
z.globalRegistry.add(ImovelUpdateSchema, { id: 'ImovelUpdate' });
z.globalRegistry.add(ImovelBuscaQuerySchema, { id: 'ImovelBuscaQuery' });
z.globalRegistry.add(ImoveisResponseSchema, { id: 'ImoveisResponse' });

// Registrar schemas de Usuário
z.globalRegistry.add(UsuarioSchema, { id: 'Usuario' });
z.globalRegistry.add(UsuarioCreateSchema, { id: 'UsuarioCreate' });
z.globalRegistry.add(UsuarioUpdateSchema, { id: 'UsuarioUpdate' });
z.globalRegistry.add(UsuarioLoginSchema, { id: 'UsuarioLogin' });

// Registrar schema de Autenticação
z.globalRegistry.add(AutenticacaoLoginSchema, { id: 'AutenticacaoLogin' });

// Registrar schema de Erro
z.globalRegistry.add(ErroSchema, { id: 'Erro' });

export {
    ImovelSchema,
    ImovelCreateSchema,
    ImovelUpdateSchema,
    ImovelBuscaQuerySchema,
    ImoveisResponseSchema,
    UsuarioSchema,
    UsuarioCreateSchema,
    UsuarioUpdateSchema,
    UsuarioLoginSchema,
    AutenticacaoLoginSchema,
    ErroSchema
};