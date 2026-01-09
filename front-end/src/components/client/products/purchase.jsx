import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import shopping from "../../../pages/client/shopping";
const Purchase = ({
  product,
  ifPurchasing,
  onCancelPurchase,
  onMakePurchase,
  shoppingCartItems,
}) => {
  const formik = useFormik({
    initialValues: {
      quantity: "1",
    },
    onSubmit: (values) => {
      onMakePurchase(Number.parseInt(values.quantity, 10), product);
      values.quantity = 1;
    },
    validationSchema: Yup.object({
      quantity: Yup.number()
        .integer("A quantidade deve ser um número inteiro.")
        .max(100, "A quantidade máxima é 100.")
        .min(1, "A quantidade mínima é 1.")
        .test(
          "testOverload",
          "Quantidade excede o limite.",
          function testOverload(value) {
            let item = shoppingCartItems.find((item) => {
              return item._id == product._id;
            });
            if (item == null) {
              return true;
            } else {
              return Number.parseInt(item.quantity, 10) + Number.parseInt(value, 10) <= 100;
            }
          }
        )
        .required("Quantidade é obrigatória."),
    }),
  });

  function calculateTotal() {
    let value = 0;
    if (
      formik.values.quantity > 0 &&
      formik.values.quantity <= 100 &&
      ifPurchasing
    )
      value = formik.values.quantity * product.price;
    return value;
  }

  return (
    <Modal show={ifPurchasing} onHide={onCancelPurchase}>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontWeight: 700, color: '#1a1a1a' }}>
          {ifPurchasing ? product.name : " "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ color: '#6b7280', marginBottom: '16px' }}>
          {ifPurchasing ? product.description : " "}
        </p>
        <div>
          <p style={{ fontSize: '18px', fontWeight: 700, color: '#ff6b35' }}>
            Preço: R$ {ifPurchasing ? product.price.toFixed(2) : "0.00"}
          </p>
          <form>
            <div className="form-group">
              <label htmlFor="quantityInput" className="form-label">Quantidade:</label>
              <input
                type="number"
                name="quantity"
                className="form-control mt-2"
                id="quantityInput"
                value={formik.values.quantity}
                onChange={formik.handleChange}
              />
              <p className="text-danger" style={{ fontSize: '14px', marginTop: '8px' }}>
                {formik.errors.quantity ? formik.errors.quantity : null}
              </p>
            </div>
            <div style={{ 
              padding: '12px', 
              background: '#fff5f2', 
              borderRadius: '8px',
              marginTop: '16px'
            }}>
              <p className="mt-3" style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#ff6b35' }}>
                Total: R$ {calculateTotal().toFixed(2)}
              </p>
            </div>
            <div className="d-flex gap-2 mt-3">
              <Button
                variant="primary"
                type="submit"
                onClick={formik.handleSubmit}
              >
                Adicionar ao Carrinho
              </Button>
              <Button
                variant="secondary"
                onClick={() => onCancelPurchase()}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Purchase;
