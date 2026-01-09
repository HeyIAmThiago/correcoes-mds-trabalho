import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import http from "../../services/httpService";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { showSuccessToast, showErrorToast, showInfoToast } from "../../components/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus, faTrash, faUserTie, faClock } from "@fortawesome/free-solid-svg-icons";

const coachUri = process.env.REACT_APP_API_ENDPOINT + "/branch_staff/coach";
const apUri = process.env.REACT_APP_API_ENDPOINT + "/appointment";

const array = Array.from(Array(9).keys());
const customerId = localStorage.getItem("id");

const offset = 8;

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [occupiedSlots, setOccupiedSlots] = useState(array);
  const [coaches, setCoaches] = useState([]);
  const [coach, setCoach] = useState({});
  const [value, setValue] = useState(new Date());
  const [slot, setSlot] = useState(-1);

  useEffect(() => {
    async function fetchData() {
      const coaches = await http.get(coachUri);
      const appointments = await http.get(apUri + "/" + customerId);
      setCoaches(coaches.data);
      setAppointments(appointments.data);
    }
    fetchData();
  }, []);

  const handleCoachSelect = async (c) => {
    setCoach(c);
    setSlot(-1);
    const date = Math.floor(value.getTime() / 1000 / 86400);
    const coachId = c.coachId;
    setOccupiedSlots(array);
    const occupiedSlots = await http.get(apUri + "/" + date + "/" + coachId);
    setOccupiedSlots(occupiedSlots.data);
  };
  const handleCalendarSelect = async (d) => {
    setValue(d);
    setCoach({});
    setOccupiedSlots(array);
    setSlot(-1);
  };
  const handleSubmit = async () => {
    const data = {
      coachId: coach.coachId,
      date: Math.floor(value.getTime() / 1000 / 86400),
      slot,
      customerId,
    };
    try {
      await http.post(apUri, data);
      showSuccessToast("Agendamento realizado com sucesso!");
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error("Error creating appointment:", error);
      showErrorToast("Erro ao criar agendamento. Tente novamente.");
    }
  };
  const handleDelete = async (a) => {
    try {
      await http.delete(apUri + "/" + a._id);
      showSuccessToast("Agendamento cancelado com sucesso!");
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      showErrorToast("Erro ao cancelar agendamento. Tente novamente.");
    }
  };

  const getAppointmentContent = (a) => {
    const c = coaches.find((c) => c.coachId === a.coachId);
    const date = new Date((a.date + 0.25) * 1000 * 86400);
    const result = [];
    result[0] = (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        <FontAwesomeIcon icon={faUserTie} style={{ color: '#ff6b35' }} />
        <span><strong>Coach:</strong> {c.firstName + " " + c.lastName}</span>
      </div>
    );
    result[1] = (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        <FontAwesomeIcon icon={faCalendarPlus} style={{ color: '#ff6b35' }} />
        <span><strong>Data:</strong> {date.toString().slice(0, 15)}</span>
      </div>
    );
    result[2] = (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FontAwesomeIcon icon={faClock} style={{ color: '#ff6b35' }} />
        <span><strong>Horário:</strong> {`${a.slot + offset}:00 - ${a.slot + offset + 1}:00`}</span>
      </div>
    );
    return result;
  };

  return (
    <Container className="mt-5">
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontWeight: 700, color: '#1a1a1a' }}>
          <FontAwesomeIcon icon={faCalendarPlus} style={{ marginRight: '12px', color: '#ff6b35' }} />
          Agendamentos com Coach
        </h2>
        <p style={{ color: '#6b7280', marginTop: '8px' }}>Selecione data, coach e horário para agendar</p>
      </div>

      <Row className="g-3">
        <Col md={4}>
          <Card style={{ height: '100%' }}>
            <Card.Body>
              <h5 style={{ fontWeight: 700, color: '#1a1a1a', marginBottom: '16px' }}>📅 Data</h5>
              <Calendar
                onChange={handleCalendarSelect}
                value={value}
                locale="pt-BR"
                minDate={new Date()}
                className="modern-calendar"
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card style={{ height: '100%' }}>
            <Card.Body>
              <h5 style={{ fontWeight: 700, color: '#1a1a1a', marginBottom: '16px' }}>
                <FontAwesomeIcon icon={faUserTie} style={{ marginRight: '8px' }} />
                Coach
              </h5>
              <ListGroup>
                {coaches.length === 0 ? (
                  <p style={{ color: '#6b7280', padding: '16px', textAlign: 'center' }}>
                    Nenhum coach disponível
                  </p>
                ) : (
                  coaches.map((c) => (
                    <ListGroup.Item
                      action
                      key={c.coachId}
                      active={c === coach}
                      onClick={() => handleCoachSelect(c)}
                      style={{
                        cursor: 'pointer',
                        borderRadius: '8px',
                        marginBottom: '4px',
                        border: c === coach ? '2px solid #ff6b35' : '1px solid #e5e5e5',
                        backgroundColor: c === coach ? '#fff5f2' : 'white'
                      }}
                    >
                      {c.firstName + " " + c.lastName}
                    </ListGroup.Item>
                  ))
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card style={{ height: '100%' }}>
            <Card.Body>
              <h5 style={{ fontWeight: 700, color: '#1a1a1a', marginBottom: '16px' }}>
                <FontAwesomeIcon icon={faClock} style={{ marginRight: '8px' }} />
                Horário
              </h5>
              <ListGroup>
                {array.map((a) => (
                  <ListGroup.Item
                    action
                    key={a}
                    active={slot === a}
                    disabled={occupiedSlots.indexOf(a) >= 0}
                    onClick={() => setSlot(a)}
                    style={{
                      cursor: occupiedSlots.indexOf(a) >= 0 ? 'not-allowed' : 'pointer',
                      borderRadius: '8px',
                      marginBottom: '4px',
                      border: slot === a ? '2px solid #ff6b35' : '1px solid #e5e5e5',
                      backgroundColor: occupiedSlots.indexOf(a) >= 0 ? '#f5f5f5' : slot === a ? '#fff5f2' : 'white',
                      opacity: occupiedSlots.indexOf(a) >= 0 ? 0.5 : 1
                    }}
                  >
                    {`${a + offset}:00 - ${a + offset + 1}:00`}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="p-3">
        <Button 
          disabled={slot === -1} 
          onClick={handleSubmit}
          className="btn-primary"
          style={{ padding: '12px 24px', fontSize: '16px' }}
        >
          <FontAwesomeIcon icon={faCalendarPlus} style={{ marginRight: '8px' }} />
          Confirmar Agendamento
        </Button>
      </Row>
      
      <Card className="mt-4">
        <Card.Body>
          <h5 style={{ fontWeight: 700, color: '#1a1a1a', marginBottom: '16px' }}>
            Meus Agendamentos
          </h5>
          {appointments.length === 0 ? (
            <p style={{ color: '#6b7280', padding: '32px', textAlign: 'center' }}>
              Você ainda não tem agendamentos
            </p>
          ) : (
            appointments.map((a) => (
              <Card key={a._id} className="mb-3" style={{ border: '1px solid #e5e5e5' }}>
                <Card.Body className="d-flex flex-row justify-content-between align-items-center">
                  <div>{getAppointmentContent(a)}</div>
                  <Button 
                    variant="danger" 
                    onClick={() => handleDelete(a)}
                    style={{ minWidth: '120px' }}
                  >
                    <FontAwesomeIcon icon={faTrash} style={{ marginRight: '8px' }} />
                    Cancelar
                  </Button>
                </Card.Body>
              </Card>
            ))
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Appointments;
