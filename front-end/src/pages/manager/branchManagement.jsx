import React from 'react';
import { Col, Row, Card, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPeopleGroup,
    faCartShopping,
    faDumbbell,
    faClipboardUser,
    faList,
    faClipboardCheck
} from "@fortawesome/free-solid-svg-icons";
import "../../css/manager.css";


const entries = [
    { name: "Customer", label: "Clientes", icon: faPeopleGroup },
    { name: "Product", label: "Produtos", icon: faCartShopping },
    { name: "Facility", label: "Instalações", icon: faDumbbell},
    { name: "Staff", label: "Equipe", icon: faClipboardUser},
    { name: "Order", label: "Pedidos", icon: faList},
    { name: "Appointment", label: "Agendamentos", icon: faClipboardCheck}
];

const getCards = () => {
    return entries.map(entry =>
        <Col key={entry.name} md={6} lg={4} className="mb-4">
            <Card
                as={Link}
                to={ `/branch/${entry.name.toLowerCase()}` }
                className="modern-card text-center"
                style={{
                    textDecoration: 'none',
                    color: "inherit",
                    padding: '2rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                }}
            >
                <FontAwesomeIcon className="py-4" icon={entry.icon} size="6x" style={{ color: '#2563eb' }}/>
                <Card.Body>
                    <Card.Title style={{ fontSize: "28px", fontWeight: 700, color: '#1a1a1a' }}>
                        { entry.label }
                    </Card.Title>
                </Card.Body>
            </Card>
        </Col>
    )
}

const BranchManagement = () => {
    return (
        <Container className="py-5">
            <h2 className="mb-5 text-center" style={{ fontWeight: 700, color: '#1a1a1a' }}>
                Painel de Gerenciamento
            </h2>
            <Row className="mb-5">
                {getCards()}
            </Row>
            <Row className="justify-content-center">
                <Col md={4}>
                    <Button
                        variant="danger"
                        size="lg"
                        className="w-100"
                        onClick={() => {
                            localStorage.removeItem("manager_token");
                            window.location.href = "/branch";
                        }}
                    >
                        Sair
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default BranchManagement;