import React, { useState } from 'react';
import { Button, Form, FloatingLabel, Spinner, Container, Card } from "react-bootstrap";
import Joi from 'joi';
import http from '../../services/httpService';
import { showSuccessToast, showErrorToast } from '../../components/Toast';
import "../../css/manager.css";

const uri = process.env.REACT_APP_API_ENDPOINT + "/branch_manager";

const MangerLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({})
    const schema = Joi.object({
        username: Joi.string().required().label("Email"),
        password: Joi.string().required().label("Senha")
    })
    const handleSubmit = async () => {
        setErrors({});
        const {error, } = schema.validate({username, password}, {abortEarly: false});
        if (error) {
            const errors = {};
            for (const item of error.details)
                errors[item.path[0]] = item.message;
            setErrors(errors);
            return;
        }
        setSubmitting(true);
        try {
            const response = await http.post(uri, {username, password});
            localStorage.setItem('manager_token', response.data.token);
            showSuccessToast("Login realizado com sucesso!");
            setTimeout(() => {
                window.location.href = "/branch/manage";
            }, 1500);
        }
        catch (error) {
            console.error("Login error:", error);
            showErrorToast("Email ou senha inválidos");
            setSubmitting(false);
        }
    }
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Card className="modern-card" style={{ width: '100%', maxWidth: '450px', padding: '2rem' }}>
                <h2 className="mb-4 text-center" style={{ fontWeight: 700, color: '#1a1a1a' }}>
                    Login do Gerente
                </h2>
                <Form>
                    <FloatingLabel label="Email" className="mb-4">
                        <Form.Control
                            type="email"
                            placeholder="email@exemplo.com"
                            value={username}
                            onChange={e => setUsername(e.currentTarget.value)}
                            style={errors.username ? {borderColor: "#ef4444"} : {}}
                        />
                        {errors.username && <Form.Text className="text-danger">{errors.username}</Form.Text>}
                    </FloatingLabel>
                    <FloatingLabel label="Senha" className="mb-3">
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Senha"
                            value={password}
                            onChange={e => setPassword(e.currentTarget.value)}
                            style={errors.password ? {borderColor: "#ef4444"} : {}}
                        />
                        {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
                    </FloatingLabel>
                    <Form.Group className="mb-4">
                        <Form.Check
                            type="checkbox"
                            label="Mostrar senha"
                            onChange={() => setShowPassword(!showPassword)}
                        />
                    </Form.Group>
                    <Button
                        className="w-100"
                        size="lg"
                        onClick={handleSubmit}
                        disabled={submitting}
                    >
                        {submitting ? "Entrando..." : "Entrar"}
                        {submitting && <Spinner as="span" size="sm" animation="border" style={{marginLeft: "8px"}}/>}
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default MangerLogin;