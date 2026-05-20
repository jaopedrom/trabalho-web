export interface ImovelType {
    id: string;
    usuarioId: string;
    titulo: string;
    foto: string;
    localizacao: string;
    valorDiaria: number;
    status: 'livre' | 'ocupado' | 'manutencao';
}