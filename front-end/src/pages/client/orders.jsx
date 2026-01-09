import React, { Component } from "react";
import OrderCard from "../../components/client/order/orderCard";
import DeleteOrderConfirm from "../../components/client/order/deleteOrderConfirm";
import http from "../../services/httpService";
import { showSuccessToast, showErrorToast } from "../../components/Toast";

class Orders extends Component {
  state = {
    orders: [],
    deleteVisible: false,
    orderDeleting: null,
  };

  async componentDidMount() {
    const userId = localStorage.getItem("id");
    const uri = process.env.REACT_APP_API_ENDPOINT + "/order/customer/";
    const res = await http.get(
      // `http://localhost:4000/order/customer/${userId}`
      uri + userId
    );
    const orders = res.data;
    this.setState({ orders });
  }

  handleDelete = (order) => {
    this.setState({ orderDeleting: order, deleteVisible: true });
  };

  handleDeleteConfirm = () => {
    const deleteOrderId = this.state.orderDeleting._id;
    const uri = process.env.REACT_APP_API_ENDPOINT + "/order/";
    http
      .delete(
        // `http://localhost:4000/order/${deleteOrderId}`
        uri + deleteOrderId
      )
      .then(() => {
        this.setState({ deleteVisible: false, orderDeleting: null });
        showSuccessToast("Pedido cancelado com sucesso");
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch(() => {
        showErrorToast("Erro ao cancelar pedido. Tente novamente.");
      });
  };

  handleClose = () => {
    const deleteVisible = false;
    this.setState({ deleteVisible });
  };

  render() {
    if (this.state.orders.length === 0) {
      return (
        <div className="d-flex justify-content-center mt-5 flex-column align-items-center">
          <h2 style={{ fontWeight: 700, color: '#1a1a1a' }}>Nenhum pedido encontrado</h2>
          <p style={{ color: '#6b7280', marginTop: '8px' }}>Você ainda não fez nenhum pedido.</p>
        </div>
      );
    } else {
      return (
        <div>
          <div className="d-flex flex-column align-items-center">
            {this.state.orders.map((order) => (
              <OrderCard key={order._id} order={order} onDelete={this.handleDelete} />
            ))}
          </div>
          <div>
            <DeleteOrderConfirm
              order={this.state.orderDeleting}
              ifVisible={this.state.deleteVisible}
              onConfirm={this.handleDeleteConfirm}
              onClose={this.handleClose}
            />
          </div>
        </div>
      );
    }
  }
}

export default Orders;
