import {ImovelType} from "@/src/modules/components/imoveis/types/imoveisType";

export const imoveisMock: ImovelType[] = [
    {
        id: "imovel-001",
        usuarioId: "user-5", // Pertenceria a um outro usuário fictício
        titulo: "Apartamento Moderno no Centro",
        foto: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
        localizacao: "São Paulo, SP",
        valorDiaria: 350.00,
        status: "livre"
    },
    {
        id: "imovel-002",
        usuarioId: "user-6",
        titulo: "Casa de Praia com Vista para o Mar",
        foto: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800&auto=format&fit=crop",
        localizacao: "Florianópolis, SC",
        valorDiaria: 850.00,
        status: "ocupado"
    },
    {
        id: "imovel-003",
        usuarioId: "user-5", // Este imóvel pertence ao mesmo usuário do imovel-001
        titulo: "Chalé Aconchegante nas Montanhas",
        foto: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=800&auto=format&fit=crop",
        localizacao: "Campos do Jordão, SP",
        valorDiaria: 420.00,
        status: "manutencao"
    }
];