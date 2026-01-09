import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const getToken = () => {
  return localStorage.getItem("token");
};

const getManagerToken = () => {
  return localStorage.getItem("manager_token");
};

const NavBar = () => {
  const isManager = getManagerToken() !== null;
  const isClient = getToken() !== null;
  
  return (
    <Navbar 
      bg="white" 
      expand="lg" 
      style={{
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        padding: '12px 0',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <Container fluid>
        <Navbar.Brand 
          href={isManager ? "/branch/manage" : "/"} 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontWeight: 700,
            fontSize: '20px',
            color: '#1a1a1a',
          }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
            padding: '8px 12px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
          }}>
            <FontAwesomeIcon icon={solid("dumbbell")} size="lg" color="white" />
          </div>
          <span>Workout Day Gym</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ gap: '8px' }}>
            {/* Menu do Manager */}
            {isManager && (
              <Nav.Item>
                <Nav.Link 
                  href="/branch/manage" 
                  style={{
                    fontWeight: 500,
                    fontSize: '15px',
                    color: '#4a4a4a',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f5f5f5';
                    e.target.style.color = '#1a1a1a';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#4a4a4a';
                  }}
                >
                  <FontAwesomeIcon icon={solid("chart-line")} />
                  <span>Painel de Gerenciamento</span>
                </Nav.Link>
              </Nav.Item>
            )}
            
            {/* Menu do Cliente */}
            {!isManager && (
              <Nav.Item>
              <Nav.Link 
                href="/shopping" 
                style={{
                  fontWeight: 500,
                  fontSize: '15px',
                  color: '#4a4a4a',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#f5f5f5';
                  e.target.style.color = '#1a1a1a';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#4a4a4a';
                }}
              >
                <FontAwesomeIcon icon={solid("shopping-bag")} />
                <span>Produtos</span>
              </Nav.Link>
            </Nav.Item>
            )}
            {!isManager && isClient && (
              <Nav.Item>
                <Nav.Link 
                  href="/orders"
                  style={{
                    fontWeight: 500,
                    fontSize: '15px',
                    color: '#4a4a4a',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f5f5f5';
                    e.target.style.color = '#1a1a1a';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#4a4a4a';
                  }}
                >
                  <FontAwesomeIcon icon={solid("box")} />
                  <span>Meus Pedidos</span>
              </Nav.Link>
            </Nav.Item>
            )}
            {!isManager && isClient && (
              <Nav.Item>
                <Nav.Link 
                  href="/fitnessProfiles"
                  style={{
                    fontWeight: 500,
                    fontSize: '15px',
                    color: '#4a4a4a',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f5f5f5';
                    e.target.style.color = '#1a1a1a';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#4a4a4a';
                  }}
                >
                  <FontAwesomeIcon icon={solid("user")} />
                  <span>Meu Perfil</span>
              </Nav.Link>
            </Nav.Item>
            )}
            {!isManager && isClient && (
              <Nav.Item>
                <Nav.Link 
                  href="/appointments"
                  style={{
                    fontWeight: 500,
                    fontSize: '15px',
                    color: '#4a4a4a',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f5f5f5';
                    e.target.style.color = '#1a1a1a';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#4a4a4a';
                  }}
                >
                  <FontAwesomeIcon icon={solid("calendar-check")} />
                  <span>Meus Agendamentos</span>
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
          <Nav style={{ gap: '8px' }}>
            {/* Logout do Manager */}
            {isManager && (
              <Nav.Item>
                <Nav.Link
                  href="/branch"
                  onClick={() => {
                    localStorage.removeItem("manager_token");
                  }}
                  style={{
                    fontWeight: 600,
                    fontSize: '15px',
                    color: 'white',
                    background: '#ef4444',
                    padding: '8px 20px',
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#dc2626';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#ef4444';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Sair
                </Nav.Link>
              </Nav.Item>
            )}
            
            {/* Logout do Cliente */}
            {!isManager && isClient && (
              <Nav.Item>
                <Nav.Link
                  href="/login"
                  onClick={() => localStorage.removeItem("token")}
                  style={{
                    fontWeight: 600,
                    fontSize: '15px',
                    color: 'white',
                    background: '#ef4444',
                    padding: '8px 20px',
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#dc2626';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#ef4444';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Sair
                </Nav.Link>
              </Nav.Item>
            )}
            
            {/* Botões de Login/Cadastro (só aparecem se não for manager e não for cliente) */}
            {!isManager && !isClient && (
              <>
                <Nav.Item>
                  <Nav.Link 
                    href="/register"
                    style={{
                      fontWeight: 500,
                      fontSize: '15px',
                      color: '#4a4a4a',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#f5f5f5';
                      e.target.style.color = '#1a1a1a';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#4a4a4a';
                    }}
                  >
                    Cadastrar
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    href="/login"
                    style={{
                      fontWeight: 600,
                      fontSize: '15px',
                      color: 'white',
                      background: '#ff6b35',
                      padding: '8px 20px',
                      borderRadius: '10px',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#e55a2b';
                      e.target.style.transform = 'translateY(-1px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(255, 107, 53, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#ff6b35';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    Entrar
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
