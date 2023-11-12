import { ButtonsTable } from "./ButtonsTable";
import {
  ContainerTabla,
  StyledTable,
} from "../../../components/reusable/TableComponente";

export const Table = ({
  tHeader,
  tCar,
  setTCar,
  car,
  setCar,
  errorForm,
  setErrorForm,
  limit,
  setTotalPages,
  setPage,
}) => {
  // console.log("tCar:", tCar)
  return (
    <>
      <ContainerTabla>
        <StyledTable maxwidth={"16%"} minwidth={"16%"} width={"16%"}>
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
            {(Array.isArray(tCar) && tCar.length >= 1) && (
                tCar.map((data, i) => {
                  return (
                    <tr key={i}>
                      {Object.values(data).map((item, subI) => {
                        // console.log("TABLE-ITEMS:", item, "IDX:", subI)
                        // SE IGNORA EL "ID"
                        if (subI !== 0) {
                          return (
                            <td key={subI}>
                              <div>
                                <p>{item}</p>
                              </div>
                            </td>
                          );
                        }
                      })}
                      <ButtonsTable
                        id={data._id}
                        tCar={tCar}
                        setTCar={setTCar}
                        // ESTADO DEL FORMULARIO
                        car={car}
                        setCar={setCar}
                        // ESTADO DEL FORMULARIO
                        errorForm={errorForm}
                        setErrorForm={setErrorForm}
                        limit={limit}
                        setTotalPages={setTotalPages}
                        setPage={setPage}
                      />
                    </tr>
                  );
                })
              )}
          </tbody>
        </StyledTable>
      </ContainerTabla>
    </>
  );
};
