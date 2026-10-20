function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <span className="footer-logo">MARÉ</span>

        <p>
          © {new Date().getFullYear()} MARÉ —
          Desenvolvido por Marcela Souza Bastos.
        </p>
      </div>
    </footer>
  );
}

export default Footer;