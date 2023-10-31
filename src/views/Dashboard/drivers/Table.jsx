import { ButtonsTable } from "./ButtonsTable";
import {
  ContainerTabla,
  StyledTable,
} from "../../../components/reusable/TableComponente";

export const Table = ({
  tHeader,
  tDriver,
  setTDriver,
  driver,
  setDriver,
  errorForm,
  setErrorForm,
  limit,
  setTotalPages,
  setPage,
}) => {
  // console.log("tDriver:", tDriver)
  return (
    <>
      <ContainerTabla>
        <StyledTable maxwidth={"12.5%"} minwidth={"12.5%"} width={"12.5%"}>
          <thead>
            <tr>
              {tHeader.map((item, i) => {
                return (
                  <th key={i}>
                    <p>{item}</p>
                  </th>
                );
              })}
              <th>Ver</th>
              <th>Editar/Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {tDriver.length >= 1 &&
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
                        } else if (subI === 6) {
                          return (
                            <td key={subI}>
                              <div>
                                <p>{!item ? "SIN ASIGNACIÓN" : item}</p>
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
                      limit={limit}
                      setTotalPages={setTotalPages}
                      setPage={setPage}
                    />
                  </tr>
                );
              })}
          </tbody>
        </StyledTable>
      </ContainerTabla>
    </>
  );
};
