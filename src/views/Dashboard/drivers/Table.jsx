import styled from 'styled-components';
import { ButtonsTable } from './ButtonsTable';

const ContainerTabla = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 5px;
  padding: 15px 65px 15px 65px;
  justify-content: center;
`;

const StyledTable = styled.table`
  width: 95%;
  table-layout: fixed;
  border-collapse: collapse;
  background-color: #b8860b;
  min-width: 885px;
  
  th { 
    text-decoration: underline; 
    display: flex;
    justify-content: center;
    min-width: 12%;
  }

  th, td {
    text-align: left;
    display: flex;
    justify-content: center;
    min-width: 12%;
  }
  
  td:nth-child(1), th:nth-child(1) { min-width: 16%; }
  td:nth-child(2), th:nth-child(2) { min-width: 16%; }
  td:nth-child(3), th:nth-child(3) { width: 16%; }

  thead {
    display: flex;
    width: 100%;
    justify-content: space-around;
    background-color: #333;
    color: #FDFDFD;
    height: 40px;
    tr {
      display: flex;
      width: 100%;
      height: 40px;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      min-width: 12%;
    }
  }
  tbody {
    display: flex;
    overflow: auto;
    width: 100%;
    //height: 300px;
    //max-height: 300px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    tr {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      min-width: 12%;
    }
    tr:nth-child(even) {
      background-color: #5f5a5a;
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      min-width: 12%;
    }
  }

`;

export const Table = ({ tHeader, tDriver, setTDriver, driver, setDriver, errorForm, setErrorForm }) => {
  // console.log("tDriver:", tDriver)
  return (
    <>
      <ContainerTabla>
        <StyledTable>
          <thead>
            <tr>
              {tHeader.length >= 1 &&
                tHeader.map((item, i) => {
                  return (
                    <th  key={i}>
                      <p>{item}</p>
                    </th>
                  );
                })}
              <th>
                <p>Editar / Eliminar</p>
              </th>
              {/* <th>
                <p>Eliminar</p>
              </th> */}
            </tr>
          </thead>
          <tbody>
            {tDriver.length >= 1 ? (
              tDriver.map((data, i) => {
                return (
                  <tr key={i}>
                    {Object.values(data).map((item, subI) => {
                      // console.log("TABLE-ITEMS:", item, "IDX:", subI)
                      // SE IGNORA EL "ID"
                      if (subI !== 0) {
                        // Agregar un campo de tipo "checkbox"
                        if (subI === 5 || subI === 6) {
                          return (
                            <td key={subI}>
                              <div>
                                <input
                                  type="checkbox"
                                  checked={item === 1}
                                  onChange={(e) => {
                                    const updatedTBody = [...tDriver];
                                    console.log("Estado actual del checkbox:", e.target.checked);
                                    console.log("Valor actual de item:", item);
                                    updatedTBody[i].isActive = e.target.checked ? 1 : 0;
                                    console.log("Nuevo valor de isActive:", updatedTBody[i].isActive);
                                    console.log("OBJETO ACTUALIZADO:", updatedTBody);
                                    setTDriver(updatedTBody);
                                  }}
                                />
                              </div>
                            </td>
                          );
                        } else {
                          return (
                            <td key={subI}>
                              <div>
                                <p>{item}</p>
                              </div>
                            </td>
                          );
                        }
                      }
                    })}
                    <ButtonsTable
                      id={data._id}
                      tDriver={tDriver}
                      setTDriver={setTDriver}
                      // ESTADO DEL FORMULARIO
                      driver={driver}
                      setDriver={setDriver}
                      // ESTADO DEL FORMULARIO
                      errorForm={errorForm}
                      setErrorForm={setErrorForm}
                    />
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={tHeader.length + 1} >
                  <p>
                    {/* {error ? error : "No hay información disponible"} */}
                    {"No hay información disponible"}
                  </p>
                </td>
              </tr >
            )}
          </tbody>
        </StyledTable>
      </ContainerTabla>
    </>
  );
}
