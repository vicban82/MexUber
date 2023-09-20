// VERIFICACION DEL GMAIL
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const dominiosPermitidos = ['gmail.com', 'hotmail.com', "yahoo.com", "yahoo.es", "outlook.com", "outlook.es"];
export const dominiosPermitidosRegex = new RegExp(`^[a-zA-Z0-9._%+-]+@(${dominiosPermitidos.join('|')})$`, 'i');

// VERIFICACION DEL PASSWORD
export const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,16}$/;