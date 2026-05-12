"use client"

interface CardResumoReserva {
    title: string;
    count: number;
    type: 'concluida' | 'futura' | 'cancelada';
}

export default function BookingSummaryCard({ title, count, type }: CardResumoReserva) {
    // cores diferentes dependendo do status
    const colorMap = {
        concluida: "text-emerald-600 bg-emerald-50 border-emerald-200",
        futura: "text-blue-600 bg-blue-50 border-blue-200",
        cancelada: "text-red-500 bg-red-50 border-red-200",
    };

    return (
        <div className="bg-white border border-zinc-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2">
            <h3 className="text-sm font-medium text-zinc-500">{title}</h3>
            <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-zinc-800">{count}</span>
                <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${colorMap[type]}`}>
          {type === 'futura' ? 'Em breve' : type === 'concluida' ? 'Histórico' : 'Estornada'}
        </span>
            </div>
        </div>
    );
}