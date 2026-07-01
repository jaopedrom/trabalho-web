import BookingSummaryCard from "@/src/components/card-usuario";
import { ReservaType } from "@/src/components/reserva/reserva-type";
import { ImovelType } from "@/src/components/imoveis/types/imoveisType";

// type para guardar as reservas do usuario junto com os imoveis
export type ImoveisHospedagem = ReservaType & { imovel?: ImovelType };

// interface que define as props da tabela
interface HospedagensUsuarioProps {
    reservas: ImoveisHospedagem[];
}

export default function HospedagensUsuario({ reservas }: HospedagensUsuarioProps) {
    // formatacao de datas
    const formatarData = (dataStr: string) => {
        const apenasData = dataStr.split("T")[0];
        const [ano, mes, dia] = apenasData.split("-");
        return `${dia}/${mes}/${ano}`;
    };

    // contagem das reservas por status para exibir nos cards
    const viagensFuturas = reservas.filter(r => r.status === 'confirmada' || r.status === 'pendente').length;
    const viagensConcluidas = reservas.filter(r => r.status === 'concluida').length;
    const reservasCanceladas = reservas.filter(r => r.status === 'cancelada').length;

    return (
        <div className="flex flex-col gap-8 mt-6">

            {/* card de resumo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <BookingSummaryCard title="Viagens Futuras" count={viagensFuturas} type="futura" />
                <BookingSummaryCard title="Viagens Concluídas" count={viagensConcluidas} type="concluida" />
                <BookingSummaryCard title="Reservas Canceladas" count={reservasCanceladas} type="cancelada" />
            </div>

            {/* tabela de listagem */}
            <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm text-zinc-600">
                    <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-800 font-semibold">
                        <tr>
                            <th className="py-3 px-4">Imóvel e Localização</th>
                            <th className="py-3 px-4">Período (Check-in / Out)</th>
                            <th className="py-3 px-4">Valor Total</th>
                            <th className="py-3 px-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                        {reservas.map((reserva) => (
                            <tr key={reserva.id} className="hover:bg-zinc-50 transition-colors">
                                <td className="py-3 px-4">
                                    <p className="font-medium text-zinc-800">{reserva.imovel ? reserva.imovel.titulo : "Imóvel Indisponível"}</p>
                                    <p className="text-xs text-zinc-500">{reserva.imovel ? reserva.imovel.localizacao : "Local desconhecido"}</p>
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap">{formatarData(reserva.dataCheckIn)} até {formatarData(reserva.dataCheckOut)}</td>
                                <td className="py-3 px-4 whitespace-nowrap">R$ {reserva.valorTotal.toFixed(2)}</td>
                                <td className="py-3 px-4">
                                    {/* Badge simples para o status na tabela */}
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${reserva.status === 'concluida' ? 'bg-emerald-100 text-emerald-700' :
                                        reserva.status === 'cancelada' ? 'bg-red-100 text-red-700' :
                                            'bg-blue-100 text-blue-700'
                                        }`}>
                                        {reserva.status.charAt(0).toUpperCase() + reserva.status.slice(1)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}