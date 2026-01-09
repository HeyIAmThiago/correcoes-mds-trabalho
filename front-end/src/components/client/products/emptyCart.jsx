import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

const EmptyCart = ({ ifVisible, onClose }) => {
  return (
    <div>
      <Modal show={ifVisible} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: 700, color: '#1a1a1a' }}>
            Carrinho Vazio
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Seu carrinho está vazio. Por favor, adicione alguns produtos antes de fazer o pedido.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

EmptyCart.propTypes = {
  ifVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EmptyCart;
