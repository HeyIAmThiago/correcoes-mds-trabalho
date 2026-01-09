import React from "react";

const Footer = () => {
  return (
    <footer 
      className="footer mt-5 py-4 d-flex justify-content-center align-items-center" 
      style={{
        background: 'white',
        borderTop: '1px solid #e5e5e5',
        color: '#6b7280',
        fontSize: '14px'
      }}
    >
      <div className="text-center">
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} Workout Day Gym. Todos os direitos reservados.
        </p>
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>
          Desenvolvido com 💪 para sua jornada fitness
        </p>
      </div>
    </footer>
  );
};

export default Footer;
