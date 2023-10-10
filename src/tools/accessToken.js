// Se convierte el JSON en un OBJ de JS
export const loginAdmin = JSON.parse(localStorage.getItem("loginAdmin"));
// console.log('loginAdmin:', loginAdmin);

export const tokenAdmin = JSON.parse(localStorage.getItem("tokenAdmin"));

export const headers = {
  Authorization: `Bearer ${loginAdmin?.token}`, // Agrega el token en la cabecera
};