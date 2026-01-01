import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

const OrderConfirm = ({ ifVisible, onConfirm, onClose }) => {
  return (
    <div>
      <Modal show={ifVisible} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to place the order?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onConfirm}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

OrderConfirm.propTypes = {
  ifVisible: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default OrderConfirm;
