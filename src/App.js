import { Avatar, Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import Filme from "./components/Filme";
import ResponsiveMenu from "./components/ResponsiveMenu";
import "./global.css";



function App() {

    const [ filmes, setFilmes ] = useState();
    const [ erro, setErro ] = useState();

    useEffect(() => {
        fetch( process.env.REACT_APP_BACKEND + "filmes", {
            headers: {
                'Content-Type': 'application/json'
            }
        } )
        .then( (resposta) => resposta.json() )
        .then( ( json ) => setFilmes( json ) )
        .catch( ( erro ) => { setErro( true ) } )
    }, [])

    function Excluir( evento, id ) {
        evento.preventDefault();
        fetch( process.env.REACT_APP_BACKEND + "filmes" , {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id
            })
        } )
        .then( ( resposta ) => resposta.json() )
        .then( ( json ) => {
            const novaLista = filmes.filter( (filme ) => filme._id !== id );
            setFilmes( novaLista );
        })
        .catch( ( error ) => setErro( true ) )
    }

    return (
        <>
            <ResponsiveMenu />
            <h1>Livros Adicionados</h1>
            <Container sx={{ 
                display: "flex" ,
                flexFlow: "row",
                flexWrap: "wrap",
                gap: "2rem"
            }}>
            { filmes && (
                filmes.map( (filme, index ) => ( 
                    <Filme
                        imagem={filme.imagem}
                        titulo={filme.titulo}
                        sinopse={filme.sinopse}
                        categoria={filme.categoria}
                        ano={filme.ano}
                        paginas={filme.paginas}
                        excluir={ (e) => Excluir( e, filme._id ) }
                        id={filme._id}
                    />
                ) )
            ) }
            </Container>
        </>
    );
}

export default App;
