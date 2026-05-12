"use client"

import {CardImage} from "../modules/components/card-imoveis";
import {useEffect, useState} from "react";
import {ImovelType} from "@/src/modules/components/imoveis/types/imoveisType";
import {imoveisMock} from "@/src/modules/components/imoveis/mocks/imoveisMock";

export default function Home() {
    const [imoveis, setMoveis] = useState<ImovelType[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMoveis(imoveisMock);
        }, 50);
        return () => clearTimeout(timer);
    }, []);

    return (
        <main style={{ padding: '2rem' }}>
            <h1>Imoveis disponiveis:</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {imoveis.map(imovel => (
                    <CardImage
                        key={imovel.id}
                        data={imovel}
                    />
                ))}
            </div>

        </main>
    );
}