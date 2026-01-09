import React, { useEffect, useState } from 'react';
import { Button, Card, Container, FloatingLabel, Form, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import http from "../../services/httpService";
import { showSuccessToast, showErrorToast } from "../../components/Toast";
import MyPagination from "../../utils/pagination";
import "../../css/manager.css";

const empty = {
    firstName: "",
    lastName: "",
    ssn: "",
    email: "",
    address: "",
    phone: "",
    salary: 0,
    isCoach: false
};

const uri = process.env.REACT_APP_API_ENDPOINT + "/branch_staff/";
const itemsPerPage = 10;

const Staff = () => {
    const [allStaff, setAllStaff] = useState([]);
    const [show, setShow] = useState(false);
    const [staff, setStaff] = useState(empty);
    const [adding, setAdding] = useState(true);
    const [currentPage, setPage] = useState(1);
    
    const handleClose = () => setShow(false);
    
    const handleSave = async () => {
        try {
            if (adding) {
                await http.post(uri, staff);
                showSuccessToast("Funcionário cadastrado com sucesso!");
            } else {
                await http.put(uri + staff._id, staff);
                showSuccessToast("Funcionário atualizado com sucesso!");
            }
            const data = await http.get(uri);
            setAllStaff(data.data);
            handleClose();
        } catch (error) {
            showErrorToast("Erro ao salvar funcionário");
        }
    };
    
    const handleEdit = (c) => {
        setAdding(false);
        setStaff(c);
        setShow(true);
    }
    
    const handleAdd = () => {
        setAdding(true);
        setStaff(empty);
        setShow(true);
    };
    
    const handleDelete = async () => {
        try {
            await http.delete(uri + staff._id);
            showSuccessToast("Funcionário excluído com sucesso!");
            const data = await http.get(uri);
            setAllStaff(data.data);
            handleClose();
        } catch (error) {
            showErrorToast("Erro ao excluir funcionário");
        }
    };
    
    const getPagedItems = (items) => {
        return items.filter(item => (items.indexOf(item) >= (currentPage - 1) * itemsPerPage) && (items.indexOf(item) < currentPage * itemsPerPage));
    };

    useEffect(() => {
        async function fetchData() {
            const data = await http.get(uri);
            setAllStaff(data.data);
        }
        fetchData();
    }, []);

    const getTableContent = (allStaff) => {
        return allStaff.map(c =>
            <tr key={c.ssn}>
                <td>{c._id}</td>
                <td>{c.firstName}</td>
                <td>{c.lastName}</td>
                <td>{c.ssn}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.address}</td>
                <td>R$ {Number(c.salary).toFixed(2)}</td>
                <td>
                    <span className={`badge ${c.isCoach ? 'bg-success' : 'bg-secondary'}`}>
                        {c.isCoach ? "Sim" : "Não"}
                    </span>
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
                <h2 style={{ fontWeight: 700, color: '#1a1a1a' }}>Gerenciar Equipe</h2>
                <Button variant="success" onClick={handleAdd}>
                    + Adicionar Funcionário
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
                            <th>CPF</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Endereço</th>
                            <th>Salário</th>
                            <th>É Coach?</th>
                            <th>Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {getTableContent(getPagedItems(allStaff))}
                        </tbody>
                    </Table>

                    <MyPagination  
                        currentPage={currentPage} 
                        onPageChange={setPage} 
                        itemsPerPage={itemsPerPage} 
                        totalItems={allStaff.length}
                    />

                    <Button as={Link} to="/branch/manage" variant="secondary" className="mt-3">
                        Voltar
                    </Button>
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontWeight: 700 }}>
                        {adding ? "Adicionar Funcionário" : "Editar Funcionário"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <FloatingLabel label="Nome">
                                <Form.Control 
                                    type="text"
                                    placeholder=" "
                                    value={staff.firstName}
                                    onChange={(e) => {setStaff({...staff, firstName: e.currentTarget.value})}}
                                    style={{ padding: '20px 12px' }}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <FloatingLabel label="Sobrenome">
                                <Form.Control 
                                    type="text"
                                    placeholder=" "
                                    value={staff.lastName}
                                    onChange={(e) => {setStaff({...staff, lastName: e.currentTarget.value})}}
                                    style={{ padding: '20px 12px' }}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <FloatingLabel label="CPF">
                                <Form.Control 
                                    type="text"
                                    placeholder=" "
                                    value={staff.ssn}
                                    onChange={(e) => {setStaff({...staff, ssn: e.currentTarget.value})}}
                                    style={{ padding: '20px 12px' }}
                                />
                            </FloatingLabel>
                            <Form.Text className="text-muted">
                                Ex: 000.000.000-00
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <FloatingLabel label="Email">
                                <Form.Control 
                                    type="email"
                                    placeholder=" "
                                    value={staff.email}
                                    onChange={(e) => {setStaff({...staff, email: e.currentTarget.value})}}
                                    style={{ padding: '20px 12px' }}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <FloatingLabel label="Telefone">
                                <Form.Control 
                                    type="text"
                                    placeholder=" "
                                    value={staff.phone}
                                    onChange={(e) => {setStaff({...staff, phone: e.currentTarget.value})}}
                                    style={{ padding: '20px 12px' }}
                                />
                            </FloatingLabel>
                            <Form.Text className="text-muted">
                                Ex: (11) 98765-4321
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <FloatingLabel label="Endereço">
                                <Form.Control 
                                    type="text"
                                    placeholder=" "
                                    value={staff.address}
                                    onChange={(e) => {setStaff({...staff, address: e.currentTarget.value})}}
                                    style={{ padding: '20px 12px' }}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <FloatingLabel label="Salário (R$)">
                                <Form.Control 
                                    type="number"
                                    step="0.01"
                                    placeholder=" "
                                    value={staff.salary}
                                    onChange={(e) => {setStaff({...staff, salary: e.currentTarget.value})}}
                                    style={{ padding: '20px 12px' }}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ fontWeight: 600, marginBottom: '12px' }}>
                                É Coach?
                            </Form.Label>
                            <Form.Select 
                                value={staff.isCoach ? "Sim" : "Não"}
                                onChange={(e) => {setStaff({...staff, isCoach: e.currentTarget.value === "Sim"})}}
                                size="lg"
                                style={{
                                    padding: '12px 16px',
                                    fontSize: '16px',
                                }}
                            >
                                <option>Selecione</option>
                                <option value="Sim">É um coach</option>
                                <option value="Não">Não é coach</option>
                            </Form.Select>
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

export default Staff;
