export const loadImage = async (detailDriver, setFotoConductor, setFotoFront, setFotoBack) => {
  const { driverPicture, frontLicensePicture, backLicensePicture } = detailDriver;
  try {
    if (driverPicture) {
      const imagePath = `../../../assets/img/drivers/${driverPicture}`;
      //const { default: img } = await import(imagePath);
      setFotoConductor(img);
    }
    if (frontLicensePicture) {
      const imagePath = `../../../assets/img/drivers/${frontLicensePicture}`;
      //const { default: img } = await import(imagePath);
      setFotoFront(img);
    }
    if (backLicensePicture) {
      const imagePath = `../../../assets/img/drivers/${backLicensePicture}`;
     // const { default: img } = await import(imagePath);
      setFotoBack(img);
    }
  } catch (error) {
    console.error("Error al cargar la imagen:", error);
  }
};