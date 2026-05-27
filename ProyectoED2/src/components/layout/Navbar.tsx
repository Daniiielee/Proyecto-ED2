import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '../../context/NavigationContext';

// Barra de navegación con lógica de autenticación
export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { pushPage } = useNavigation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      // En producción se debería manejar el error
      console.error('Error cerrando sesión', err);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo/Título */}
        <div className={styles.logo}>
          <Link to="/">
            <span className={styles.title}>TechStore DS</span>
          </Link>
        </div>

        {/* Enlaces de navegación */}
        <button
          className={styles.hamburger}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((s) => !s)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`${styles.navLinks} ${menuOpen ? styles.openNav : ''}`}>
          <li>
            <Link to="/" className={styles.link} onClick={() => { pushPage('Inicio'); setMenuOpen(false); }}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/products" className={styles.link} onClick={() => { pushPage('Productos'); setMenuOpen(false); }}>
              Productos
            </Link>
          </li>
          <li>
            <Link to="/top-products" className={styles.link} onClick={() => { pushPage('Top Productos'); setMenuOpen(false); }}>
              Top Productos
            </Link>
          </li>
          <li>
            <Link to="/history" className={styles.link} onClick={() => { pushPage('Historial'); setMenuOpen(false); }}>
              Historial
            </Link>
          </li>
          <li>
            <Link to="/chat" className={styles.link} onClick={() => { pushPage('Chat'); setMenuOpen(false); }}>
              Chat
            </Link>
          </li>
        </ul>

        {/* Zona de usuario */}
        <div className={styles.userArea}>
          {currentUser ? (
            <div className={styles.userInfo}>
              <span className={styles.userText}>
                Hola, <span className={styles.userName}>{currentUser.displayName || currentUser.email}</span>
              </span>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>
          ) : (
            <Link to="/login" className={styles.link}>
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
