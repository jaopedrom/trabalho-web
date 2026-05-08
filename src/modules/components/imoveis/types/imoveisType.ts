export interface Imovel {
    id: string;
    locadorId: string; // Para vincular o imóvel ao dono (Locador)
    titulo: string;
    foto: string;
    localizacao: string;
    valorDiaria: number;
    status: 'livre' | 'ocupado' | 'manutencao';
}