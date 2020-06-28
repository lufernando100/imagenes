import React, { useEffect, useState } from "react";
import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";

function App() {
  const [busqueda, guardarBusqueda] = useState("");
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {
    const consultarAPI = async () => {
      if (busqueda === "") return;

      const imagenesPorPagina = 30;
      const key = "17238637-b93cf1d7eec1e90511954f048";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;
      const respuesta = await fetch(url);
      const json = await respuesta.json();
      guardarImagenes(json.hits);
      // guardar total de paginas
      const totalpaginas = Math.ceil(json.totalHits / imagenesPorPagina);
      guardarTotalPaginas(totalpaginas);
    };
    consultarAPI();
  }, [busqueda, paginaactual]);

  // apagina anterior

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;
    if (nuevaPaginaActual === 0) return;
    guardarPaginaActual(nuevaPaginaActual);
  };

  const paginaSiguiente = () =>{
    const nuevaPaginaActual = paginaactual + 1;
    if (nuevaPaginaActual > totalpaginas) return;
    guardarPaginaActual(nuevaPaginaActual);

  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center text-uppercase"><strong>Buscador de Imágenes de Jacky</strong></p>
        <Formulario guardarBusqueda={guardarBusqueda} />
      </div>
      <div>
        <ListadoImagenes imagenes={imagenes} />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes} />
        { (paginaactual === 1) ? null :
        <button
        type="button"
        className="bbtn btn-info mr-1"
        onClick={paginaAnterior}
      >
        Anterior &raquo;
      </button>
        }
   {(paginaactual === totalpaginas) ? null :
        <button
        type="button"
        className="bbtn btn-info"
        onClick={paginaSiguiente}
      >
        siguiente &raquo;
      </button>
   }
      </div>
    </div>
  );
}

export default App;
