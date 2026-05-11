import {LocadorType} from "@/src/modules/components/locador/types/locadorType";

export const locadoresMock: LocadorType[] = [
    {
        id: "loc-1",
        nome: "Roberto Santos",
        email: "roberto@imoveis.com",
        telefone: "41977777777",
        senha: "password789",
        imoveis: [
            {
                id: "imovel-101",
                locadorId: "loc-1",
                titulo: "Casa de Praia",
                foto: "url-da-foto-1.jpg",
                localizacao: "Florianópolis, SC",
                valorDiaria: 350.00,
                status: "livre"
            },
            {
                id: "imovel-102",
                locadorId: "loc-1",
                titulo: "Apartamento Centro",
                foto: "url-da-foto-2.jpg",
                localizacao: "Curitiba, PR",
                valorDiaria: 200.00,
                status: "ocupado"
            }
        ]
    },
    {
        id: "loc-2",
        nome: "Fernanda Costa",
        email: "fernanda.host@email.com",
        telefone: "31966666666",
        senha: "password321",
        imoveis: []
    }
];