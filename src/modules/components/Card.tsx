"use client"
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

export function CardImage({ data }: { data: ImovelType }) {

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
            <CardFooter>
                <Button className="w-full">Ver Imóvel</Button>
            </CardFooter>
        </Card>
    )
}