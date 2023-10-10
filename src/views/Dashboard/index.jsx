import React from "react";
import { Outlet } from "react-router-dom";
import {
  ContentContainer,
} from "../../components/Dashboard/styles";
import Navbar from "./Navbar-sidebar";
import { Container } from "../../components/reusable/global";
import { tokenAdmin } from "../../tools/accessToken";
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  //const tokenAdmin = localStorage.getItem("tokenAdmin");
  //console.log("tokenAdmin:", tokenAdmin);

  return (
    <>
      {/* {tokenAdmin != null ? (
        <Container>
          <h2>Acceso denegado</h2>
        </Container>
      ) : ( */}
        <div>
          <Navbar />
          <Container>
            {/* Contenedor del contenido */}
            <ContentContainer>
              {/* Outlet para mostrar las rutas anidadas */}
              <Outlet />
            </ContentContainer>
          </Container>
        </div>
      {/* )}
    </>
  );
}; */}
</>
)
}
export default Dashboard;
