import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, Link } from "@mui/material";



function Livro(props) {

    return (
        <Card sx={{ maxWidth: 345, border: "3px solid" }}>
            <CardActionArea sx={{ textAlign: "center"}}>
                <CardMedia
                    component="img"
                    height="100%"
                    image={props.imagem}
                    alt={props.titulo}
                    
                />
                <CardContent>
                    <Typography variant="h5" component="div">
                        {props.titulo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary"  sx={{mt:"15px"}}>
                        {props.descricao}
                    </Typography>
                    <Grid container>
                        <Grid item xs={6} sx={{mt: "4%"}} component="h4" variant='h4'>
                            <span>{props.categoria}</span>
                        </Grid>
                        <Grid item xs={6} sx={{mt: "4%"}}  component="h4" variant='h4'>
                            <span>{props.ano}</span>
                        </Grid>
                        <Grid item xs>
                            <span>{props.duracao}</span>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
            <Grid container sx={{ textAlign: "center", alignItems: "center"}}>
                <Grid item xs={6}  sx={{fontFamily: "sans-serif"}} >
                    <button onClick={props.excluir}>x</button>
                </Grid>
                <Grid item xs={6}>
                    <Link href={ "edicao/" + props.id} sx={{fontFamily:"sans-serif" , textDecoration: "none" }}>Editar</Link>
                </Grid>
            </Grid>
        </Card>
    )
}
export default Livro;