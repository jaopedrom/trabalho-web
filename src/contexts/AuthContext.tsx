// src/contexts/AuthContext.tsx
"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UsuarioPublico } from "@/src/schemas/usuario.schema";
import { verificarSessao } from '@/src/services/autenticacao.service';

interface AuthContextType {
    usuarioLogado: UsuarioPublico | null;
    carregando: boolean;
    login: (usuario: UsuarioPublico) => void;
    logout: () => void;
    estaAutenticado: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provider do contexto de autenticação
 * Envolva sua aplicação com este provider no layout.tsx
 */
export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuarioLogado, setUsuarioLogado] = useState<UsuarioPublico | null>(null);
    const [carregando, setCarregando] = useState(true);

    // Efeito para verificar se o usuário já tem uma sessão válida no back-end
    useEffect(() => {
        verificarSessao()
            .then((usuario) => {
                setUsuarioLogado(usuario);
            })
            .catch(() => {
                // Se der erro (ex: 401), significa que não há sessão
                setUsuarioLogado(null);
            })
            .finally(() => {
                setCarregando(false);
            });
    }, []);

    // funcao de login, atualiza o estado local (o cookie já foi salvo pelo navegador via HTTP)
    const login = (usuario: UsuarioPublico) => {
        console.log('Fazendo login no contexto:', usuario.nome);
        setUsuarioLogado(usuario);
    };

    // funcao para fazer logout, atualiza o estado local (o cookie já foi invalidado via HTTP)
    const logout = () => {
        console.log('Fazendo logout no contexto');
        setUsuarioLogado(null);
    };

    const estaAutenticado = usuarioLogado !== null;

    return (
        <AuthContext.Provider value={{ usuarioLogado, carregando, login, logout, estaAutenticado }}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Hook para usar o contexto de autenticação
 */
export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }

    return context;
}