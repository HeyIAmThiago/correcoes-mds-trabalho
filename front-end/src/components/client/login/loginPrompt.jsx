import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const LoginPrompt = ({ ifVisible, onClose }) => {
  return (
    <div>
      <Modal show={ifVisible} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: 700, color: '#1a1a1a' }}>
            Login Necessário
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Por favor, faça login para continuar com a compra.
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

export default LoginPrompt;
