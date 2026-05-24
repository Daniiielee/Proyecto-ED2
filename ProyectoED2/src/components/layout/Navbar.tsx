import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { useAuth } from '../../hooks/useAuth';

// Barra de navegación con lógica de autenticación
export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

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
        <ul className={styles.navLinks}>
          <li>
            <Link to="/" className={styles.link}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/products" className={styles.link}>
              Productos
            </Link>
          </li>
          <li>
            <Link to="/top-products" className={styles.link}>
              Top Productos
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
