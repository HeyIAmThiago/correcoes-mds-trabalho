import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showSuccessToast, showErrorToast, showWarningToast } from "../../Toast";

const FitnessProfileUpdate = ({
  isVisible,
  onClose,
  onSubmitUpdate,
  profile,
}) => {
  const formik = useFormik({
    initialValues: {
      weight: profile.fitnessProfile.weight,
      height: profile.fitnessProfile.height,
      BFP: profile.fitnessProfile.BFP,
      BMI: profile.fitnessProfile.BMI,
    },
    onSubmit: (values) => {
      showSuccessToast("Perfil atualizado com sucesso! 💪");
      onSubmitUpdate(values);
    },
    validationSchema: Yup.object({
      weight: Yup.number()
        .typeError("Peso deve ser um número")
        .max(300, "Peso muito alto! Por favor, insira um valor realista (máx: 300kg)")
        .min(20, "Peso muito baixo! Por favor, insira um valor realista (mín: 20kg)")
        .required("Peso é obrigatório"),
      height: Yup.number()
        .typeError("Altura deve ser um número")
        .max(250, "Altura muito alta! Por favor, insira um valor realista (máx: 250cm)")
        .min(50, "Altura muito baixa! Por favor, insira um valor realista (mín: 50cm)")
        .required("Altura é obrigatória"),
      BFP: Yup.number()
        .typeError("Percentual de gordura deve ser um número")
        .max(60, "Percentual de gordura corporal muito alto! O valor máximo aceitável é 60%")
        .min(2, "Percentual de gordura corporal muito baixo! O valor mínimo aceitável é 2%")
        .required("Percentual de gordura corporal é obrigatório"),
      BMI: Yup.number()
        .typeError("IMC deve ser um número")
        .max(50, "IMC muito alto! Por favor, verifique o valor (máx: 50)")
        .min(10, "IMC muito baixo! Por favor, verifique o valor (mín: 10)")
        .required("IMC é obrigatório"),
    }),
    validateOnBlur: true,
    validateOnChange: false,
    enableReinitialize: true,
  });

  return (
    <div>
      <form>
        <Modal show={isVisible} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{ fontWeight: 700, color: '#1a1a1a' }}>Atualizar Perfil</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Peso (kg)
              </label>
              <input
                type="number"
                className="form-control"
                id="weight"
                name="weight"
                step="0.1"
                placeholder="Ex: 75.5"
                aria-describedby="weightHelp"
                value={formik.values.weight}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <p className="text-danger" style={{ fontSize: '13px', marginTop: '4px' }}>
                {formik.errors.weight && formik.touched.weight ? formik.errors.weight : null}
              </p>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Altura (cm)
              </label>
              <input
                type="number"
                className="form-control"
                id="height"
                name="height"
                step="0.1"
                placeholder="Ex: 175"
                aria-describedby="heightHelp"
                value={formik.values.height}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <p className="text-danger" style={{ fontSize: '13px', marginTop: '4px' }}>
                {formik.errors.height && formik.touched.height ? formik.errors.height : null}
              </p>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Percentual de Gordura Corporal (%)
              </label>
              <input
                type="number"
                className="form-control"
                id="BFP"
                name="BFP"
                step="0.1"
                placeholder="Ex: 15.5"
                aria-describedby="BFPHelp"
                value={formik.values.BFP}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <p className="text-danger" style={{ fontSize: '13px', marginTop: '4px' }}>
                {formik.errors.BFP && formik.touched.BFP ? formik.errors.BFP : null}
              </p>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Índice de Massa Corporal (IMC)
              </label>
              <input
                type="number"
                className="form-control"
                id="BMI"
                name="BMI"
                step="0.1"
                placeholder="Ex: 24.6"
                aria-describedby="BMIHelp"
                value={formik.values.BMI}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <p className="text-danger" style={{ fontSize: '13px', marginTop: '4px' }}>
                {formik.errors.BMI && formik.touched.BMI ? formik.errors.BMI : null}
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={formik.handleSubmit}
            >
              Salvar Alterações
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </div>
  );
};

export default FitnessProfileUpdate;
