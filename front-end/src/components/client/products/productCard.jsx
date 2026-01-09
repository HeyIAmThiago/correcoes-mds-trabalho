import React from "react";
import PropTypes from "prop-types";
import { Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const ProductCard = (props) => {
  function productType() {
    if (props.product.isCourse === true) {
      return "Curso";
    } else if (props.product.isMeal === true) {
      return "Refeição";
    } else {
      return "Produto";
    }
  }

  function productIcon() {
    if (props.product.isCourse === true) return <FontAwesomeIcon icon={solid("graduation-cap")} />;
    if (props.product.isMeal === true) return <FontAwesomeIcon icon={solid("utensils")} />;
    return <FontAwesomeIcon icon={solid("box")} />;
  }

  return (
    <Col className="d-flex justify-content-center mb-4">
      <div 
        className="card d-flex" 
        style={{ 
          width: "280px", 
          height: "420px",
          border: 'none',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        }}
      >
        <div style={{ 
          position: 'relative', 
          height: '200px', 
          overflow: 'hidden',
          background: '#f5f5f5',
        }}>
          <img
            src={props.product.image}
            className="card-img-top"
            alt={props.product.name}
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'white',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 600,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            <span>{productIcon()}</span>
            <span>{productType()}</span>
          </div>
        </div>
        
        <div className="card-body d-flex flex-column" style={{ padding: '20px' }}>
          <h5 
            className="card-title" 
            style={{ 
              fontSize: '18px',
              fontWeight: 700,
              color: '#1a1a1a',
              marginBottom: '8px',
              lineHeight: 1.3,
            }}
          >
            {props.product.name}
          </h5>
          
          <p 
            className="card-text" 
            style={{ 
              fontSize: '14px',
              color: '#6b7280',
              marginBottom: '16px',
              flex: 1,
              lineHeight: 1.5,
            }}
          >
            {props.product.description}
          </p>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}>
            <span style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#ff6b35',
            }}>
              R$ {props.product.price.toFixed(2)}
            </span>
          </div>
          
          <button
            className="btn btn-primary w-100"
            onClick={() => props.onPurchase(props.product)}
            style={{
              background: '#ff6b35',
              border: 'none',
              borderRadius: '12px',
              padding: '12px',
              fontSize: '15px',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e55a2b';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 107, 53, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ff6b35';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <FontAwesomeIcon icon={solid("cart-plus")} />
            <span>Adicionar ao Carrinho</span>
          </button>
        </div>
      </div>
    </Col>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    isCourse: PropTypes.bool,
    isMeal: PropTypes.bool,
    isGoods: PropTypes.bool,
  }).isRequired,
  onPurchase: PropTypes.func.isRequired,
};

export default ProductCard;
