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
  // console.log("tCar:", tHeader)
  return (
    <>
      <ContainerTabla>
        <StyledTable maxwidth={"19%"} minwidth={"19%"} width={"19%"}>
          <thead>
            <tr>
              {tHeader.map((item, i) => {
                return (
                  <th key={i}>
                    <p>{item}</p>
                  </th>
                );
              })}
              <th>Editar/Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {tCar.length >= 1 &&
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
                    {/* <ButtonsTable
                      id={data._id}
                      tCar={tCar}
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
                    /> */}
                  </tr>
                );
              })}
          </tbody>
        </StyledTable>
      </ContainerTabla>
    </>
  );
};
