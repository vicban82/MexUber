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
  ContainerLogin,
} from "../../components/reusable/global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/img/moveItLogo3.png";
import {
  RememberUserCheckbox,
  RememberUserContainer,
  RememberUserLabel,
} from "../../components/Login/styles";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { validateLogin } from "../../validations/logins";
import { axiosLogins } from "../../hooks/logins";
import { demoSwitAlertLogin, errorLogins, successLogins } from "../../tools/switAlertLogins";
const Login = () => {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  // console.log("LOGIN:", login);
  const [error, setError] = useState({
    emailError: '',
    passwordError: '',
  });
  const [rememberUser, setRememberUser] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleChanges(e) {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
    setError(
      validateLogin({
        ...login,
        [name]: value,
      })
    );
  }

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
  const {
    email,
    password,
  } = login;
  const handleSubmit = (e) => {
    e.preventDefault();
    //* Conexion con el Back-End
    const {
      emailError,
      passwordError,
    } = error;
    if (!email || !password) {
      errorLogins(login, error)
    } else if (emailError || passwordError) {
      errorLogins(login, error)
    } else {
      axiosLogins(login, setError)
      successLogins(login)
      setLogin(login)
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      navigate('/dashboard/home')
    }
    //* Conexion con el Back-End

    //! DATOS RANDOM
    //  if (email && password) {
    //    demoSwitAlertLogin(email, password);
    //    navigate("/dashboard/home");
    //   }
    //  demoSwitAlertLogin(email, password);
    //! DATOS RANDOM
  };

  // Función para mostrar cambiar de type='password' a type='text'
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <Container>
      <ContainerLogin>
      <Checkbox type="checkbox" id="check" />
      <ImageContainer>
        <Image src={logo} alt="Logo" />
      </ImageContainer>
      <Line />
      <ContainerForm>
        <Form onSubmit={(e) => handleSubmit(e)} >
          <InputContainer>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => handleChanges(e)}
              placeholder="Ingresa tu correo"
            />
            <ShowIcon>
              <FontAwesomeIcon icon={faEnvelope} />
            </ShowIcon>
          </InputContainer>
          <InputContainer>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => handleChanges(e)}
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
      </ContainerLogin>
    </Container>
  );
};

export default Login;
