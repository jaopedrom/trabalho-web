// interface base de imoveis

export interface ImovelType {
    id: string;
    locadorId: string;
    titulo: string;
    foto: string;
    localizacao: string;
    valorDiaria: number;
    status: 'livre' | 'ocupado' | 'manutencao';
}