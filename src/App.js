import { Avatar, Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import Filme from "./components/Livro";
import ResponsiveMenu from "./components/ResponsiveMenu";
import "./global.css";



function App() {

    const [ filmes, setFilmes ] = useState();
    const [ erro, setErro ] = useState();
    

    useEffect(() => {

        const usuario = localStorage.getItem( "usuario" );

        fetch( process.env.REACT_APP_BACKEND + "produtos/" + usuario, {
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
        fetch( process.env.REACT_APP_BACKEND + "produtos" , {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                usuario: localStorage.getItem( "usuario" )
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
                gap: "2rem",
                mt: "3rem"
            }}>
            { filmes && (
                filmes.map( (filme, index ) => ( 
                    <Filme
                        imagem={filme.imagem}
                        titulo={filme.titulo}
                        descricao={filme.descricao}
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
