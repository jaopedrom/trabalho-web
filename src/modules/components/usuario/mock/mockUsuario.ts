import {UsuarioType} from "@/src/modules/components/usuario/type/usuarioType";

export const usuariosMock: UsuarioType[] = [
    {
        id: "user-1",
        nome: "Ana Silva",
        email: "ana@email.com",
        telefone: "11999999999",
        senha: "password123",
        cpf: "11111111111",
        imoveis: [] // Ana no momento age apenas como hóspede
    },
    {
        id: "user-2",
        nome: "Carlos Eduardo",
        email: "carlos@email.com",
        telefone: "21988888888",
        senha: "password456",
        cpf: "22222222222",
        imoveis: [] // Carlos também age apenas como hóspede
    },
    {
        id: "user-3",
        nome: "Roberto Santos",
        email: "roberto@imoveis.com",
        telefone: "41977777777",
        senha: "password789",
        cpf: "33333333333", // Adicionado um CPF fictício, pois agora é obrigatório
        imoveis: [
            {
                id: "imovel-101",
                usuarioId: "user-3", // Conectado ao id do Roberto
                titulo: "Casa de Praia",
                foto: "url-da-foto-1.jpg",
                localizacao: "Florianópolis, SC",
                valorDiaria: 350.00,
                status: "livre"
            },
            {
                id: "imovel-102",
                usuarioId: "user-3",
                titulo: "Apartamento Centro",
                foto: "url-da-foto-2.jpg",
                localizacao: "Curitiba, PR",
                valorDiaria: 200.00,
                status: "ocupado"
            }
        ]
    },
    {
        id: "user-4",
        nome: "Fernanda Costa",
        email: "fernanda.host@email.com",
        telefone: "31966666666",
        senha: "password321",
        cpf: "44444444444",
        imoveis: []
    }
];