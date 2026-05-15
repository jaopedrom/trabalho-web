"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { ImovelType } from "@/src/modules/components/imoveis/types/imoveisType";

// interface para receber os dados do imovel eo ID do dono, caso teha
interface CardImageProps {
    data: ImovelType;
    perfilId?: string; // '?' torna opcional
}

export function CardImage({ data, perfilId }: CardImageProps) {

    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0">
            <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
            <img
                src={data.foto}
                alt={`Foto de ${data.titulo}`}
                className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
            />
            <CardHeader>
                <CardAction>
                    <Badge variant={data.status === 'livre' ? 'default' : 'secondary'}>
                        {data.status.toUpperCase()}
                    </Badge>
                </CardAction>
                <CardTitle>{data.titulo}</CardTitle>
                <CardDescription>
                    <span className="block mb-1"> {data.localizacao}</span>
                    <span className="font-semibold text-gray-900">
                        R$ {data.valorDiaria.toFixed(2)} / noite
                    </span>
                </CardDescription>
            </CardHeader>

            <CardFooter className="flex gap-2">

                {/* botao Ver imovel Sempre visivel */}
                {/* Se o botão de editar existir eh colocado "outline" para destaque */}
                <Link href={`/imovel/${data.id}`} className="flex-1">
                    <Button variant={perfilId ? "outline" : "default"} className="w-full text-xs">
                        Ver Imóvel
                    </Button>
                </Link>

                {/* botao de editar imovel renderizacao condicional, aparece apenas se o perfilId for passado) */}
                {perfilId && (
                    <Link href={`/usuario/${perfilId}/imovel-usuario/${data.id}/editor`} className="flex-1">
                        <Button className="w-full text-xs bg-blue-600 hover:bg-blue-700 text-white">
                            Editar Imóvel
                        </Button>
                    </Link>
                )}

            </CardFooter>
        </Card>
    )
}