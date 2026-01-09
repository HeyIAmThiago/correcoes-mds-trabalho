import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag, faCalendar, faTimes } from "@fortawesome/free-solid-svg-icons";

function calculateTotal(order) {
  let total = 0;
  order.products.forEach((product) => {
    total += product.price * product.quantity;
  });
  return total;
}

const OrderCard = ({ onDelete, order }) => {
  return (
    <div className="card my-3" style={{ width: "40rem", border: '1px solid #e5e5e5' }}>
      <div className="card-body">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <FontAwesomeIcon icon={faShoppingBag} style={{ color: '#ff6b35', fontSize: '20px' }} />
          <h5 className="card-title" style={{ margin: 0, fontWeight: 700 }}>Produtos:</h5>
        </div>
        <div className="card-text" style={{ marginBottom: '16px' }}>
          {order.products.map((product, index) => (
            <p key={index} style={{ color: '#4a4a4a', marginBottom: '8px', fontSize: '14px' }}>
              • {product.name} <strong>x{product.quantity}</strong>
            </p>
          ))}
        </div>
        <div style={{ 
          padding: '12px', 
          background: '#fff5f2', 
          borderRadius: '8px',
          marginBottom: '12px'
        }}>
          <p style={{ 
            margin: 0, 
            fontSize: '18px', 
            fontWeight: 700, 
            color: '#ff6b35' 
          }}>
            Total: R$ {calculateTotal(order).toFixed(2)}
          </p>
        </div>
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
          <FontAwesomeIcon icon={faCalendar} style={{ marginRight: '8px' }} />
          Data: {new Date(order.createDate).toLocaleDateString('pt-BR')}
        </p>
        <a 
          href="#" 
          className="btn btn-danger" 
          onClick={(e) => {
            e.preventDefault();
            onDelete(order);
          }}
          style={{ width: '100%' }}
        >
          <FontAwesomeIcon icon={faTimes} style={{ marginRight: '8px' }} />
          Cancelar Pedido
        </a>
      </div>
    </div>
  );
};

export default OrderCard;
