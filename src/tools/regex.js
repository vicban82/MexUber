// VERIFICACION DEL GMAIL
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const dominiosPermitidos = ['gmail.com', 'hotmail.com', "yahoo.com", "yahoo.es", "outlook.com", "outlook.es"];
export const dominiosPermitidosRegex = new RegExp(`^[a-zA-Z0-9._%+-]+@(${dominiosPermitidos.join('|')})$`, 'i');

// VERIFICACION DEL PASSWORD
export const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,16}$/;

// VERIFICACION DEL NAME || LASTNAME
export const fullName = /^[a-zA-ZáéíóúÁÉÍÓÚüÜ]{3,}(?:\s|-)[a-zA-ZáéíóúÁÉÍÓÚüÜ]{3,}$/;

// VERIFICACION DE LA FECHA
export const data = /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-\d{4}$/;

// VERIFICACION NUMERO DE CONTACTO
export const regexPhone = /^\d{10}$/;

// VERIFICACION CODIGO POSTAL MANUALMENTE
export const regexZipCode = /^\d{5}$/;