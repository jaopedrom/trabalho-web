import { MenubarDemo } from "@/src/components/navbar-usuario";

export default function UsuarioLayout({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    return (
        // define a barra lateral
        <div className="flex h-[calc(100vh-64px)] bg-zinc-50">

            {/* barra lateral */}
            <aside className="w-72 border-r border-zinc-200 bg-white p-4">
                {/* componente de menu lateral com os links */}
                <MenubarDemo />
            </aside>

            {/* area de conteudo dinamico (A tela principal) */}
            <main className="flex-1 overflow-y-auto p-8">
                {/* Next.js injeta a página que o usuario escolheu */}
                {children}
            </main>

        </div>
    );
}