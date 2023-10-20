// VERIFICACION DEL GMAIL
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const dominiosPermitidos = ['gmail.com', 'hotmail.com', "yahoo.com", "yahoo.es", "outlook.com", "outlook.es"];
export const dominiosPermitidosRegex = new RegExp(`^[a-zA-Z0-9._%+-]+@(${dominiosPermitidos.join('|')})$`, 'i');

// VERIFICACION DEL PASSWORD
export const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,16}$/;

// VERIFICACION DEL NOMBRE
// export const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚüÜ]{3,}(?:\s|-)[a-zA-ZáéíóúÁÉÍÓÚüÜ]{3,}$/;
export const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚüÜ]{3,}(?:[\s-][a-zA-ZáéíóúÁÉÍÓÚüÜ]{3,})?$/;

// VERIFICACION DEL APELLIDO
export const regexLastName = /^[a-zA-ZáéíóúÁÉÍÓÚüÜ]{3,}(?:\s|-)[a-zA-ZáéíóúÁÉÍÓÚüÜ]{3,}$/;

// VERIFICACION DE LA FECHA
export const data = /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-\d{4}$/;

// VERIFICACION NUMERO DE CONTACTO
export const regexPhone = /^\d{10}$/;

// VERIFICACION CODIGO POSTAL MANUALMENTE
export const regexZipCode = /^\d{5}$/;

// VERIFICACION NUMERO DE LICENCIA
export const regexLicenceNumber = /^[a-zA-Z0-9]{5,10}$/;

// VERIFICACION VIGENCIA DE LICENCIA
export const regexDate = /^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[0-2])-\d{4}$/;

// VERIFICACION FORMATO DE IMAGENES
export const regexImages = /image\/(jpeg|jpg|png)$/;

// VERIFICACION TAMAÑO DE IMAGENES
export const maxSize = 5 * 1024 * 1024; // 5MB en bytes