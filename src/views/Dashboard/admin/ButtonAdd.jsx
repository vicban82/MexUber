import React, { useState } from "react";
import Modal from "react-modal";
import { validateAdmin } from "../../../validations/admins";
import { switAlertRegister } from "../../../tools/switAlertRegister";
import { axiosPostAdmin } from "../../../hooks/admin/crudAdmin";
Modal.setAppElement("#root"); // Reemplaza '#root' con el ID de tu elemento raíz de la aplicación

export const ButtonAdd = ({ tBody, tHeader }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [admin, setAdmin] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    isActive: false, // Cambié el valor por defecto a false para checkbox
  });

  const [error, setError] = useState({
    nameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
    repeatPasswordError: "",
    isActiveError: false, // Cambié el valor por defecto a false para checkbox
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    // Manejar cambios para checkbox
    const newValue = type === "checkbox" ? checked : value;

    setAdmin({
      ...admin,
      [name]: newValue,
    });
    setError(
      validateAdmin({
        ...admin,
        [name]: newValue,
      })
    )
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aquí puedes realizar las acciones de guardar tus datos, por ejemplo, enviarlos a través de una API
    // console.log("Admin data:", admin);
    const {
      nameError,
      lastNameError,
      emailError,
      passwordError,
      repeatPasswordError,
      isActiveError,
    } = error
    if (nameError || lastNameError || emailError || passwordError || repeatPasswordError || isActiveError) {
      switAlertRegister(admin, error);
    }
    switAlertRegister(admin, error);
    axiosPostAdmin(admin, setError);

    // Cierra el modal después de guardar
    setModalIsOpen(false);
  }

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Agregar</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <form onSubmit={handleSubmit}>
          <br />
          {Object.keys(admin).map((key) => {
            return (
              <div key={key}>
                <label htmlFor={`input-${key}`}>{key}: </label>
                {key !== "isActive" ? (
                  key === "password" || key === "repeatPassword" ? (
                    <input
                      id={`input-${key}`}
                      name={key}
                      value={admin[key] || ""}
                      onChange={handleChange}
                      type="password"
                    />
                  ) : (
                    <input
                      id={`input-${key}`}
                      name={key}
                      value={admin[key] || ""}
                      onChange={handleChange}
                      type="text"
                    />
                  )
                ) : (
                  <input
                    id={`input-${key}`}
                    name={key}
                    checked={admin[key]}
                    onChange={handleChange}
                    type="checkbox"
                  />
                )}
              </div>
            );
          })}
          <div>
            <button onClick={() => setModalIsOpen(false)}>Cancelar</button>
            <button type="submit">Guardar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

// import React, { useState } from "react";

// export const ButtonAdd = ({ tBody, tHeader }) => {
  
//   const [admin, setAdmin] = useState({
//     name: '',
//     lastName: '',
//     email: '',
//     password: '',
//     repeatPassword: '',
//     isActive: '',
//   });
  
//   function handleChange(e) {
//     const { name, value } = e.target.value;
//     setAdmin({
//       ...admin,
//       [name]: value,
//     });
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//   }
//   return (
//     <div>
//       <div>
//         <div>
//           <h3>Agregar</h3>
//           <div>
//             {tBody &&
//               tHeader.map((item, i) => {
//                 if (i !== 2) {
//                   return (
//                     <div key={i}>
//                       <label htmlFor={`input-${i}`}>
//                         {item}
//                       </label>
//                       <input
//                         id={`input-${i}`}
//                         value={admin[i] || ""}
//                         onChange={(e) => handleChange(i, e)}
//                         type="text"
//                       />
//                     </div>
//                   );
//                 } else {
//                   return (
//                     <div key={i}>
//                       <label htmlFor={`input-${i}`}>
//                         {item}
//                       </label>
//                       <input
//                         id={`input-${i}`}
//                         value={admin[i] || ""}
//                         onChange={(e) => handleChange(i, e)}
//                         type="checkbox"
//                       />
//                     </div>
//                   );
//                 }
//               })}
//           </div>
//           <div>
//             <label>
//               Cancelar
//             </label>
//             <label
//               onClick={handleSubmit}
//             >
//               Guardar
//             </label>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
