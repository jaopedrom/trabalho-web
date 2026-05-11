import { ImovelType } from "@/src/modules/components/imoveis/types/imoveisType";

export const imoveisMock: ImovelType[] = [
    {
        id: "imovel-001",
        locadorId: "locador-101",
        titulo: "Apartamento Moderno no Centro",
        foto: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
        localizacao: "São Paulo, SP",
        valorDiaria: 350.00,
        status: "livre"
    },
    {
        id: "imovel-002",
        locadorId: "locador-102",
        titulo: "Casa de Praia com Vista para o Mar",
        foto: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800&auto=format&fit=crop",
        localizacao: "Florianópolis, SC",
        valorDiaria: 850.00,
        status: "ocupado"
    },
    {
        id: "imovel-003",
        locadorId: "locador-101", // Este imóvel pertence ao mesmo locador do primeiro
        titulo: "Chalé Aconchegante nas Montanhas",
        foto: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=800&auto=format&fit=crop",
        localizacao: "Campos do Jordão, SP",
        valorDiaria: 420.00,
        status: "manutencao"
    }
];