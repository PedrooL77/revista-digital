import { Box, Container, TextField, Button, Alert, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResponsiveMenu from "./components/ResponsiveMenu";

function EditaLivro() {

    const { id } = useParams();
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [ano, setAno] = useState("");
    const [duracao, setDuracao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [imagem, setImagem] = useState("");
    const [editar, setEditar] = useState(false);
    const [erro, setErro] = useState(false);

    useEffect( () => {

        const usuario = localStorage.getItem("usuario")

        fetch( process.env.REACT_APP_BACKEND + "produtos/" + usuario + "/" + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resposta) => resposta.json())
        .then((json) => {
            if( !json.status ) {
                setTitulo( json.titulo );
                setDescricao( json.descricao);
                setAno( json.ano );
                setDuracao( json.duracao);
                setImagem( json.imagem );
                setCategoria( json.categoria );
            } else {
                setErro( "Filme não encontrado" );
            }
        })
        .catch((erro) => { setErro(true) })
    }, [] );

    function Editar( evento ) {
        evento.preventDefault();

        fetch( process.env.REACT_APP_BACKEND + "produtos", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    id: id,
                    titulo: titulo,
                    descricao: descricao,
                    ano: ano,
                    duracao: duracao,
                    imagem: imagem,
                    categoria: categoria,
                    usuario: localStorage.getItem( "usuario" )
                }
            )
        })
        .then((resposta) => resposta.json())
        .then((json) => {

            if (json._id) {
                setEditar(true);
                setErro( false );
            } else {
                setErro(true);
                setEditar( "Não foi possível editar o filme" );
            }
        })
        .catch((erro) => { setErro( "Erro ao processar a requisição") })
    }




    return (
        <>
        <ResponsiveMenu></ResponsiveMenu>
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
                <Typography component="h2" variant='h4'>Editar Filme</Typography>
                { erro && ( <Alert severity="warning">{erro}</Alert>)}
                { editar && ( <Alert severity="success">Filme editado com sucesso</Alert>)}
                <Box component="form" onSubmit={Editar} sx={{ mt: 2}}>
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
                        label="Descrição"
                        variant="filled"
                        margin="normal"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        fullWidth
                     
                    />
                    <TextField
                        type="data"
                        label="data"
                        variant="filled"
                        margin="normal"
                        value={ano}
                        onChange={(e) => setAno(e.target.value)}
                        fullWidth
                     
                    />
                    <TextField
                        type="text"
                        label="Duração"
                        variant="filled"
                        margin="normal"
                        value={duracao}
                        onChange={(e) => setDuracao(e.target.value)}
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
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, mb: 2 }} >Editar</Button>
                </Box>

            </Box>
        </Container>
        </>
    )
}

export default EditaLivro;