import React, { useState } from "react";
import {
  CenteredContainer,
  Checkbox,
  Container,
  ContainerForm,
  Form,
  Header,
  Image,
  ImageContainer,
  Input,
  InputButton,
  InputContainer,
  Line,
  ShowIcon,
} from "../../components/reusable/global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/img/moveItLogo2.png";
import {
  RememberUserCheckbox,
  RememberUserContainer,
  RememberUserLabel,
} from "../../components/Login/styles";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberUser, setRememberUser] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Datos de usuario registrados (simulación con localStorage)
  const emailRegisterDataDrive = JSON.parse(
    localStorage.getItem("emailRegisterDataDrive")
  );
  // Función para recordar el usuario y la contraseña
  const rememberUserAndPassword = (email, password, remember) => {
    if (remember) {
      localStorage.setItem("rememberedEmail", email);
      localStorage.setItem("rememberedPassword", password);
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }
  };
  const handleSubmit = () => {
    // Comprobar si el correo y la contraseña son correctos
    if (
      emailRegisterDataDrive &&
      email === emailRegisterDataDrive.correo &&
      password === emailRegisterDataDrive.contrasena
    ) {
      // Si son correctos, generar un token aleatorio
      const token = uuidv4();

      // Crear el objeto emailLoginDrive con el token generado y otros datos
      const emailLoginDrive = {
        correo: email,
        contrasena: password,
        token: token, // Agregar el token al objeto
      };

      // Guardar el objeto emailLoginDrive en localStorage u otra lógica de autenticación necesaria
      Swal.fire({
        icon: "success",
        title: "Inicio de sesión exitoso",
        showConfirmButton: false, // Ocultar botón de confirmación
        timer: 2000, // Duración en milisegundos (en este caso, 2 segundos)
      });
      navigate("/dashboard");
    } else {
      // Si son incorrectos, mostrar un mensaje de error o realizar alguna otra acción
      Swal.fire({
        icon: "error",
        title: "Error en el inicio de sesión",
        text: "Credenciales incorrectas.",
      });
    }
  };

  // Función para mostrar cambiar de type='password' a type='text'
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <Container>
      <Checkbox type="checkbox" id="check" />
      <ImageContainer>
        <Image src={logo} alt="Logo" />
      </ImageContainer>
      <Line />
      <ContainerForm>
        <Form>
          <InputContainer>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo"
            />
            <ShowIcon>
              <FontAwesomeIcon icon={faEnvelope} />
            </ShowIcon>
          </InputContainer>
          <InputContainer>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ShowIcon onClick={toggleShowPassword}>
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </ShowIcon>
          </InputContainer>
          <RememberUserContainer>
            <RememberUserCheckbox
              type="checkbox"
              id="rememberUser"
              checked={rememberUser}
              onChange={(e) => {
                setRememberUser(e.target.checked);
                rememberUserAndPassword(email, password, e.target.checked); // Llama a la función aquí
              }}
            />
            <RememberUserLabel htmlFor="rememberUser">
              Recordar
            </RememberUserLabel>
          </RememberUserContainer>
          <InputButton type="submit" value="Iniciar sesión" />
        </Form>
      </ContainerForm>
    </Container>
  );
};

export default Login;
