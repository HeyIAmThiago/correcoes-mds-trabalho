import React, { useState } from "react";
import ProductList from "../../components/client/products/productList";
import Purchase from "../../components/client/products/purchase";
import { Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Products = ({
  products,
  onPurchase,
  productPurchasing,
  ifPurchasing,
  onCancelPurchase,
  onMakePurchase,
  shoppingCartItems,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <div style={{ marginBottom: '24px', maxWidth: '500px' }}>
        <InputGroup>
          <InputGroup.Text style={{ 
            background: 'white', 
            border: '2px solid #e5e5e5',
            borderRight: 'none',
            borderRadius: '12px 0 0 12px'
          }}>
            <FontAwesomeIcon icon={solid("search")} style={{ color: '#6b7280' }} />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              border: '2px solid #e5e5e5',
              borderLeft: 'none',
              borderRadius: '0 12px 12px 0',
              padding: '12px 16px',
              fontSize: '14px'
            }}
          />
        </InputGroup>
        {searchTerm && (
          <div style={{ marginTop: '8px', fontSize: '14px', color: '#6b7280' }}>
            {filteredProducts.length} produto(s) encontrado(s)
          </div>
        )}
      </div>
      <ProductList products={filteredProducts} onPurchase={onPurchase} />
      <Purchase
        product={productPurchasing}
        ifPurchasing={ifPurchasing}
        onCancelPurchase={onCancelPurchase}
        onMakePurchase={onMakePurchase}
        shoppingCartItems={shoppingCartItems}
      />
    </div>
  );
};

export default Products;
