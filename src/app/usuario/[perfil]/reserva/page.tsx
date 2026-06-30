"use client"
import { use, useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/src/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { getImovelPorId } from "@/src/services/imovel.service";
import { getUsuarioPorId, UsuarioPublico } from "@/src/services/usuario.service";
import { ImovelType } from "@/src/components/imoveis/types/imoveisType";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Datepicker from "react-tailwindcss-datepicker";
import { getDatasIndisponiveis, criarReserva } from "@/src/services/reserva.service";

function ReservaForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { usuarioLogado, estaAutenticado, carregando: carregandoAuth } = useAuth();

    const imovelId = searchParams.get("imovelId");
    const usuarioId = searchParams.get("usuarioId");

    const [imovel, setImovel] = useState<ImovelType | null>(null);
    const [usuario, setUsuario] = useState<UsuarioPublico | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    const [processando, setProcessando] = useState(false);

    const [datasReserva, setDatasReserva] = useState({
        startDate: null,
        endDate: null,
    });
    const [datasOcupadas, setDatasOcupadas] = useState<{ startDate: string, endDate: string }[]>([]);
    const [totalEstimado, setTotalEstimado] = useState(0);

    const mudancaDeData = (newValue: any) => {
        setDatasReserva(newValue);
    };

    useEffect(() => {
        if (!carregandoAuth && !estaAutenticado) {
            router.push("/autenticacao/login");
        }
    }, [estaAutenticado, carregandoAuth, router]);

    useEffect(() => {
        async function buscarDados() {
            if (!imovelId || !usuarioId) {
                setErro("Parâmetros inválidos. O ID do imóvel e do usuário são obrigatórios.");
                setCarregando(false);
                return;
            }

            try {
                const [imovelData, usuarioData, ocupadasData] = await Promise.all([
                    getImovelPorId(imovelId),
                    getUsuarioPorId(usuarioId),
                    getDatasIndisponiveis(imovelId)
                ]);

                setImovel(imovelData);
                setUsuario(usuarioData);
                setDatasOcupadas(ocupadasData);
            } catch (err) {
                console.error("Erro ao buscar dados para reserva:", err);
                setErro("Não foi possível carregar os dados para a reserva.");
            } finally {
                setCarregando(false);
            }
        }

        if (estaAutenticado) {
            buscarDados();
        }
    }, [imovelId, usuarioId, estaAutenticado]);

    useEffect(() => {
        if (datasReserva.startDate && datasReserva.endDate && imovel) {
            const start = new Date(datasReserva.startDate);
            const end = new Date(datasReserva.endDate);
            const dias = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));

            // se for o mesmo dia cobra 1 diaria, caso contrario calcula os dias
            const diasCobrados = dias === 0 ? 1 : dias;

            if (diasCobrados > 0) {
                setTotalEstimado(diasCobrados * imovel.valorDiaria);
            } else {
                setTotalEstimado(0);
            }
        } else {
            setTotalEstimado(0);
        }
    }, [datasReserva, imovel]);

    const confirmarReserva = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!datasReserva.startDate || !datasReserva.endDate) {
            alert("Por favor, selecione as datas de check-in e check-out.");
            return;
        }

        setProcessando(true);

        try {
            await criarReserva({
                imovelId,
                usuarioId,
                dataCheckIn: datasReserva.startDate,
                dataCheckOut: datasReserva.endDate
            });

            alert("Reserva realizada com sucesso!");
            router.push(`/usuario/${usuarioId}/historico`);
        } catch (err) {
            console.error("Erro ao realizar reserva:", err);
            alert("Ocorreu um erro ao processar sua reserva. Tente novamente.");
        } finally {
            setProcessando(false);
        }
    };

    if (carregando || carregandoAuth) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <p className="text-gray-500">Carregando dados da reserva...</p>
            </div>
        );
    }

    if (erro || !imovel || !usuario) {
        return (
            <div className="flex flex-col justify-center items-center h-[50vh] space-y-4">
                <p className="text-red-500 text-lg">{erro || "Dados não encontrados."}</p>
                <Button onClick={() => router.back()} variant="outline">Voltar</Button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Finalizar Reserva</h1>

            {/* Bloco Isolado: Período da Reserva */}
            <div className="mb-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm relative z-50">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Período da Reserva</h2>
                <p className="text-sm text-gray-500 mb-4">Selecione as datas de check-in e check-out</p>

                <div className="w-full md:w-[400px]">
                    <Datepicker
                        primaryColor={"blue"}
                        value={datasReserva}
                        onChange={mudancaDeData}
                        displayFormat={"DD/MM/YYYY"}
                        placeholder={"Selecione Check-in e Check-out"}
                        disabledDates={datasOcupadas.map(d => ({
                            startDate: new Date(d.startDate),
                            endDate: new Date(d.endDate)
                        }))}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {/* Detalhes do Imóvel (Fixo) */}
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Detalhes do Imóvel</CardTitle>
                            <CardDescription>Confirme as informações da sua hospedagem</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="aspect-video rounded-lg overflow-hidden mb-4">
                                <img src={imovel.foto} alt={imovel.titulo} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">{imovel.titulo}</h3>
                                <p className="text-gray-600">{imovel.localizacao}</p>
                            </div>
                            <div className="pt-4 border-t">
                                <div className="flex justify-between items-center font-medium">
                                    <span>Valor da Diária</span>
                                    <span>R$ {imovel.valorDiaria.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center font-bold text-lg mt-2 pt-2 border-t">
                                    <span>Total Estimado</span>
                                    <span>R$ {totalEstimado > 0 ? totalEstimado.toFixed(2) : "0.00"}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Formulário do Usuário */}
                <div>
                    <form onSubmit={confirmarReserva}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Seus Dados</CardTitle>
                                <CardDescription>Os dados abaixo serão utilizados para a reserva</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nome">Nome Completo</Label>
                                    <Input id="nome" value={usuario.nome} readOnly className="bg-gray-50" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">E-mail</Label>
                                    <Input id="email" value={usuario.email} readOnly className="bg-gray-50" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Telefone</Label>
                                    <Input id="telefone" value={usuario.telefone} readOnly className="bg-gray-50" />
                                </div>
                            </CardContent>
                            <CardFooter className="flex-col gap-3">
                                <Button
                                    type="submit"
                                    className="w-full"
                                    size="lg"
                                    disabled={processando}
                                >
                                    {processando ? "Processando..." : "Confirmar Reserva"}
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="w-full"
                                    onClick={() => router.back()}
                                    disabled={processando}
                                >
                                    Cancelar
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function ReservaPage() {
    return (
        <Suspense fallback={<div className="flex justify-center p-12">Carregando formulário...</div>}>
            <ReservaForm />
        </Suspense>
    );
}
