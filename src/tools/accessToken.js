// Se convierte el JSON en un OBJ de JS
export const loginAdmin = JSON.parse(localStorage.getItem("loginAdmin"));
console.log('loginAdmin:', loginAdmin);
 export const headers = {
  Authorization: `Bearer ${loginAdmin.token}`, // Agrega el token en la cabecera
};