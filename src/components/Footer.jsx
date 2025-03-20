import LanguageSwitcher from './LanguageSwitcher';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Rick and Morty App &copy; {new Date().getFullYear()}</p>
        <LanguageSwitcher />
      </div>
    </footer>
  );
};

export default Footer; 