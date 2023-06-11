import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Footer from "../../components/Footer/Footer";
import assets from "../../assets";

const cards = [
  {
    id: 1,
    title: "Opina",
    media: {
      type: "video",
      source: assets.videos.card1,
    },
    description:
      "No olvides darnos una opinion sobre la aplicacion y el funcionamiento.",
  },
  {
    id: 2,
    title: "Utiliza",
    media: {
      type: "image",
      source: assets.images.card,
    },
    description: "Utiliza las ventajas de nuestra aplicación",
  },
  {
    id: 3,
    title: "Explora",
    media: {
      type: "video",
      source: assets.videos.card2,
    },
    description: "Explora todas la herramientas que te ofrecemos",
  },
];

export default function Menuhome() {
  return (
    <Container sx={{ flexGrow: 1, overflow: "hidden", paddingTop: "25px" }}>
      <CssBaseline />
      <AppBar position="relative">
        {/* <Toolbar>
        </Toolbar> */}
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${require("../../assets/images/bgcontainer.jpg")})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                filter: "blur(3px)", // Efecto de desenfoque
                zIndex: -2,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.6)", // Color negro semi transparente
                zIndex: -1,
              }}
            />
            <Typography
              component="h1"
              variant="h2"
              align="center"
              gutterBottom
              sx={{
                color: "#fff",
                textShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)",
                fontWeight: "bold",
              }}
            >
              Bienvenida/o a ABOUT MOVING
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Gracias por utilizar About Moving para simplificar la gestión de
              tus mudanzas. Desde aquí podrás acceder a todas las
              funcionalidades y mantener un mayor control y organización en tus
              operaciones.
            </Typography>
            
          </Container>
        </Box>
        <Container sx={{ py: 0 , pb:5}} maxWidth="md">
        <div
              style={{
                position: "absolute",
                left: 16,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${require("../../assets/images/bgcontainer1.jpg")})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                filter: "blur(3px)", // Efecto de desenfoque
                zIndex: -2,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 16,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.6)", // Color negro semi transparente
                zIndex: -1,
              }}
            />
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    background:
                      "linear-gradient(45deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.2) 100%)",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Sombra
                    borderRadius: "8px", // // Bordes redondeados
                  }}
                >
                  {card.media.type === "video" ? (
                    <CardMedia
                      component="video"
                      src={card.media.source}
                      controls
                      autoPlay
                      loop
                    />
                  ) : (
                    <CardMedia
                      component="img"
                      sx={{
                        height: "45%",
                      }}
                      image={card.media.source}
                      alt="Image"
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography>{card.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </Container>
  );
}
