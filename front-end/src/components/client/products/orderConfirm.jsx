import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faMoneyBill, faQrcode } from "@fortawesome/free-solid-svg-icons";

const OrderConfirm = ({ ifVisible, onConfirm, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState("credit");

  const handleConfirm = () => {
    onConfirm(paymentMethod);
  };

  return (
    <div>
      <Modal show={ifVisible} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: 700, color: '#1a1a1a' }}>
            Confirmar Pedido
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ marginBottom: '20px', fontSize: '15px' }}>
            Tem certeza que deseja finalizar este pedido?
          </p>

          <Form.Group>
            <Form.Label style={{ fontWeight: 600, marginBottom: '12px' }}>
              Selecione o método de pagamento:
            </Form.Label>
            
            <div className="payment-methods">
              <div
                className={`payment-option ${paymentMethod === 'credit' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('credit')}
                style={{
                  border: paymentMethod === 'credit' ? '2px solid #2563eb' : '2px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '12px',
                  cursor: 'pointer',
                  background: paymentMethod === 'credit' ? '#eff6ff' : '#fff',
                  transition: 'all 0.2s ease',
                }}
              >
                <FontAwesomeIcon icon={faCreditCard} style={{ marginRight: '10px', color: '#2563eb' }} />
                <strong>Cartão de Crédito</strong>
                <p style={{ margin: '4px 0 0 28px', fontSize: '13px', color: '#666' }}>
                  Pague em até 12x sem juros
                </p>
              </div>

              <div
                className={`payment-option ${paymentMethod === 'debit' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('debit')}
                style={{
                  border: paymentMethod === 'debit' ? '2px solid #2563eb' : '2px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '12px',
                  cursor: 'pointer',
                  background: paymentMethod === 'debit' ? '#eff6ff' : '#fff',
                  transition: 'all 0.2s ease',
                }}
              >
                <FontAwesomeIcon icon={faCreditCard} style={{ marginRight: '10px', color: '#10b981' }} />
                <strong>Cartão de Débito</strong>
                <p style={{ margin: '4px 0 0 28px', fontSize: '13px', color: '#666' }}>
                  Débito à vista
                </p>
              </div>

              <div
                className={`payment-option ${paymentMethod === 'pix' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('pix')}
                style={{
                  border: paymentMethod === 'pix' ? '2px solid #2563eb' : '2px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '12px',
                  cursor: 'pointer',
                  background: paymentMethod === 'pix' ? '#eff6ff' : '#fff',
                  transition: 'all 0.2s ease',
                }}
              >
                <FontAwesomeIcon icon={faQrcode} style={{ marginRight: '10px', color: '#00a868' }} />
                <strong>PIX</strong>
                <p style={{ margin: '4px 0 0 28px', fontSize: '13px', color: '#666' }}>
                  Aprovação instantânea
                </p>
              </div>

              <div
                className={`payment-option ${paymentMethod === 'cash' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('cash')}
                style={{
                  border: paymentMethod === 'cash' ? '2px solid #2563eb' : '2px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '16px',
                  cursor: 'pointer',
                  background: paymentMethod === 'cash' ? '#eff6ff' : '#fff',
                  transition: 'all 0.2s ease',
                }}
              >
                <FontAwesomeIcon icon={faMoneyBill} style={{ marginRight: '10px', color: '#f59e0b' }} />
                <strong>Dinheiro</strong>
                <p style={{ margin: '4px 0 0 28px', fontSize: '13px', color: '#666' }}>
                  Pagar na recepção
                </p>
              </div>
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Voltar
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Finalizar Pedido
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
