import React, { useEffect, useState } from "react";
import {
  Form,
  Container,
  Card,
  Col,
  Row,
  Button,
  Modal,
  FloatingLabel,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faGraduationCap,
  faBoxOpen,
  faEdit,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import http from "../../services/httpService";
import { showSuccessToast, showErrorToast } from "../../components/Toast";
import "../../css/manager.css";

const uri = process.env.REACT_APP_API_ENDPOINT + "/product/";

const empty = {
  InStock: 0,
  price: 0,
  name: "",
  description: "",
  image: "",
  isCourse: false,
  isMeal: false,
  isGoods: true,
  startTime: "",
  endTime: "",
  courseCoachId: "",
  allergies: [],
  calories: 0,
};

const Product = () => {
  const [selectedType, setSelectedType] = useState("goods");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState(empty);
  const [adding, setAdding] = useState(false);
  
  const handleClose = () => {
    setShow(false);
    setProduct(empty);
  };

  const handleSave = async () => {
    try {
      if (adding) {
        await http.post(uri, product);
        showSuccessToast("Produto cadastrado com sucesso!");
      } else {
        await http.put(uri + product._id, product);
        showSuccessToast("Produto atualizado com sucesso!");
      }
      const data = await http.get(uri);
      setAllProducts(data.data);
      setProducts(data.data);
      handleClose();
    } catch (error) {
      showErrorToast("Erro ao salvar produto");
    }
  };

  const handleEdit = (p) => {
    if (p.isCourse) setSelectedType("course");
    else if (p.isMeal) setSelectedType("meal");
    else setSelectedType("goods");
    setAdding(false);
    setProduct(p);
    setShow(true);
  };

  const handleAdd = () => {
    setAdding(true);
    setProduct(empty);
    setSelectedType("goods");
    setShow(true);
  };

  const handleDelete = async () => {
    try {
      await http.delete(uri + product._id);
      showSuccessToast("Produto excluído com sucesso!");
      const data = await http.get(uri);
      setAllProducts(data.data);
      setProducts(data.data);
      handleClose();
    } catch (error) {
      showErrorToast("Erro ao excluir produto");
    }
  };

  const handleSelectionChange = (e) => {
    const value = e.currentTarget.value;
    setSelectedType(value);
    switch (value) {
      case "meal":
        setProduct({
          ...product,
          isMeal: true,
          isCourse: false,
          isGoods: false,
        });
        break;
      case "goods":
        setProduct({
          ...product,
          isMeal: false,
          isCourse: false,
          isGoods: true,
        });
        break;
      case "course":
        setProduct({
          ...product,
          isMeal: false,
          isCourse: true,
          isGoods: false,
        });
        break;
    }
  };

  useEffect(() => {
    async function fetchData() {
      const data = await http.get(uri);
      setProducts(data.data);
      setAllProducts(data.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = allProducts;
    
    // Filtro por tipo
    if (filterType !== "all") {
      filtered = filtered.filter((p) => {
        if (filterType === "course") return p.isCourse;
        if (filterType === "meal") return p.isMeal;
        if (filterType === "goods") return p.isGoods;
        return true;
      });
    }
    
    // Filtro por busca
    if (searchTerm !== "") {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setProducts(filtered);
  }, [filterType, searchTerm, allProducts]);

  const getProductIcon = (p) => {
    if (p.isCourse) return <FontAwesomeIcon icon={faGraduationCap} />;
    if (p.isMeal) return <FontAwesomeIcon icon={faUtensils} />;
    return <FontAwesomeIcon icon={faBoxOpen} />;
  };

  const getProductType = (p) => {
    if (p.isCourse) return "Curso";
    if (p.isMeal) return "Refeição";
    return "Produto";
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ fontWeight: 700, color: '#1a1a1a' }}>Gerenciar Produtos</h2>
        <Button variant="success" onClick={handleAdd}>
          <FontAwesomeIcon icon={faPlus} /> Adicionar Produto
        </Button>
      </div>

      <Row className="mb-4">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="🔍 Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '12px 20px',
              fontSize: '16px',
              borderRadius: '8px',
            }}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              padding: '12px 20px',
              fontSize: '16px',
              borderRadius: '8px',
            }}
          >
            <option value="all">Todos os Tipos</option>
            <option value="goods">Produtos</option>
            <option value="meal">Refeições</option>
            <option value="course">Cursos</option>
          </Form.Select>
        </Col>
      </Row>

      <Row>
        {products.length === 0 ? (
          <Col>
            <Card className="text-center py-5">
              <Card.Body>
                <p className="text-muted">Nenhum produto encontrado</p>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          products.map((p) => (
            <Col md={6} lg={4} key={p._id} className="mb-4">
              <Card
                style={{
                  borderRadius: '12px',
                  border: '1px solid #e0e0e0',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                className="h-100 hover-card"
              >
                <div
                  style={{
                    height: '200px',
                    overflow: 'hidden',
                    borderTopLeftRadius: '12px',
                    borderTopRightRadius: '12px',
                    background: '#f5f5f5',
                  }}
                >
                  <img
                    src={p.image || '/gym-logo.svg'}
                    alt={p.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Badge bg={p.isCourse ? "primary" : p.isMeal ? "warning" : "success"}>
                      {getProductIcon(p)} {getProductType(p)}
                    </Badge>
                    <Badge bg={p.InStock > 0 ? "success" : "danger"}>
                      {p.InStock > 0 ? `${p.InStock} em estoque` : 'Esgotado'}
                    </Badge>
                  </div>
                  <h5 style={{ fontWeight: 700, marginBottom: '8px' }}>{p.name}</h5>
                  <p className="text-muted" style={{ fontSize: '14px', marginBottom: '12px' }}>
                    {p.description || 'Produto disponível na academia'}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 style={{ color: '#2563eb', fontWeight: 700, margin: 0 }}>
                      R$ {Number(p.price).toFixed(2)}
                    </h4>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleEdit(p)}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Editar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      <div className="mt-4">
        <Button as={Link} to="/branch/manage" variant="secondary">
          Voltar
        </Button>
      </div>

      {/* Modal de Edição/Criação */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: 700 }}>
            {adding ? "Adicionar Produto" : "Editar Produto"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <FloatingLabel label="Nome do Produto">
                <Form.Control
                  type="text"
                  placeholder=" "
                  value={product.name}
                  onChange={(e) => setProduct({ ...product, name: e.target.value })}
                  style={{ padding: '20px 12px' }}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel label="Descrição">
                <Form.Control
                  as="textarea"
                  placeholder=" "
                  value={product.description || ""}
                  onChange={(e) => setProduct({ ...product, description: e.target.value })}
                  style={{ padding: '20px 12px', height: '80px' }}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel label="URL da Imagem">
                <Form.Control
                  type="text"
                  placeholder=" "
                  value={product.image || ""}
                  onChange={(e) => setProduct({ ...product, image: e.target.value })}
                  style={{ padding: '20px 12px' }}
                />
              </FloatingLabel>
              <Form.Text className="text-muted">
                Ex: /energy-drink.jpeg ou https://exemplo.com/imagem.jpg
              </Form.Text>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Preço (R$)">
                    <Form.Control
                      type="number"
                      step="0.01"
                      placeholder=" "
                      value={product.price}
                      onChange={(e) => setProduct({ ...product, price: e.target.value })}
                      style={{ padding: '20px 12px' }}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Quantidade em Estoque">
                    <Form.Control
                      type="number"
                      placeholder=" "
                      value={product.InStock}
                      onChange={(e) => setProduct({ ...product, InStock: e.target.value })}
                      style={{ padding: '20px 12px' }}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: 600, marginBottom: '12px' }}>
                Tipo de Produto
              </Form.Label>
              <Form.Select
                value={selectedType}
                onChange={handleSelectionChange}
                size="lg"
                style={{
                  padding: '12px 16px',
                  fontSize: '16px',
                }}
              >
                <option value="goods">Produto</option>
                <option value="meal">Refeição</option>
                <option value="course">Curso</option>
              </Form.Select>
            </Form.Group>

            {/* Campos específicos para Cursos */}
            {selectedType === "course" && (
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginTop: '16px' }}>
                <h6 style={{ fontWeight: 600, marginBottom: '16px' }}>Detalhes do Curso</h6>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <FloatingLabel label="Horário de Início">
                        <Form.Control
                          type="text"
                          placeholder=" "
                          value={product.startTime}
                          onChange={(e) => setProduct({ ...product, startTime: e.target.value })}
                          style={{ padding: '20px 12px' }}
                        />
                      </FloatingLabel>
                      <Form.Text>Ex: 08:00</Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <FloatingLabel label="Horário de Término">
                        <Form.Control
                          type="text"
                          placeholder=" "
                          value={product.endTime}
                          onChange={(e) => setProduct({ ...product, endTime: e.target.value })}
                          style={{ padding: '20px 12px' }}
                        />
                      </FloatingLabel>
                      <Form.Text>Ex: 09:00</Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <FloatingLabel label="ID do Coach">
                    <Form.Control
                      type="text"
                      placeholder=" "
                      value={product.courseCoachId}
                      onChange={(e) => setProduct({ ...product, courseCoachId: e.target.value })}
                      style={{ padding: '20px 12px' }}
                    />
                  </FloatingLabel>
                  <Form.Text>ID do coach responsável pelo curso</Form.Text>
                </Form.Group>
              </div>
            )}

            {/* Campos específicos para Refeições */}
            {selectedType === "meal" && (
              <div style={{ background: '#fff3cd', padding: '20px', borderRadius: '8px', marginTop: '16px' }}>
                <h6 style={{ fontWeight: 600, marginBottom: '16px' }}>Detalhes da Refeição</h6>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Calorias">
                    <Form.Control
                      type="number"
                      placeholder=" "
                      value={product.calories}
                      onChange={(e) => setProduct({ ...product, calories: e.target.value })}
                      style={{ padding: '20px 12px' }}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Alergênicos (separados por vírgula)">
                    <Form.Control
                      type="text"
                      placeholder=" "
                      value={Array.isArray(product.allergies) ? product.allergies.join(", ") : ""}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          allergies: e.target.value.split(",").map(a => a.trim()),
                        })
                      }
                      style={{ padding: '20px 12px' }}
                    />
                  </FloatingLabel>
                  <Form.Text>Ex: Glúten, Lactose, Amendoim</Form.Text>
                </Form.Group>
              </div>
            )}
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

      <style>{`
        .hover-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }
      `}</style>
    </Container>
  );
};

export default Product;
