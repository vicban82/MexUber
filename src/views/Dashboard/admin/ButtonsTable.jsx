import styled from 'styled-components';
import { useEffect, useState } from "react";
import editIcon from "../../../assets/img/editIcon.png";
import deleteIcon from "../../../assets/img/deleteIcon.png";
import Modal from "react-modal";
import { validateAdmin } from "../../../validations/admins";
import { headers } from "../../../tools/accessToken";
import { axiosPutAdmin } from "../../../hooks/admin/crudAdmin";
import { deleteAlert } from "../../../tools/adminAlerts/delete";
import { errorUpDate, successUpDate } from "../../../tools/adminAlerts/upDate";
import { props } from "./props";


export const ContainerModal = styled(Modal)`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 75%;
    justify-content: center;
    align-content: center;
    margin: 105px 15% 100% 20%;
    background: #c83737;

`;

const Img = styled.img`
  height: 32px;
`;

const FormEdit = styled.form`
  background-color: beige;
  color: #000000;
`;


Modal.setAppElement("#root");

const StyledTd = styled.td`
  display: flex;
`;

export function ButtonsTable({ id, tBody, setTBody, setTError, errorForm, setErrorForm }) {

  const [admin, setAdmin] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    isActive: 0 || 1,
  });

  useEffect(() => {
    // Actualiza el estado del admin cuando se cambia el ID para que coincida con el objeto correspondiente en tBody
    const currentAdmin = tBody.find(item => item._id === id);
    const update = {
      name: currentAdmin.name,
      lastName: currentAdmin.lastName,
      email: currentAdmin.email,
      // password: currentAdmin.password,
      password: "",
      // repeatPassword: currentAdmin.password,
      repeatPassword: "",
      isActive: 0 || 1,
    }
    if (update) {
      setAdmin(update);
    }
  }, [id, tBody]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDelete = async (id) => {
    const deleteAdmin = tBody.find(el => el._id === id)
    deleteAlert(deleteAdmin, id, tBody, setTBody, setTError)
  };

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    // Manejar cambios para checkbox y convertir 1 (true) o 0 (false)
    const newValue = type === "checkbox" ? !admin[name] : value;

    setAdmin({
      ...admin,
      [name]: newValue,
    });
    setErrorForm(
      validateAdmin({
        ...admin,
        [name]: newValue,
      })
    )
  }

  const {
    name,
    lastName,
    email,
    password,
    repeatPassword,
    isActive,
  } = admin;
  
  async function handleSubmit(e) {
    e.preventDefault();
    const {
      nameError,
      lastNameError,
      emailError,
    } = errorForm;
    if (!name || !lastName || !email) {
      errorUpDate(admin, errorForm);
    } else if (nameError || lastNameError || emailError) {
      errorUpDate(admin, errorForm);
    } else {
      try {
        successUpDate(admin);
        // Envia la solicitud de actualización al backend
        const currentAdmin = await axiosPutAdmin(id, admin, headers, setErrorForm);
        
        // Actualiza la lista en el frontend
        setTBody(prev => {
          // Reemplaza el admin editado en la lista por el nuevo admin devuelto por el backend
          const updatedTBody = prev.map(item => (item._id === id ? currentAdmin : item));
          return updatedTBody;
        });
  
        // Cierra el modal después de guardar
        setModalIsOpen(false);
      } catch (error) {
        console.error("Error al guardar el admin:", error);
      }
    }
  }
  
  return (
    <>
      {/* -------------------Boton Editar-------------------------------- */}
      <td>
        {/* The button to open modal */}
        <button onClick={openModal}>
          <Img src={editIcon} alt="Edición" />
        </button>

      {/* Modal */}
      <ContainerModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Editar elemento"
      >
        <form onSubmit={handleSubmit}>
          <br />
          {Object.keys(admin).map((el, idx) => {
            for (const esp in props) {
              if (el === esp) {
                return (
                  <div key={idx}>
                    <label htmlFor={`input-${el}`}>{props[esp]}: </label>
                    {el !== "isActive" ? (
                      el === "password" || el === "repeatPassword" ? (
                        <input
                          id={`input-${el}`}
                          name={el}
                          value={admin[el] || ""}
                          onChange={handleChange}
                          type="password"
                        />
                      ) : (
                        <input
                          id={`input-${el}`}
                          name={el}
                          value={admin[el] || ""}
                          onChange={handleChange}
                          type="text"
                        />
                      )
                    ) : (
                      <input
                        id={`input-${el}`}
                        name={el}
                        checked={admin[el]}
                        onChange={handleChange}
                        type="checkbox"
                        value={admin[el] ? 1 : 0} // 1 como true y 0 como false
                      />
                    )}
                  </div>
                );
              }
            }
          })}
          <div>
            <button onClick={closeModal}>Cancelar</button>
            <button>Guardar</button>
          </div>
        </form>
      </ContainerModal>
  </td>

      {/* -------------------Boton Eliminar----------------------- */}

      <td>
        <button onClick={() => handleDelete(id)}>
          <Img
            src={deleteIcon}
            alt="Delete"
          />
        </button>
      </td>
    </>
  );
}
