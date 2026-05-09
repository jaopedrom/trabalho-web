import Cadastro from "../modules/components/Cadastro";

export default function Home() {
    return (
        <main style={{ padding: '2rem' }}>
            <h1>Visualizando o Form:</h1>

            {/* Aqui você renderiza a tag do componente para ele aparecer na tela */}
            <Cadastro />
            {/*<ExampleNavigationMenu />*/}

        </main>
    );
}