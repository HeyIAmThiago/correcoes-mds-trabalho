import React, { useState } from "react";
import PropTypes from "prop-types";
import { Col, Row, Modal, Button } from "react-bootstrap";

const ShoppingCartCard = ({
  item,
  calculateSubTotal,
  onDelete,
  onAddOne,
  onRemoveOne,
}) => {
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const handleRemoveOne = () => {
    if (item.quantity === 1) {
      setShowRemoveModal(true);
    } else {
      onRemoveOne(item);
    }
  };

  const confirmRemove = () => {
    setShowRemoveModal(false);
    onRemoveOne(item);
  };

  return (
    <>
      <div className="d-flex mt-3 mb-3 justify-content-center">
        <div className="card" style={{ width: "50rem" }}>
          <h5 className="card-header" style={{ fontWeight: 700 }}>{item.name}</h5>
          <div className="card-body d-flex justify-content-center">
            <Row className="container-fluid">
              <Col xs={3} className="d-flex justify-content-center">
                <img
                  src={item.image}
                  className="mx-auto"
                  alt={item.name}
                  style={{ 
                    height: "10rem", 
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "8px"
                  }}
                />
              </Col>
              <Col className="d-flex container-fluid">
                <div className="d-flex align-items-start flex-column container-fluid">
                  <p style={{ color: '#6b7280' }}>{item.description}</p>
                  <p className="d-inline-block"><strong>Quantidade:</strong> {item.quantity}</p>
                  <p className="d-inline-block" style={{ fontSize: '18px', fontWeight: 700, color: '#ff6b35' }}>
                    Subtotal: R$ {calculateSubTotal(item).toFixed(2)}
                  </p>
                  <div>
                    <button
                      type="button"
                      className="btn btn-success mx-2"
                      onClick={() => onAddOne(item)}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning mx-2"
                      onClick={handleRemoveOne}
                    >
                      -
                    </button>
                  </div>
                </div>
                <div className="align-self-end block">
                  <a
                    href="#"
                    className="btn btn-danger mt-2"
                    onClick={(e) => {
                      e.preventDefault();
                      onDelete(item);
                    }}
                  >
                    Remover
                  </a>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      <Modal show={showRemoveModal} onHide={() => setShowRemoveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: 700, color: '#1a1a1a' }}>Remover do Carrinho?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deseja remover <strong>{item.name}</strong> do carrinho?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRemoveModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmRemove}>
            Remover
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ShoppingCartCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  calculateSubTotal: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAddOne: PropTypes.func.isRequired,
  onRemoveOne: PropTypes.func.isRequired,
};

export default ShoppingCartCard;
