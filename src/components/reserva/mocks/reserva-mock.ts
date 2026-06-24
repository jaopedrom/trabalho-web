import { ReservaType } from "@/src/components/reserva/reserva-type";


export const reservasMock: ReservaType[] = [
    // Ana (user-1) reservando imóveis de outros
    {
        id: "reserva-001",
        usuarioId: "user-1",
        imovelId: "imovel-002", // Casa de Praia de Pedro
        dataCheckIn: "2026-05-10",
        dataCheckOut: "2026-05-17",
        valorTotal: 5950.00, // 7 dias × 850
        status: "confirmada"
    },
    {
        id: "reserva-002",
        usuarioId: "user-1",
        imovelId: "imovel-007", // Fazenda de Fernanda
        dataCheckIn: "2026-07-01",
        dataCheckOut: "2026-07-05",
        valorTotal: 2200.00, // 4 dias × 550
        status: "pendente"
    },

    // Carlos (user-2) reservando imóveis
    {
        id: "reserva-003",
        usuarioId: "user-2",
        imovelId: "imovel-001", // Apartamento de Ana
        dataCheckIn: "2026-06-01",
        dataCheckOut: "2026-06-04",
        valorTotal: 1050.00, // 3 dias × 350
        status: "confirmada"
    },
    {
        id: "reserva-004",
        usuarioId: "user-2",
        imovelId: "imovel-005", // Cobertura de Pedro
        dataCheckIn: "2026-08-10",
        dataCheckOut: "2026-08-15",
        valorTotal: 6000.00, // 5 dias × 1200
        status: "cancelada"
    },

    // Roberto (user-3) reservando imóveis de outros
    {
        id: "reserva-005",
        usuarioId: "user-3",
        imovelId: "imovel-003", // Chalé de Mariana
        dataCheckIn: "2026-04-18",
        dataCheckOut: "2026-04-21",
        valorTotal: 1260.00, // 3 dias × 420
        status: "concluida"
    },
    {
        id: "reserva-006",
        usuarioId: "user-3",
        imovelId: "imovel-004", // Loft de Mariana
        dataCheckIn: "2026-09-05",
        dataCheckOut: "2026-09-08",
        valorTotal: 1440.00, // 3 dias × 480
        status: "pendente"
    },

    // Fernanda (user-4) reservando imóveis
    {
        id: "reserva-007",
        usuarioId: "user-4",
        imovelId: "imovel-101", // Casa de Praia de Roberto
        dataCheckIn: "2026-05-20",
        dataCheckOut: "2026-05-27",
        valorTotal: 4550.00, // 7 dias × 650
        status: "confirmada"
    },
    {
        id: "reserva-008",
        usuarioId: "user-4",
        imovelId: "imovel-006", // Studio de Pedro
        dataCheckIn: "2026-03-10",
        dataCheckOut: "2026-03-12",
        valorTotal: 360.00, // 2 dias × 180
        status: "concluida"
    },

    // Mariana (user-5) reservando imóveis de outros
    {
        id: "reserva-009",
        usuarioId: "user-5",
        imovelId: "imovel-102", // Apartamento de Roberto
        dataCheckIn: "2026-06-15",
        dataCheckOut: "2026-06-18",
        valorTotal: 840.00, // 3 dias × 280
        status: "confirmada"
    },
    {
        id: "reserva-010",
        usuarioId: "user-5",
        imovelId: "imovel-005", // Cobertura de Pedro
        dataCheckIn: "2026-12-20",
        dataCheckOut: "2026-12-27",
        valorTotal: 8400.00, // 7 dias × 1200
        status: "pendente"
    },

    // Pedro (user-6) reservando imóveis de outros
    {
        id: "reserva-011",
        usuarioId: "user-6",
        imovelId: "imovel-001", // Apartamento de Ana
        dataCheckIn: "2026-04-01",
        dataCheckOut: "2026-04-03",
        valorTotal: 700.00, // 2 dias × 350
        status: "concluida"
    },
    {
        id: "reserva-012",
        usuarioId: "user-6",
        imovelId: "imovel-007", // Fazenda de Fernanda
        dataCheckIn: "2026-10-10",
        dataCheckOut: "2026-10-14",
        valorTotal: 2200.00, // 4 dias × 550
        status: "cancelada"
    }
];