import { Alert, Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import ResponsiveMenu from './components/ResponsiveMenu';

function Filmes() {

    const [titulo, setTitulo] = useState("");
    const [sinopse, setSinopse] = useState("");
    const [ano, setAno] = useState("");
    const [paginas, setPaginas] = useState("");
    const [categoria, setCategoria] = useState("");
    const [imagem, setImagem] = useState("");
    const [cadastro, setCadastro] = useState(false);
    const [erro, setErro] = useState(false);


    function Cadastrar(evento) {
        evento.preventDefault();
        fetch( process.env.REACT_APP_BACKEND + "produtos", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    titulo: titulo,
                    sinopse: sinopse,
                    ano: ano,
                    paginas: paginas,
                    imagem: imagem,
                    categoria: categoria
                }
            )
        })
            .then((resposta) => resposta.json())
            .then((json) => {

                if (json._id) {
                    setCadastro(true);
                    setErro( false );
                } else {
                    setErro(true);
                    setCadastro( false );
                }
            })
            .catch((erro) => { setErro(true) })

    }


    return (
        <>
        <ResponsiveMenu/>
        <Container component="section" maxWidth="sm">
            <Box sx={{
                mt: 7,
                backgroundColor: "#EDEDED",
                padding: "30px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <Typography component="h2" variant='h4' sx={{mb: 2}}>Cadastre seu Filme</Typography>
                { erro && (<Alert severity="warning">Livro já cadastrado. Tente novamente por favor!</Alert>) }
                { cadastro && ( <Alert severity="success">Obrigado por cadastrar seu livro!</Alert> )}
                <Box component="form" onSubmit={Cadastrar}>
                    <TextField
                        type="text"
                        label="Título"
                        variant="filled"
                        margin="normal"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        type="text"
                        label="Sinopse"
                        variant="filled"
                        margin="normal"
                        value={sinopse}
                        onChange={(e) => setSinopse(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        type="number"
                        label="Ano"
                        variant="filled"
                        margin="normal"
                        value={ano}
                        onChange={(e) => setAno(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        type="text"
                        label="Páginas"
                        variant="filled"
                        margin="normal"
                        value={paginas}
                        onChange={(e) => setPaginas(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        type="text"
                        label="Categoria"
                        variant="filled"
                        margin="normal"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        type="text"
                        label="Url da Imagem"
                        variant="filled"
                        margin="normal"
                        value={imagem}
                        onChange={(e) => setImagem(e.target.value)}
                        fullWidth
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, mb: 2 }} >Cadastrar</Button>
                </Box>
            </Box>
        </Container>
        </>
    )
}

export default Filmes;