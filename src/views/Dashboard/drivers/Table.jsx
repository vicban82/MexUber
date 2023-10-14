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

export const Table = ({ tHeader, tDriver, setTDriver, driver, setDriver, errorForm, setErrorForm }) => {
  // console.log("tDriver:", tDriver)
  return (
    <>
      <div>
        <StyledTable>
          <StyledThead>
            <tr>
              {tHeader.map((item, i) => {
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
            {tDriver.length >= 1 && (
              tDriver.map((data, i) => {
                return (
                  <tr key={i}>
                    {Object.values(data).map((item, subI) => {
                      // console.log("TABLE-ITEMS:", item, "IDX:", subI)
                      // SE IGNORA EL "ID"
                      if (subI !== 0) {
                        // Agregar un campo de tipo "checkbox"
                        if (subI === 5) {
                          return (
                            <StyledTd key={subI}>
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
                            </StyledTd>
                          );
                        } else if (subI === 6) {
                          return (
                            <StyledTd key={subI}>
                              <div>
                                <p>{!item ? "SIN ASIGNACIÓN" : item}</p>
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
            )}
          </StyledTbody>
        </StyledTable>
      </div>
    </>
  );
}
