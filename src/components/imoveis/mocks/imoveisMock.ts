import {ImovelType} from "@/src/components/imoveis/types/imoveisType";

export const imoveisMock: ImovelType[] = [
    // imoveis de Ana user-1
    {
        id: "imovel-001",
        usuarioId: "user-1",
        titulo: "Apartamento Moderno no Centro",
        foto: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
        localizacao: "São Paulo, SP",
        valorDiaria: 350.00,
        status: "livre"
    },

    // imoveis de Pedro user-6
    {
        id: "imovel-002",
        usuarioId: "user-6",
        titulo: "Casa de Praia com Vista para o Mar",
        foto: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800&auto=format&fit=crop",
        localizacao: "Florianópolis, SC",
        valorDiaria: 850.00,
        status: "ocupado"
    },

    // imoveis de Mariana user-5
    {
        id: "imovel-003",
        usuarioId: "user-5",
        titulo: "Chalé Aconchegante nas Montanhas",
        foto: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=800&auto=format&fit=crop",
        localizacao: "Campos do Jordão, SP",
        valorDiaria: 420.00,
        status: "manutencao"
    },

    // imoveis de Roberto user-3
    {
        id: "imovel-101",
        usuarioId: "user-3",
        titulo: "Casa de Praia em Jurerê",
        foto: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=800&auto=format&fit=crop",
        localizacao: "Florianópolis, SC",
        valorDiaria: 650.00,
        status: "livre"
    },
    {
        id: "imovel-102",
        usuarioId: "user-3",
        titulo: "Apartamento Centro Histórico",
        foto: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop",
        localizacao: "Curitiba, PR",
        valorDiaria: 280.00,
        status: "livre"
    },

    // imoveis adicionais de Mariana user-5
    {
        id: "imovel-004",
        usuarioId: "user-5",
        titulo: "Loft Industrial no Bixiga",
        foto: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
        localizacao: "São Paulo, SP",
        valorDiaria: 480.00,
        status: "livre"
    },

    // imoveis adicionais de Pedro user-6
    {
        id: "imovel-005",
        usuarioId: "user-6",
        titulo: "Cobertura com Piscina Privativa",
        foto: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
        localizacao: "Rio de Janeiro, RJ",
        valorDiaria: 1200.00,
        status: "livre"
    },
    {
        id: "imovel-006",
        usuarioId: "user-6",
        titulo: "Studio Compacto na Barra",
        foto: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800&auto=format&fit=crop",
        localizacao: "Salvador, BA",
        valorDiaria: 180.00,
        status: "livre"
    },

    // imoveis de Fernanda user-4
    {
        id: "imovel-007",
        usuarioId: "user-4",
        titulo: "Fazenda Histórica com Café Colonial",
        foto: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop",
        localizacao: "Minas Gerais, MG",
        valorDiaria: 550.00,
        status: "livre"
    }
];