'use client';
import * as React from 'react';
import { Button } from '@base-ui/react/button';

// 1. Definimos a "planta baixa" das propriedades que o botão aceita
interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode; // O texto ou ícone que vai dentro do botão
    loading?: boolean;         // Estado de carregamento opcional
}

// 2. O Componente Burro (Stateless)
export default function CustomButton({
                                         children,
                                         loading = false,
                                         type = "button",
                                         onClick,
                                         className,
                                         ...props
                                     }: CustomButtonProps) {

    return (
        <Button
            className={`box-border flex items-center justify-center gap-1.5 h-10 px-3.5 m-0 outline-none border-none rounded-md bg-gray-50 text-base font-normal leading-6 text-gray-900 select-none no-underline max-sm:text-[0.925rem] max-sm:px-2 hover:bg-gray-100 data-popup-open:bg-gray-100 focus-visible:relative focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:-outline-offset-1 disabled:opacity-50 disabled:cursor-not-allowed ${className || ''}`}
            disabled={loading || props.disabled}
            focusableWhenDisabled
            type={type}
            onClick={onClick}
            {...props}
        >
            {/* Se estiver carregando, muda o texto, senão mostra o que o Pai mandou */}
            {loading ? 'Aguarde...' : children}
        </Button>
    );
}