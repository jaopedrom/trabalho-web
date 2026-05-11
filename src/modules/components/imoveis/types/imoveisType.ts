export interface ImovelType {
    id: string;
    usuarioId: string; // Atualizado de locadorId para usuarioId
    titulo: string;
    foto: string;
    localizacao: string;
    valorDiaria: number;
    status: 'livre' | 'ocupado' | 'manutencao';
}