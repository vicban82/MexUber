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
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  background-color: #b8860b;
  min-width: 885px;
  
  th { 
    text-decoration: underline; 
    display: flex;
    justify-content: center;
    min-width: 16%;
  }

  th, td {
    text-align: left;
    display: flex;
    justify-content: center;
    min-width: 16%;
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
    }
  }
  tbody {
    display: flex;
    overflow: auto;
    width: 100%;
    max-height: 260px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    tr {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;
    }
    tr:nth-child(even) {
      background-color: #5f5a5a;
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;
    }
  }

`;

const StyledThead = styled.thead`

`;

const StyledTbody = styled.tbody`
  /* Agrega aquí los estilos que desees para el tbody */

`;

const StyledTh = styled.th`
`;

const StyledTd = styled.td`

`;

export const Table = ({ tHeader, tBody, setTBody, error, setTError, errorForm, setErrorForm }) => {
  // console.log("tBody:", tBody)
  return (
    <>
      <ContainerTabla>
        <StyledTable>
          <thead> 
            <tr>
              {tHeader.length >= 1 &&
                tHeader.map((item, i) => {
                  return (
                    <StyledTh  key={i}>
                      {item}
                    </StyledTh>
                  );
                })}
              <th>
                Editar
              </th>
              <th>
                Eliminar
              </th>
            </tr>
          </thead>
          <tbody>
            {tBody.length >= 1 ? (
              tBody.map((data, i) => {
                return (
                  <tr key={i}>
                    {Object.values(data).map((item, subI) => {
                      // console.log("TABLE-ITEMS:", item, "IDX:", subI)
                      // SE IGNORA EL "ID" Y EL "PASSWORD"
                      //! PENDIENTE CAMBIAR EL 5 POR EL 4 
                      if (subI !== 0) {
                        // Agregar un campo de tipo "checkbox"
                        //! PENDIENTE CAMBIAR EL 4 POR EL 5 
                        if (subI === 4) {
                          return (
                            <StyledTd key={subI}>
                              <div>
                                <input
                                  type="checkbox"
                                  checked={item === 1}
                                  onChange={(e) => {
                                    const updatedTBody = [...tBody];
                                    console.log("Estado actual del checkbox:", e.target.checked);
                                    console.log("Valor actual de item:", item);
                                    updatedTBody[i].isActive = e.target.checked ? 1 : 0;
                                    console.log("Nuevo valor de isActive:", updatedTBody[i].isActive);
                                    console.log("OBJETO ACTUALIZADO:", updatedTBody);
                                    setTBody(updatedTBody);
                                  }}
                                />
                              </div>
                            </StyledTd>
                          );
                        } else {
                          return (
                            <StyledTd key={subI}>
                              <div>
                                <p>{item}</p>
                              </div>
                            </StyledTd>
                          );
                        }
                      }
                    })}
                    <ButtonsTable
                      id={data._id}
                      tBody={tBody}
                      setTBody={setTBody}
                      setTError={setTError}
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
                    {error ? error : "No hay más información disponible"}
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
