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
// Adicione um import para o serviço de reservas se existir, por enquanto vamos fazer um alert de sucesso

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
                const [imovelData, usuarioData] = await Promise.all([
                    getImovelPorId(imovelId),
                    getUsuarioPorId(usuarioId)
                ]);

                setImovel(imovelData);
                setUsuario(usuarioData);
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

    const confirmarReserva = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessando(true);
        
        try {
            // Aqui iria a chamada para o backend criar a reserva
            // await criarReserva({ imovelId, usuarioId, ... })
            
            // Simulação de delay de rede
            await new Promise((resolve) => setTimeout(resolve, 1500));
            
            alert("Reserva realizada com sucesso!");
            router.push(`/usuario/${usuarioId}/historico`); // Redireciona para o histórico ou painel
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                                    {/* Aqui você poderia calcular baseado em datas, por enquanto exibimos apenas a diária */}
                                    <span>R$ {imovel.valorDiaria.toFixed(2)} / dia</span>
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
                                {/* Adicione outros campos necessários como CPF, Telefone se tiver no model */}
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
