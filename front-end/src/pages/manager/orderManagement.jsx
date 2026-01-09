import React, { useEffect, useState } from "react";
import http from "../../services/httpService";
import { Button, Card, Container, Form, Modal, Table, Badge } from "react-bootstrap";
import { showSuccessToast, showErrorToast } from "../../components/Toast";
import MyPagination from "../../utils/pagination";
import { Link } from "react-router-dom";
import "../../css/manager.css";

const empty = {
  products: [],
  createDate: Date.now(),
  customerId: "",
  isFulfilled: false
};

const uri = process.env.REACT_APP_API_ENDPOINT + "/order/";
const itemsPerPage = 10;

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);
  const [order, setOrder] = useState(empty);
  const [currentPage, setPage] = useState(1);
  
  const handleClose = () => setShow(false);
  
  const handleSave = async () => {
    try {
      await http.patch(uri + order._id, order);
      showSuccessToast("Pedido atualizado com sucesso!");
      const data = await http.get(uri);
      setOrders(data.data);
      handleClose();
    } catch (error) {
      showErrorToast("Erro ao atualizar pedido");
    }
  };
  
  const handleEdit = (c) => {
    setOrder(c);
    setShow(true);
  }
  
  const handleDelete = async () => {
    try {
      await http.delete(uri + order._id);
      showSuccessToast("Pedido excluído com sucesso!");
      const data = await http.get(uri);
      setOrders(data.data);
      handleClose();
    } catch (error) {
      showErrorToast("Erro ao excluir pedido");
    }
  };
  
  const getPagedItems = (items) => {
    return items.filter(item => (items.indexOf(item) >= (currentPage - 1) * itemsPerPage) && (items.indexOf(item) < currentPage * itemsPerPage));
  };

  useEffect(() => {
    async function fetchData() {
      const data = await http.get(uri);
      setOrders(data.data);
    }
    fetchData();
  }, []);

  const getTableContent = (orders) => {
    return orders.map(c =>
        <tr key={c._id}>
          <td><small>{c._id}</small></td>
          <td>{new Date(c.createDate).toLocaleDateString('pt-BR')}</td>
          <td>{c.products.map(p => p.name).join(", ")}</td>
          <td><small>{c.customerId}</small></td>
          <td>
            <Badge bg={c.isFulfilled ? "success" : "warning"}>
              {c.isFulfilled ? "Entregue" : "Pendente"}
            </Badge>
          </td>
          <td>
            <Button size="sm" variant="primary" onClick={() => handleEdit(c)}>
              Editar
            </Button>
          </td>
        </tr>)
  };

  return (
      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 style={{ fontWeight: 700, color: '#1a1a1a' }}>Gerenciar Pedidos</h2>
        </div>
        
        <Card className="modern-card">
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
              <tr>
                <th>ID do Pedido</th>
                <th>Data de Criação</th>
                <th>Produtos</th>
                <th>ID do Cliente</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
              </thead>
              <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    Nenhum pedido encontrado
                  </td>
                </tr>
              ) : (
                getTableContent(getPagedItems(orders))
              )}
              </tbody>
            </Table>

            <MyPagination 
              onPageChange={setPage}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={orders.length}
            />
            
            <Button as={Link} to="/branch/manage" variant="secondary" className="mt-3">
              Voltar
            </Button>
          </Card.Body>
        </Card>

        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title style={{ fontWeight: 700 }}>Editar Pedido</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: 600, marginBottom: '12px' }}>
                  Status do Pedido
                </Form.Label>
                <Form.Select 
                  value={order.isFulfilled ? "Sim" : "Não"}
                  onChange={(e) => {
                    setOrder({...order, isFulfilled: e.currentTarget.value === "Sim"})
                  }}
                  size="lg"
                  style={{
                    padding: '12px 16px',
                    fontSize: '16px',
                  }}
                >
                  <option value="Sim">Entregue</option>
                  <option value="Não">Pendente</option>
                </Form.Select>
              </Form.Group>
              
              <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px' }}>
                <h6 style={{ fontWeight: 600, marginBottom: '12px' }}>Detalhes do Pedido</h6>
                <p className="mb-2"><strong>Data:</strong> {new Date(order.createDate).toLocaleString('pt-BR')}</p>
                <p className="mb-2"><strong>Cliente ID:</strong> <small>{order.customerId}</small></p>
                <p className="mb-0">
                  <strong>Produtos:</strong> {order.products?.map(p => `${p.name} (${p.quantity}x)`).join(", ")}
                </p>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Excluir Pedido
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Salvar Alterações
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
  );
};

export default OrderManagement;
