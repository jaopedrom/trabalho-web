import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { usuariosMock } from '../components/usuario/mock/mockUsuario';
import { imoveisMock } from '../components/imoveis/mocks/imoveisMock';
import { reservasMock } from '../components/reserva/mocks/reserva-mock';

const prisma = new PrismaClient();

async function main() {
    console.log('Iniciando seed do banco de dados...');

    // Limpando banco
    await prisma.reserva.deleteMany({});
    await prisma.imovel.deleteMany({});
    await prisma.usuario.deleteMany({});
    console.log('Banco de dados limpo.');

    // Seed de Usuários
    for (const u of usuariosMock) {
        const hashSenha = await bcrypt.hash(u.senha, 10);
        await prisma.usuario.create({
            data: {
                id: u.id,
                nome: u.nome,
                email: u.email,
                telefone: u.telefone,
                senha: hashSenha,
                cpf: u.cpf,
            },
        });
    }
    console.log(`${usuariosMock.length} usuários inseridos.`);

    // Seed de Imóveis
    for (const i of imoveisMock) {
        await prisma.imovel.create({
            data: {
                id: i.id,
                titulo: i.titulo,
                foto: i.foto,
                localizacao: i.localizacao,
                valorDiaria: i.valorDiaria,
                status: i.status,
                usuarioId: i.usuarioId,
            },
        });
    }
    console.log(`${imoveisMock.length} imóveis inseridos.`);

    // Seed de Reservas
    for (const r of reservasMock) {
        await prisma.reserva.create({
            data: {
                id: r.id,
                dataCheckIn: new Date(r.dataCheckIn),
                dataCheckOut: new Date(r.dataCheckOut),
                valorTotal: r.valorTotal,
                status: r.status,
                usuarioId: r.usuarioId,
                imovelId: r.imovelId,
            },
        });
    }
    console.log(`${reservasMock.length} reservas inseridas.`);

    console.log('Seed concluído com sucesso!');
}

main()
    .catch((e) => {
        console.error('Erro durante o seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
