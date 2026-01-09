import React from "react";
import { Button, Modal } from "react-bootstrap";

const InvalidCredential = ({ ifVisible, onClose }) => {
  return (
    <div>
      <Modal show={ifVisible} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: 700, color: '#1a1a1a' }}>
            Credenciais Inválidas
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Email ou senha incorretos.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InvalidCredential;
