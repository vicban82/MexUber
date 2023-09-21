
 export const Table = ({ tHeader, tBody, setTBody, error, setTError }) => {
  console.log("BODY EMPLOY:", tBody)
  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              {tHeader.length >= 1 &&
                tHeader.map((item, i) => {
                  return (
                    <th key={i}>
                      <p>{item}</p>
                      <p>{item}</p>
                      <p>{item}</p>
                      <p>{item}</p>
                    </th>
                  );
                })}
              <th>
                <p>Acción</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {tBody.length >= 1 ? (
              tBody.map((data, i) => {
                return (
                  <tr key={i}>
                    {Object.values(data).map((item, subI) => {
                      // console.log("TABLE-ITEMS:", item, "INDEX:", subI)
                      if (subI !== 0) {
                        return (
                          <td key={subI}>
                            <div>
                              <p>
                                {item}
                              </p>
                            </div>
                          </td>
                        );
                      }
                    })}
                    {/* <ButtonsTable
                      id={data.id}
                      tBody={tBody}
                      setTBody={setTBody}
                      setTError={setTError}
                    /> */}
                  </tr>
                )
              })
            ) : (
              <tr>
                {/* <td colSpan={tHeader.length + 1} > */}
                <td>
                  <p>
                    {error ? error : "No hay información disponible"}
                  </p>
                </td >
              </tr >

            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
