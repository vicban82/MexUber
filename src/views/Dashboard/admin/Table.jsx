import { ButtonsTable } from './ButtonsTable';
import {ContainerTabla, StyledTable} from "../../../components/reusable/TableComponente";


export const Table = ({ tHeader, tBody, setTBody, error, setTError, errorForm, setErrorForm }) => {
  // console.log("tBody:", tBody)
  return (
    <>
      <ContainerTabla>
        <StyledTable maxwidth={"16%"} minwidth={"16%"} width={"16%"}>
          <thead> 
            <tr>
              {tHeader.length >= 1 &&
                tHeader.map((item, i) => {
                  return (
                    <th  key={i}>
                      {item}
                    </th>
                  );
                })}
              <th>
                Editar/Eliminar
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
                      // SE IGNORA EL "ID"
                      if (subI !== 0) {
                        // Agregar un campo de tipo "checkbox"
                        if (subI === 4) {
                          return (
                            <td key={subI}>
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
