import BookingSummaryCard from "@/src/modules/components/card-usuario";

export default function MinhasHospedagens() {
    // Dados fictícios simulando suas reservas
    const reservas = [
        { id: 1, local: "Florianópolis, SC", checkIn: "15/10/2026", checkOut: "20/10/2026", valor: 1500, status: "futura" },
        { id: 2, local: "Gramado, RS", checkIn: "10/05/2026", checkOut: "14/05/2026", valor: 2100, status: "concluida" },
    ];

    return (
        <div className="max-w-5xl mx-auto p-6 flex flex-col gap-8">

            {/* card de resimo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* inserir logica de contagem real baseada no seu array */}
                <BookingSummaryCard title="Viagens Futuras" count={1} type="futura" />
                <BookingSummaryCard title="Viagens Concluídas" count={1} type="concluida" />
                <BookingSummaryCard title="Reservas Canceladas" count={0} type="cancelada" />
            </div>

            {/* tabela de listagem */}
            <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm text-zinc-600">
                    <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-800 font-semibold">
                    <tr>
                        <th className="py-3 px-4">Localização</th>
                        <th className="py-3 px-4">Período (Check-in / Out)</th>
                        <th className="py-3 px-4">Valor Total</th>
                        <th className="py-3 px-4">Status</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                    {reservas.map((reserva) => (
                        <tr key={reserva.id} className="hover:bg-zinc-50 transition-colors">
                            <td className="py-3 px-4 font-medium text-zinc-800">{reserva.local}</td>
                            <td className="py-3 px-4">{reserva.checkIn} até {reserva.checkOut}</td>
                            <td className="py-3 px-4">R$ {reserva.valor.toFixed(2)}</td>
                            <td className="py-3 px-4">
                                {/* Badge simples para o status na tabela */}
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    reserva.status === 'concluida' ? 'bg-emerald-100 text-emerald-700' :
                                        reserva.status === 'futura' ? 'bg-blue-100 text-blue-700' :
                                            'bg-red-100 text-red-700'
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