import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

const EmptyCart = ({ ifVisible, onClose }) => {
  return (
    <div>
      <Modal show={ifVisible} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Empty Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your shopping cart is empty. Please add some items before placing the
          order.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
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
