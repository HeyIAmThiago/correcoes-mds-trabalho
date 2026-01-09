import React, { Component } from "react";
import { Button, Container } from "react-bootstrap";
import ShoppingCartCard from "../../components/client/products/shoppingCartCard";
import OrderConfirm from "../../components/client/products/orderConfirm";
import EmptyCart from "../../components/client/products/emptyCart";

const ShoppingCart = ({
  shoppingCartItems,
  calculateTotal,
  calculateSubTotal,
  onDelete,
  onClear,
  onAddOne,
  onRemoveOne,
  orderConfirmVisible,
  onOrderConfirmOpen,
  onOrderConfirm,
  onOrderConfirmClose,
  emptyCartVisibility,
  onCloseEmptyCart,
}) => {
  return (
    <div className="d-flex">
      <div className="d-flex align-items-start flex-column container-fluid">
        <Container>
          {shoppingCartItems.map((item) => (
            <ShoppingCartCard
              key={item._id}
              item={item}
              calculateSubTotal={calculateSubTotal}
              onDelete={onDelete}
              onClear={onClear}
              onAddOne={onAddOne}
              onRemoveOne={onRemoveOne}
            />
          ))}
        </Container>
        <div className="container-fluid d-flex justify-content-center">
          <p style={{ fontSize: '24px', fontWeight: 700, color: '#ff6b35' }}>
            Total: R$ {calculateTotal(shoppingCartItems).toFixed(2)}
          </p>
        </div>
        <div className="container-fluid d-flex justify-content-center gap-2">
          <Button
            variant="primary"
            className="mx-2"
            onClick={onOrderConfirmOpen}
          >
            Finalizar Pedido
          </Button>
          <Button variant="warning" onClick={onClear}>
            Limpar Carrinho
          </Button>
        </div>
      </div>
      <OrderConfirm
        onClose={onOrderConfirmClose}
        onConfirm={onOrderConfirm}
        ifVisible={orderConfirmVisible}
      />
      <EmptyCart ifVisible={emptyCartVisibility} onClose={onCloseEmptyCart} />
    </div>
  );
};

export default ShoppingCart;
