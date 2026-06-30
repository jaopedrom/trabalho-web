import { z } from 'zod';
import { ImovelSchema, ImovelCreateSchema, ImovelUpdateSchema, ImovelBuscaQuerySchema, ImoveisResponseSchema } from './imovel.schema';
import { UsuarioSchema, UsuarioCreateSchema, UsuarioUpdateSchema, LoginSchema as UsuarioLoginSchema } from './usuario.schema';
import { LoginSchema as AutenticacaoLoginSchema } from './autenticacao.schema';
import { ErroSchema } from './erro.schema';

// registra schemas de imovel
z.globalRegistry.add(ImovelSchema, { id: 'Imovel' });
z.globalRegistry.add(ImovelCreateSchema, { id: 'ImovelCreate' });
z.globalRegistry.add(ImovelUpdateSchema, { id: 'ImovelUpdate' });
z.globalRegistry.add(ImovelBuscaQuerySchema, { id: 'ImovelBuscaQuery' });
z.globalRegistry.add(ImoveisResponseSchema, { id: 'ImoveisResponse' });

// registra schemas de usuario
z.globalRegistry.add(UsuarioSchema, { id: 'Usuario' });
z.globalRegistry.add(UsuarioCreateSchema, { id: 'UsuarioCreate' });
z.globalRegistry.add(UsuarioUpdateSchema, { id: 'UsuarioUpdate' });
z.globalRegistry.add(UsuarioLoginSchema, { id: 'UsuarioLogin' });

// registra schema de autenticacao
z.globalRegistry.add(AutenticacaoLoginSchema, { id: 'AutenticacaoLogin' });

// registra schema de erro
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