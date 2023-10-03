export const props = {
  name: "Nombre(s)",
  lastName: "Apellidos",
  zipCode: "Código Postal", // CODIGO POSTAL
  state: "Estado", // ESTADO DE MEXICO
  city: "Ciudad",
  colonia: "Colonia - Barrio",
  address: "Dirección / Domicilio",
  contact: "Teléfono (Móvil)", // NUMERO DE CONTACTO DEL CONDUCTOR
  email: "Correo electrónico",
  driverPicture: "Foto del conductor", //* FOTO DEL CONDUCTOR
  //! DATOS DE LA LICENCIA DE CONDUCCION
  driverLicenseNumber: "Número de licencia", //* NUMERO LICENCIA DEL CONDUCTOR
  stateLicense: "Estado licencia", // ESTADO DE LA LICENCIA
  typeLicense: "Tipo licencia", // TIPO LICENCIA
  dateLicense: "Vigencia de licencia", // FECHA - VIGENCIA DE LA LICENCIA
  frontLicensePicture: "Foto frontal de la licencia", //* FOTO FRONTAL DE LA LICENCIA
  backLicensePicture: "Foto reverso de la licencia", //* FOTO REVERSO DE LA LICENCIA
  //! DATOS DE LA LICENCIA DE CONDUCCION
  //! AJUSTES DE LA APLICACION
  services: "Servicio para", // TODOS - LGBQT+ - MUJERES
  //! AJUSTES DE LA APLICACION
  //! ACCESO A LA APLICACION
  password: "Contraseña",
  repeatPassword: "Repetir contraseña",
  isActive: "Activo",
  messageReasonInActive: "Motivo de bloqueo", // MENSAJE RASON INACTIVO
  //! ACCESO A LA APLICACION
  // car: "" || null,
}

// {Object.keys(driver).map((el, idx) => {
//   // console.log("EL:", el, ",IDX:", idx)
//   for (const esp in props) {
//     if (el === esp) {
//       if (idx === 3 || idx === 4 || idx === 5 || idx === 11 || idx === 12 || idx === 20) {
//         // SELECT = ESTADO 3, CIUDAD 4, COLONIA 5, ESTADO LICENCIA 11, TIPO LICENCIA 12
//         // MOTIVO DE BLOQUEO = 20
//         if (idx === 20) {
//           return (
//             <div key={idx}>
//               <label>{props[esp]}: </label>
//               <input type="text" />
//             </div>
//           );
//         }
//         return (
//           <div key={idx}>
//             <label htmlFor={`input-${el}`}>{props[esp]}: </label>
//             {/* <select disabled={true} > */}
//             <select >
//               <option>
//                 Selecciona
//               </option>
//               {listState}
//             </select>
//           </div>
//         );
//       } else if (idx === 9 || idx === 14 || idx === 15) {
//         // DROP = FOTO CONDUCTOR 9, FOTO LICENCIA 14 - 15
//         if (idx === 9) {
//           return (
//             <div key={idx}>
//               <label>{props[esp]}: </label>
//               <div {...getRootProps()} style={dropzoneContainerStyles}>
//                 <input {...getInputProps()} />
//               </div>
//               <p>Frente</p>
//             </div>
//           );
//         }
//         return (
//           <div key={idx} >
//             <label>{props[esp]}: </label>
//             <div {...getRootProps()} style={dropzoneContainerStyles}>
//               <input {...getInputProps()} />
//             </div>
//             <p>Licencia</p>
//           </div>
//         );
//       } else if (idx === 13) {
//         // DATE-FECHA = VIGENCIA DE LA LICENCIA 13
//         return (
//           <div key={idx}>
//             <label htmlFor={`input-${el}`}>{props[esp]}: </label>
//             <input type="date" />
//           </div>
//         );
//       } else if (idx === 16 || idx === 19) {
//         // CHECKBOX = SERVICIOS(TODOS - MUJERES - LGBT) 16, ACTIVO 19
//         if (idx === 19) {
//           return (
//             <div key={idx}>
//               <label htmlFor={`input-${el}`}>{props[esp]}: </label>
//               <input
//                 id={`input-${el}`}
//                 name={el}
//                 checked={driver[el]}
//                 onChange={handleChange}
//                 type="checkbox"
//                 value={driver[el] ? 1 : 0}
//               />
//             </div>
//           );
//         }
//         return (
//           <div key={idx}>
//             <label>{props[esp]}: </label>
//             <input 
//               name={el}
//               type="checkbox"
//               checked={driver[el]} 
//               onChange={handleChange}
//               value={driver[el] ? 1 : 0} 
//             />TODOS
//             <input type="checkbox" />LGBTQ+
//             <input type="checkbox" />MUJERES
//           </div>
//         );
//       } else if (idx === 17 || idx === 18) {
//         // PASSWORD = 17 - 18
//         return (
//           <div key={idx}>
//             <label htmlFor={`input-${el}`}>{props[esp]}: </label>
//             <input type="password" />
//           </div>
//         );
//       } else {
//         return (
//           <div key={idx}>
//             <label htmlFor={`input-${el}`}>{props[esp]}: </label>
//             <input type="text" />
//           </div>
//         );
//       }

//     }
//   }
// })}