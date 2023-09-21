export const validationIsActive = (isActive) => {
  let isActiveError = '';
  
  // 1 = true && 0 = false
  const active = [0, 1]
  if (!active.includes(isActive)) {
    isActiveError = 'Debes ingresar: 1 = true o 0 = false, segun el caso';
  }
  
  // if (typeof users.isActive !== "boolean") {
  //   console.log("VAL:", users)
  //   throw new Error("Debes ingresar: 1 = true o 0 = false, segun el caso")
  // }

  return isActiveError;
}