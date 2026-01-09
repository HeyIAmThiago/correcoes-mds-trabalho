import React from "react";
import { Container } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../../Toast";

const Register = () => {
  // CORREÇÃO 1: Definindo o endereço de fallback DENTRO do componente
  // Isso ignora a falha de resolução de rede interna (ERR_NAME_NOT_RESOLVED).
  const API_ENDPOINT = "http://host.docker.internal:5000";
  const uri = API_ENDPOINT + "/customer";

  const FILE_SIZE = 5 * 1024 * 1024;
  const SUPPORTED_FORMATS = new Set([
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ]);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      gender: "",
      image: null,
    },
    onSubmit: async (values) => {
      try {
        const {
          firstName,
          lastName,
          gender,
          phoneNumber,
          email,
          password,
          // O campo 'image' não será mais usado após a remoção do upload.
        } = values;

        // VARIÁVEL DE FALLBACK (Usuário será criado sem avatar, pois não é obrigatório no backend)
        const avatarUrl = null;

        await axios.post(uri, {
          firstName,
          lastName,
          phoneNumber,
          email,
          password,
          gender,
          avatarUrl,
        });
        
        showSuccessToast("Cadastro realizado com sucesso! Faça login para continuar. 🎉");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } catch (error) {
        const errorMessage = error.response?.data || "Erro ao realizar cadastro. Verifique os dados e tente novamente.";
        showErrorToast(errorMessage);
      }
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(30, "O nome é muito longo")
        .required("Nome é obrigatório"),
      lastName: Yup.string()
        .max(30, "O sobrenome é muito longo")
        .required("Sobrenome é obrigatório"),
      phoneNumber: Yup.string()
        .max(10, "Telefone deve ter 10 dígitos")
        .min(10, "Telefone deve ter 10 dígitos")
        .required("Telefone é obrigatório"),
      gender: Yup.string()
        .max(20, "Muito longo")
        .required("Gênero é obrigatório"),
      email: Yup.string()
        .email("Por favor, insira um endereço de e-mail válido.")
        .required("E-mail é obrigatório."),
      password: Yup.string()
        .required("Senha é obrigatória.")
        .min(8, "A senha deve ter no mínimo 8 caracteres."),
      confirmPassword: Yup.string()
        .required("Por favor, confirme sua senha.")
        .oneOf([Yup.ref("password")], "As senhas não coincidem"),

      // CORREÇÃO 2: Removida a validação obrigatória da imagem
      // Para testes locais, onde o upload foi desabilitado.
      image: Yup.mixed()
        .test(
          "fileSize",
          "Arquivo muito grande",
          // Permite que o campo seja nulo, se a imagem não for selecionada
          (value) => !value || value.size <= FILE_SIZE
        )
        .test(
          "fileFormat",
          "Formato não suportado",
          (value) => !value || SUPPORTED_FORMATS.has(value.type)
        ),
    }),
    validateOnBlur: true,
    validateOnChange: false,
  });

  return (
    <div className="mb-5">
      <Container className="d-flex justify-content-center">
        <div className="card mt-5 register-card" style={{ width: "40rem" }}>
          <div className="card-body">
            <div className="d-flex align-items-center flex-column mb-3">
              <h3 className="card-title mb-3" style={{ fontWeight: 700, color: '#1a1a1a' }}>Cadastro</h3>
              {formik.values.image && !formik.errors.image ? (
                <img
                  src={URL.createObjectURL(formik.values.image)}
                  alt="avatar"
                  style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                />
              ) : (
                <img src="/login.png" alt="avatar" style={{ width: "80px" }} />
              )}
            </div>
            <form>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Foto de perfil (opcional)
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  onChange={(e) => {
                    formik.setFieldValue("image", e.currentTarget.files[0]);
                  }}
                  onBlur={formik.handleBlur}
                />
                <p className="text-danger">
                  {formik.errors.image && formik.touched.image
                    ? formik.errors.image
                    : null}
                </p>
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
                  <label htmlFor="exampleInputEmail1">Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Seu nome"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <p className="text-danger">
                    {formik.errors.firstName && formik.touched.firstName
                      ? formik.errors.firstName
                      : null}
                  </p>
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="exampleInputEmail1">Sobrenome</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Seu sobrenome"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <p className="text-danger">
                    {formik.errors.lastName && formik.touched.lastName
                      ? formik.errors.lastName
                      : null}
                  </p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12 col-md-6">
                  <label htmlFor="exampleInputEmail1">Telefone</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="(00) 00000-0000"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <p className="text-danger">
                    {formik.errors.phoneNumber && formik.touched.phoneNumber
                      ? formik.errors.phoneNumber
                      : null}
                  </p>
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="exampleInputEmail1">Gênero</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masculino/Feminino/Outro"
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <p className="text-danger">
                    {formik.errors.gender && formik.touched.gender
                      ? formik.errors.gender
                      : null}
                  </p>
                </div>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="exampleInputEmail1">Endereço de e-mail</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="seu@email.com"
                  aria-describedby="emailHelp"
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
              <div className="form-group mt-3">
                <label htmlFor="exampleInputPassword1">Senha</label>
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
              <div className="form-group mt-3">
                <label htmlFor="exampleInputPassword2">Confirmar Senha</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  id="exampleInputPassword2"
                  placeholder="••••••••"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <p className="text-danger">
                  {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword
                    ? formik.errors.confirmPassword
                    : null}
                </p>
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-4 w-100"
                onClick={formik.handleSubmit}
              >
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
