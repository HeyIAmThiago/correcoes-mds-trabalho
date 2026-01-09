import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteOrderConfirm = ({ order, ifVisible, onClose, onConfirm }) => {
  if (order == null) return <div />;
  if (order.ifFulfilled == true) {
    return (
      <div>
        <Modal show={ifVisible} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{ fontWeight: 700, color: '#1a1a1a' }}>
              Cancelar Pedido
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Este pedido já foi processado e não pode ser cancelado.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={onClose}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  } else {
    return (
      <div>
        <Modal show={ifVisible} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{ fontWeight: 700, color: '#1a1a1a' }}>
              Cancelar Pedido
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tem certeza que deseja cancelar este pedido?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={onConfirm}>
              Confirmar Cancelamento
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Voltar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

export default DeleteOrderConfirm;
