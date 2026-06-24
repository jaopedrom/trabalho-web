export interface ReservaType {
    id: string;
    usuarioId: string;   // vincula com usuario
    imovelId: string;    // vincula com o imovel
    dataCheckIn: string; // "2026-05-15"
    dataCheckOut: string;
    valorTotal: number;
    status: 'pendente' | 'confirmada' | 'cancelada' | 'concluida';
}