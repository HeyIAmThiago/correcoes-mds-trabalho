import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Index = () => {
  let navigate = useNavigate();
  return (
    <div>
      <header>
        <div className="motion">
          <h1>Bem-vindo ao Workout Day Gym!</h1>
          <h2>Pronto para construir seu corpo conosco?</h2>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="btn-1"
          >
            Entrar
          </button>
        </div>
      </header>
      <section className="services">
        <h1>Nossos serviços</h1>
        <h2>Deixe-nos ajudá-lo a alcançar seus objetivos fitness.</h2>
        <ul className="service-cards">
          <li className="service-card">
            <h3>Nossos produtos</h3>
            <FontAwesomeIcon
              icon={solid("box")}
              size="5x"
              className="service-icon"
            />
            <p>
              Temos uma ampla variedade de produtos, incluindo
              equipamentos, refeições fitness, aulas e muito mais.
            </p>
            <button
              onClick={() => {
                navigate("/shopping");
              }}
              className="btn-2"
            >
              Comprar agora
            </button>
          </li>
          <li className="service-card">
            <h3>Acompanhe seu progresso</h3>
            <FontAwesomeIcon
              icon={solid("chart-line")}
              size="5x"
              className="service-icon"
            />
            <p>Acompanhe seu progresso e planeje seus próximos passos.</p>
            <button
              onClick={() => {
                navigate("/fitnessProfiles");
              }}
              className="btn-2"
            >
              Ver meu perfil
            </button>
          </li>
          <li className="service-card">
            <h3>Tenha um treinador</h3>
            <FontAwesomeIcon
              icon={solid("calendar-alt")}
              size="5x"
              className="service-icon"
            />
            <p>
              Faça agendamentos com nossos treinadores para treinos
              seguros e eficientes.
            </p>
            <button
              className="btn-2"
              onClick={() => {
                navigate("/appointments");
              }}
            >
              Fazer agendamento
            </button>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Index;
