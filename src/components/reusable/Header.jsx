// Header.js

import React from "react";
import { useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async"; // Importa Helmet desde react-helmet-async
import { routeToTitle } from "../../data/routeTitles";
// Ajusta la ruta de importación según tu estructura de carpetas

function Header() {
  const location = useLocation();

  // Función para obtener el título de la página actual
  const getPageTitle = () => {
    const title = routeToTitle[location.pathname];
    return title ? title : "Move it drive"; // Usar el título correspondiente o el predeterminado
  };

  return (
    <header>
      {/* Utiliza HelmetProvider para proporcionar el contexto de React Helmet */}
      <HelmetProvider>
        {/* Utiliza Helmet para cambiar el título de la pestaña del navegador */}
        <Helmet>
          <title>{getPageTitle()}</title>
        </Helmet>
      </HelmetProvider>
    </header>
  );
}

export default Header;
