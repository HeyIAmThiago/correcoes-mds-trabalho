import React, { useEffect, useState } from 'react';
import { Table, Container, Button, Modal, Form, FloatingLabel, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import http from "../../services/httpService";
import { showSuccessToast, showErrorToast } from "../../components/Toast";
import MyPagination from "../../utils/pagination";
import "../../css/manager.css";

const empty = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    gender: "",
    emergencyContact: {
        name: "",
        phoneNumber: ""
    }
}
const uri = process.env.REACT_APP_API_ENDPOINT + "/customer/";
const itemsPerPage = 10;

const Customer = () => {
    const [customers, setCustomers] = useState([]);
    const [show, setShow] = useState(false);
    const [customer, setCustomer] = useState(empty);
    const [adding, setAdding] = useState(false);
    const [currentPage, setPage] = useState(1);
    
    const handleClose = () => setShow(false);
    
    const handleSave = async () => {
        try {
            if (adding) {
                await http.post(uri, customer);
                showSuccessToast("Cliente cadastrado com sucesso!");
            } else {
                await http.put(uri + customer._id, customer);
                showSuccessToast("Cliente atualizado com sucesso!");
            }
            const data = await http.get(uri);
            setCustomers(data.data);
            handleClose();
        } catch (error) {
            showErrorToast("Erro ao salvar cliente");
        }
    };
    
    const handleEdit = (c) => {
        setAdding(false);
        setCustomer(c);
        setShow(true);
    }
    
    const handleAdd = () => {
        setAdding(true);
        setCustomer(empty);
        setShow(true);
    };
    
    const handleDelete = async () => {
        try {
            await http.delete(uri + customer._id);
            showSuccessToast("Cliente excluído com sucesso!");
            const data = await http.get(uri);
            setCustomers(data.data);
            handleClose();
        } catch (error) {
            showErrorToast("Erro ao excluir cliente");
        }
    };
    
    const getPagedItems = (items) => {
        return items.filter(item => (items.indexOf(item) >= (currentPage - 1) * itemsPerPage) && (items.indexOf(item) < currentPage * itemsPerPage));
    };

    useEffect(() => {
        async function fetchData() {
            const data = await http.get(uri);
            setCustomers(data.data);
        }
        fetchData();
    }, []);

    const getTableContent = (customers) => {
        return customers.map(c =>
            <tr key={c._id}>
                <td><small>{c._id}</small></td>
                <td>{c.firstName}</td>
                <td>{c.lastName}</td>
                <td>
                    <Badge bg={c.gender === 'Male' ? 'primary' : c.gender === 'Female' ? 'danger' : 'secondary'}>
                        {c.gender === 'Male' ? 'Masculino' : c.gender === 'Female' ? 'Feminino' : 'Outro'}
                    </Badge>
                </td>
                <td>{c.phoneNumber}</td>
                <td>{c.email}</td>
                <td>{c.emergencyContact?.name || '-'}</td>
                <td>{c.emergencyContact?.phoneNumber || '-'}</td>
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
                <h2 style={{ fontWeight: 700, color: '#1a1a1a' }}>Gerenciar Clientes</h2>
                <Button variant="success" onClick={handleAdd}>
                    + Adicionar Cliente
                </Button>
            </div>
            
            <Card className="modern-card">
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Sobrenome</th>
                            <th>Gênero</th>
                            <th>Telefone</th>
                            <th>Email</th>
                            <th>Contato de Emergência</th>
                            <th>Tel. Emergência</th>
                            <th>Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {customers.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="text-center text-muted">
                                    Nenhum cliente encontrado
                                </td>
                            </tr>
                        ) : (
                            getTableContent(getPagedItems(customers))
                        )}
                        </tbody>
                    </Table>

                    <MyPagination 
                        totalItems={customers.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={setPage} 
                    />

                    <Button as={Link} to="/branch/manage" variant="secondary" className="mt-3">
                        Voltar
                    </Button>
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontWeight: 700 }}>
                        {adding ? "Adicionar Cliente" : "Editar Cliente"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <FloatingLabel label="Nome">
                                <Form.Control 
                                    type="text"
                                    placeholder=" "
                                    value={customer.firstName}
                                    onChange={(e) => {setCustomer({...customer, firstName: e.currentTarget.value})}}
                                    style={{ padding: '20px 12px' }}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <FloatingLabel label="Sobrenome">
                                <Form.Control 
                                    type="text"
                                    placeholder=" "
                                    value={customer.lastName}
                                    onChange={(e) => {setCustomer({...customer, lastName: e.currentTarget.value})}}
                                    style={{ padding: '20px 12px' }}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ fontWeight: 600, marginBottom: '12px' }}>
                                Gênero
                            </Form.Label>
                            <Form.Select 
                                value={customer.gender}
                                onChange={(e) => {setCustomer({...customer, gender: e.currentTarget.value})}}
                                size="lg"
                                style={{
                                    padding: '12px 16px',
                                    fontSize: '16px',
                                }}
                            >
                                <option value="">Selecione</option>
                                <option value="Male">Masculino</option>
                                <option value="Female">Feminino</option>
                                <option value="Other">Outro</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <FloatingLabel label="Telefone">
                                <Form.Control 
                                    type="text"
                                    placeholder=" "
                                    value={customer.phoneNumber}
                                    onChange={(e) => {setCustomer({...customer, phoneNumber: e.currentTarget.value})}}
                                    style={{ padding: '20px 12px' }}
                                />
                            </FloatingLabel>
                            <Form.Text className="text-muted">
                                Ex: (11) 98765-4321
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <FloatingLabel label="Email">
                                <Form.Control 
                                    type="email"
                                    placeholder=" "
                                    value={customer.email}
                                    onChange={(e) => {setCustomer({...customer, email: e.currentTarget.value})}}
                                    style={{ padding: '20px 12px' }}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        {adding && (
                            <Form.Group className="mb-3">
                                <FloatingLabel label="Senha">
                                    <Form.Control 
                                        type="password"
                                        placeholder=" "
                                        value={customer.password}
                                        onChange={(e) => {
                                            setCustomer({...customer, password: e.currentTarget.value})
                                        }}
                                        style={{ padding: '20px 12px' }}
                                    />
                                </FloatingLabel>
                                <Form.Text className="text-muted">
                                    Mínimo 6 caracteres
                                </Form.Text>
                            </Form.Group>
                        )}
                        
                        <hr className="my-4" />
                        <h6 style={{ fontWeight: 600, marginBottom: '16px' }}>Contato de Emergência</h6>
                        
                        <Form.Group className="mb-3">
                            <FloatingLabel label="Nome do Contato">
                                <Form.Control 
                                    type="text"
                                    placeholder=" "
                                    value={customer.emergencyContact?.name || ""}
                                    onChange={(e) => {setCustomer({...customer, emergencyContact: {...customer.emergencyContact, name: e.currentTarget.value}})}}
                                    style={{ padding: '20px 12px' }}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <FloatingLabel label="Telefone do Contato">
                                <Form.Control 
                                    type="text"
                                    placeholder=" "
                                    value={customer.emergencyContact?.phoneNumber || ""}
                                    onChange={(e) => {setCustomer({...customer, emergencyContact: {...customer.emergencyContact, phoneNumber: e.currentTarget.value}})}}
                                    style={{ padding: '20px 12px' }}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    {!adding && (
                        <Button variant="danger" onClick={handleDelete}>
                            Excluir
                        </Button>
                    )}
                    <Button variant="primary" onClick={handleSave}>
                        {adding ? "Cadastrar" : "Salvar Alterações"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Customer;
