import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import http from "../../../services/httpService";
import { showSuccessToast, showErrorToast } from "../../Toast";

const LoginForm = (props) => {
  const uri = process.env.REACT_APP_API_ENDPOINT + "/auth";
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: async ({ email, password }) => {
      await http
        .post(
          // "http://localhost:4000/auth"
          uri,
          { email, password }
        )
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("id", res.data.id);
          showSuccessToast("Login realizado com sucesso! Bem-vindo de volta! 🎉");
          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 1000);
        })
        .catch((error) => {
          const errorMessage = error.response?.data || "Credenciais inválidas. Verifique seu e-mail e senha.";
          showErrorToast(errorMessage);
          props.onInvalidCredential();
        });
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Por favor, insira um endereço de e-mail válido.")
        .required("E-mail é obrigatório."),
      password: Yup.string("Senha é obrigatória."),
      rememberMe: Yup.boolean(),
    }),
    validateOnBlur: true,
  });
  return (
    <Container
      className="px-5 d-flex justify-content-center align-items-center login-page"
      style={{ height: "70vh" }}
    >
      <Card style={{ width: "30rem" }} className="login-card">
        <Card.Body>
          <div className="d-flex justify-content-center">
            <h2 className="mb-4" style={{ fontWeight: 700, color: '#1a1a1a' }}>Entrar</h2>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Endereço de e-mail
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                placeholder="seu@email.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <p className="text-danger">
                {formik.errors.email && formik.touched.email
                  ? formik.errors.email
                  : null}
              </p>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Senha
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="••••••••"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <p className="text-danger">
                {formik.errors.password && formik.touched.password
                  ? formik.errors.password
                  : null}
              </p>
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                name="rememberMe"
                className="form-check-input"
                id="exampleCheck1"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Lembrar de mim
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">
              Entrar
            </button>
            <div className="text-center">
              <span style={{ color: '#6b7280' }}>Não tem uma conta? </span>
              <Link to="/register" style={{ color: '#ff6b35', fontWeight: 600, textDecoration: 'none' }}>
                Cadastre-se
              </Link>
            </div>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginForm;
