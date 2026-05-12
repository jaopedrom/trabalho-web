// src/contexts/AuthContext.tsx
"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UsuarioType } from "@/src/modules/components/usuario/type/usuarioType";

// chave para armazenar no localStorage
const STORAGE_KEY = '@ProjetoWeb:usuario';

interface AuthContextType {
    usuarioLogado: UsuarioType | null;
    login: (usuario: UsuarioType) => void;
    logout: () => void;
    estaAutenticado: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Função auxiliar para buscar o usuário do LocalStorage de forma segura
 * Previne erros de hidratação no Next.js ao verificar se está no browser
 */
const obterUsuarioInicial = (): UsuarioType | null => {
    // Next.js roda no servidor primeiro (onde não tem window/localStorage)
    // typeof window !== 'undefined' garante que só executa no browser
    if (typeof window !== 'undefined') {
        try {
            const usuarioSalvo = localStorage.getItem(STORAGE_KEY);
            if (usuarioSalvo) {
                return JSON.parse(usuarioSalvo);
            }
        } catch (error) {
            console.error('Erro ao recuperar usuário do localStorage:', error);
            // Se houver erro ao parsear, limpa o localStorage
            localStorage.removeItem(STORAGE_KEY);
        }
    }
    return null;
};

/**
 * Provider do contexto de autenticação
 * Envolva sua aplicação com este provider no layout.tsx
 */
export function AuthProvider({ children }: { children: ReactNode }) {
    // inicializa o estado com o usuário salvo no localStorage, caso ele exista
    const [usuarioLogado, setUsuarioLogado] = useState<UsuarioType | null>(obterUsuarioInicial);

    // funcao de login, salva usuario encontrado no localStorage
    const login = (usuario: UsuarioType) => {
        console.log('Fazendo login:', usuario.nome);
        setUsuarioLogado(usuario);

        // salva no localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(usuario));
        }
    };

    // funcao para fazer logout, rmove o usuario do estado e do localstorage
    const logout = () => {
        console.log('Fazendo logout');
        setUsuarioLogado(null);

        // Remove do localStorage
        if (typeof window !== 'undefined') {
            localStorage.removeItem(STORAGE_KEY);
        }
    };

    // verifica se ha um usuário logado
    const estaAutenticado = usuarioLogado !== null;

    return (
        <AuthContext.Provider value={{ usuarioLogado, login, logout, estaAutenticado }}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Hook para usar o contexto de autenticação
 * Exemplo de uso:
 *
 * const { usuarioLogado, login, logout, estaAutenticado } = useAuth();
 *
 * if (estaAutenticado) {
 *   console.log('Usuário logado:', usuarioLogado.nome);
 * }
 */
export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }

    return context;
}