import {ImovelType} from "@/src/modules/components/imoveis/types/imoveisType";

export interface UsuarioType {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    senha: string;
    cpf: string;
    imoveis: ImovelType[];
}