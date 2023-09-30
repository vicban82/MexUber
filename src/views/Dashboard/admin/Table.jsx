import styled from 'styled-components';
import { ButtonsTable } from './ButtonsTable';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledThead = styled.thead`
  background-color: #f0f0f0; /* Cambia esto al color que desees */
  border: solid red 3px;
`;

const StyledTbody = styled.tbody`
  /* Agrega aquí los estilos que desees para el tbody */
  border: solid green 3px;
`;

const StyledTh = styled.th`
  padding: 10px;
  border: solid red 3px;
`;

const StyledTd = styled.td`
  padding: 10px;
  border: solid green 3px;
  min-width: 150px; /* Ajusta el valor según tus necesidades */
  text-align: center; /* Centra el contenido de los td */
`;

export const Table = ({ tHeader, tBody, setTBody, error, setTError, errorForm, setErrorForm }) => {
  // console.log("tBODY:", tBody)
  return (
    <>
      <div>
        <StyledTable>
          <StyledThead>
            <tr>
              {tHeader.length >= 1 &&
                tHeader.map((item, i) => {
                  return (
                    <StyledTh  key={i}>
                      <p>{item}</p>
                    </StyledTh>
                  );
                })}
              <StyledTh>
                <p>Editar</p>
              </StyledTh>
              <StyledTh>
                <p>Eliminar</p>
              </StyledTh>
            </tr>
          </StyledThead>
          <StyledTbody>
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
                <StyledTd colSpan={tHeader.length + 1} >
                  <p>
                    {error ? error : "No hay información disponible"}
                  </p>
                </StyledTd>
              </tr >
            )}
          </StyledTbody>
        </StyledTable>
      </div>
    </>
  );
}
