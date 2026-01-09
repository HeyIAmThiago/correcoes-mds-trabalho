import React from "react";
import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";

const ProfileCard = ({ onSubmitUpdate, onUpdate, profile }) => {
  if (profile === null) {
    return <div></div>;
  }
  return (
    <div className="align-self-center">
      <Container className="d-flex flex-column justify-content-center">
        <div className="card align-self-center mt-4" style={{ width: "50rem" }}>
          <div className="card-body">
            <Row className="d-flex">
              <Col className="d-flex flex-column">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt="Profile avatar"
                    style={{
                      width: "15rem",
                      height: "15rem",
                      borderRadius: "50%",
                    }}
                    className="align-self-center"
                  />
                ) : (
                  <img
                    src="login.png"
                    alt="Default profile"
                    style={{ width: "15rem", height: "15rem" }}
                    className="align-self-center"
                  />
                )}
                <p className="align-self-center mt-2 mb-0" style={{ fontWeight: 600, fontSize: '18px' }}>
                  Nome: {profile.firstName} {profile.lastName}
                </p>
              </Col>
              <Col
                className="container-fluid d-flex flex-column"
                style={{ height: "100%" }}
              >
                <p><strong>Gênero:</strong> {profile.gender === 'male' ? 'Masculino' : profile.gender === 'female' ? 'Feminino' : profile.gender}</p>
                <p>
                  <strong>Peso:</strong>{" "}
                  {profile.fitnessProfile.weight !== 0
                    ? profile.fitnessProfile.weight
                    : "sem dados"}{" "}
                  kg{" "}
                </p>
                <p>
                  <strong>Altura:</strong>{" "}
                  {profile.fitnessProfile.height !== 0
                    ? profile.fitnessProfile.height
                    : "sem dados"}{" "}
                  cm
                </p>
                <p>
                  <strong>Gordura Corporal:</strong>{" "}
                  {profile.fitnessProfile.BFP !== 0
                    ? profile.fitnessProfile.BFP
                    : "sem dados"}{" "}
                  %
                </p>
                <p>
                  <strong>IMC:</strong>{" "}
                  {profile.fitnessProfile.BMI !== 0
                    ? profile.fitnessProfile.BMI.toFixed(2)
                    : "sem dados"}
                </p>
                <p style={{ color: '#6b7280', fontSize: '14px' }}>
                  <strong>Última atualização:</strong>{" "}
                  {new Date(
                    profile.fitnessProfile.lastUpdateDate
                  ).toLocaleDateString('pt-BR')}{" às "}
                  {new Date(
                    profile.fitnessProfile.lastUpdateDate
                  ).toLocaleTimeString('pt-BR')}
                </p>
                <button
                  type="button"
                  className="btn btn-primary align-self-end"
                  onClick={onUpdate}
                >
                  Atualizar Perfil
                </button>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
};

ProfileCard.propTypes = {
  onSubmitUpdate: PropTypes.func,
  onUpdate: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    avatarUrl: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    gender: PropTypes.string,
    fitnessProfile: PropTypes.shape({
      weight: PropTypes.number,
      height: PropTypes.number,
      BFP: PropTypes.number,
      BMI: PropTypes.number,
      lastUpdateDate: PropTypes.string,
    }),
  }),
};

export default ProfileCard;
