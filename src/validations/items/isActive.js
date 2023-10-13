export const validationIsActive = (isActive, messageReasonInActive) => {
  let messageReasonInActiveError = '';
  
  if (isActive === 0) {
    messageReasonInActiveError = 'Debes mencionar la razón de la inactividad';
  } else if (messageReasonInActive.length >  100) {
    messageReasonInActiveError = 'Sólo se permiten máximo 100 caracteres'
  }

  return messageReasonInActiveError;
}