import React, { Component } from "react";
import Products from "./browseProducts";
import ShoppingCart from "./shoppingCart";
import { Container, Tab, Tabs } from "react-bootstrap";
import LoginPrompt from "../../components/client/login/loginPrompt";
import http from "../../services/httpService";
import { showSuccessToast, showErrorToast, showInfoToast } from "../../components/Toast";

class Shopping extends Component {
  state = {
    products: [],
    productPurchasing: null,
    ifPurchasing: false,
    shoppingCartItems: [],
    orderConfirmVisible: false,
    emptyCartVisibility: false,
    loginPromptVisibility: false,
  };

  async componentDidMount() {
    const uri = process.env.REACT_APP_API_ENDPOINT + "/product";
    http
      .get(
        // "http://localhost:4000/product"
        uri
      )
      .then((res) => {
        const products = res.data;
        products.forEach((product) => {
          if (!product.image) {
            product.image = "/gym-logo.svg";
          }
          if (!product.description) {
            product.description = "Produto disponível na academia Workout Day Gym";
          }
        });
        this.setState({ products });
      });
  }

  onPurchase = (product) => {
    let jwt = localStorage.getItem("token");
    if (jwt != null) {
      const ifPurchasing = true;
      this.setState({ productPurchasing: product, ifPurchasing });
    } else {
      showInfoToast("Faça login para adicionar produtos ao carrinho");
      this.setState({ loginPromptVisibility: true });
    }
  };

  onCancelPurchase = () => {
    const ifPurchasing = false;
    this.setState({ productPurchasing: null, ifPurchasing });
  };

  onMakePurchase = (quantity, product) => {
    let shoppingCartItems = [...this.state.shoppingCartItems];
    const index = shoppingCartItems.findIndex((item) => {
      return product._id === item._id;
    });
    if (index === -1) {
      let item = {
        quantity: quantity,
        _id: product._id,
        image: product.image,
        description: product.description,
        name: product.name,
        price: product.price,
      };
      shoppingCartItems.push(item);
      showSuccessToast(`${product.name} adicionado ao carrinho! 🎉`);
      this.setState({
        shoppingCartItems,
        productPurchasing: null,
        ifPurchasing: false,
      });
    } else {
      shoppingCartItems[index].quantity += Number.parseInt(quantity, 10);
      showSuccessToast(`Quantidade de ${product.name} atualizada no carrinho!`);
      this.setState({
        shoppingCartItems,
        productPurchasing: null,
        ifPurchasing: false,
      });
    }
  };

  onDelete = (item) => {
    const shoppingCartItems = this.state.shoppingCartItems.filter(
      (i) => i._id !== item._id
    );
    showInfoToast(`${item.name} removido do carrinho`);
    this.setState({ shoppingCartItems });
  };

  onClear = () => {
    const shoppingCartItems = [];
    showInfoToast("Carrinho limpo com sucesso");
    this.setState({ shoppingCartItems });
  };

  onAddOne = (item) => {
    this.setState((prevState) => {
      const shoppingCartItems = [...prevState.shoppingCartItems];
      const index = shoppingCartItems.findIndex((shoppingCartItem) => {
        return shoppingCartItem._id === item._id;
      });
      shoppingCartItems[index].quantity += 1;
      return { shoppingCartItems };
    });
  };

  onRemoveOne = (item) => {
    this.setState((prevState) => {
      const shoppingCartItems = [...prevState.shoppingCartItems];
      const index = shoppingCartItems.findIndex((shoppingCartItem) => {
        return shoppingCartItem._id === item._id;
      });
      shoppingCartItems[index].quantity -= 1;
      if (shoppingCartItems[index].quantity > 0) {
        return { shoppingCartItems };
      } else {
        shoppingCartItems.splice(index, 1);
        return { shoppingCartItems };
      }
    });
  };

  calculateTotal = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  calculateSubTotal = (item) => {
    let subTotal = 0;
    subTotal = item.price * item.quantity;
    return subTotal;
  };

  handleOrderConfirmClose = () => {
    this.setState({ orderConfirmVisible: false });
  };

  handleOrderConfirmOpen = () => {
    if (this.state.shoppingCartItems.length === 0) {
      showErrorToast("Seu carrinho está vazio! Adicione produtos antes de finalizar o pedido.");
      this.setState({ emptyCartVisibility: true });
    } else {
      this.setState({ orderConfirmVisible: true });
    }
  };

  handleOrderConfirm = (paymentMethod) => {
    const products = this.state.shoppingCartItems.map((item) => {
      const product = {
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      };
      return product;
    });
    const customerId = localStorage.getItem("id");
    const uri = process.env.REACT_APP_API_ENDPOINT + "/order";
    
    const paymentMethodNames = {
      credit: "Cartão de Crédito",
      debit: "Cartão de Débito",
      pix: "PIX",
      cash: "Dinheiro"
    };
    
    http
      .post(
        // "http://localhost:4000/order"
        uri,
        {
          products,
          customerId,
          paymentMethod: paymentMethodNames[paymentMethod] || paymentMethod,
        }
      )
      .then(function (response) {
        showSuccessToast(`Pedido realizado com sucesso via ${paymentMethodNames[paymentMethod]}! 🎉`);
      })
      .catch(function (error) {
        console.error("Error creating order:", error);
        showErrorToast("Erro ao processar seu pedido. Tente novamente.");
      });
    this.setState({ shoppingCartItems: [], orderConfirmVisible: false });
  };

  handleCloseEmptyCart = () => {
    this.setState({ emptyCartVisibility: false });
  };

  handleCloseLoginPrompt = () => {
    this.setState({ loginPromptVisibility: false });
  };

  render() {
    let {
      products,
      productPurchasing,
      ifPurchasing,
      shoppingCartItems,
      orderConfirmVisible,
      emptyCartVisibility,
      loginPromptVisibility,
    } = this.state;
    return (
      <div>
        <Container className="mt-3">
          <Tabs
            defaultActiveKey="products"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="products" title="Produtos">
              <Products
                products={products}
                onPurchase={this.onPurchase}
                productPurchasing={productPurchasing}
                ifPurchasing={ifPurchasing}
                onCancelPurchase={this.onCancelPurchase}
                onMakePurchase={this.onMakePurchase}
                shoppingCartItems={shoppingCartItems}
              />
            </Tab>
            <Tab eventKey="shoppingCart" title="Carrinho de Compras">
              <ShoppingCart
                shoppingCartItems={shoppingCartItems}
                calculateTotal={this.calculateTotal}
                calculateSubTotal={this.calculateSubTotal}
                onDelete={this.onDelete}
                onClear={this.onClear}
                onAddOne={this.onAddOne}
                onRemoveOne={this.onRemoveOne}
                orderConfirmVisible={orderConfirmVisible}
                onOrderConfirmClose={this.handleOrderConfirmClose}
                onOrderConfirmOpen={this.handleOrderConfirmOpen}
                onOrderConfirm={this.handleOrderConfirm}
                emptyCartVisibility={emptyCartVisibility}
                onCloseEmptyCart={this.handleCloseEmptyCart}
              />
            </Tab>
          </Tabs>
        </Container>
        <LoginPrompt
          ifVisible={loginPromptVisibility}
          onClose={this.handleCloseLoginPrompt}
        />
      </div>
    );
  }
}

export default Shopping;
