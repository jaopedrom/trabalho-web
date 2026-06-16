"use client"
import { use, useEffect, useState } from "react";
import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { EdicaoUsuarioForm, EdicaoUsuarioFormInputs } from "@/src/modules/components/edicao-usuario-form";
import { getUsuarioPorId, atualizarUsuario, UsuarioPublico } from "@/src/services/usuario.service";

export default function PerfilUsuarioPage({ params }: { params: Promise<{ perfil: string }> }) {
    const { usuarioLogado, logout, estaAutenticado } = useAuth();
    const router = useRouter();
    const { perfil } = use(params);

    // hooks antes de return condicional
    const [usuario, setUsuario] = useState<UsuarioPublico | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [naoEncontrado, setNaoEncontrado] = useState(false);
    const [estaEditando, setEstaEditando] = useState(false);
    const [montado, setMontado] = useState(false);

    useEffect(() => {
        if (!estaAutenticado) {
            router.push("/");
        }
    }, [estaAutenticado, router]);

    useEffect(() => {
        setMontado(true);
    }, []);

    useEffect(() => {
        async function buscarUsuario() {
            try {
                const dados = await getUsuarioPorId(perfil);
                setUsuario(dados);
            } catch (erro) {
                console.error("Erro ao buscar usuário:", erro);
                setNaoEncontrado(true);
            } finally {
                setCarregando(false);
            }
        }

        buscarUsuario();
    }, [perfil]);

    if (carregando) {
        return (
            <div className="flex justify-center items-center h-full w-full mt-20">
                <p className="text-gray-500">Carregando...</p>
            </div>
        );
    }

    if (naoEncontrado || !usuario) {
        return (
            <div className="flex justify-center items-center h-full w-full mt-20">
                <p className="text-gray-500">Usuário não encontrado.</p>
            </div>
        );
    }

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    const processarAtualizacao = async (data: EdicaoUsuarioFormInputs) => {
        try {
            const atualizado = await atualizarUsuario(perfil, data);
            setUsuario(atualizado);
            setEstaEditando(false);
        } catch (erro) {
            console.error("Erro ao atualizar usuário:", erro);
            alert("Erro ao salvar as alterações.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 p-6 mt-8">
            <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Bem-vindo, {usuario.nome}!
                    </h1>
                    <p className="text-gray-600 mt-1">Gerencie suas informações pessoais</p>
                </div>
                {montado && usuarioLogado?.id === usuario.id && (
                    <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                    >
                        Sair da Conta
                    </Button>
                )}
            </div>

            <div className="space-y-4 flex justify-center">
                <EdicaoUsuarioForm
                    aoEnviar={processarAtualizacao}
                    estaEditando={estaEditando}
                    usuario={usuario}
                    aoEditar={() => setEstaEditando(true)}
                    aoCancelar={() => setEstaEditando(false)}
                />
            </div>
        </div>
    );
}