import React, { useState } from 'react';
import styles from './ProductForm.module.scss';
import type { Product } from '../../types';

// Props del componente ProductForm
interface ProductFormProps {
  onClose: () => void;
  onSubmit: (product: Omit<Product, 'id'>) => void;
}

// Formulario modal para agregar productos
export const ProductForm: React.FC<ProductFormProps> = ({ onClose, onSubmit }) => {
  // Estados controlados para los campos del formulario
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>('Laptops');
  const [description, setDescription] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [stock, setStock] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [errors, setErrors] = useState<string[]>([]);

  // Validación básica del formulario
  const validate = (): boolean => {
    const newErrors: string[] = [];

    if (!name.trim()) {
      newErrors.push('El nombre del producto es requerido');
    }

    if (price <= 0) {
      newErrors.push('El precio debe ser mayor a 0');
    }

    if (!description.trim()) {
      newErrors.push('La descripción es requerida');
    }

    if (!imageUrl.trim()) {
      newErrors.push('La URL de imagen es requerida');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Crear objeto de producto sin ID
    const newProduct: Omit<Product, 'id'> = {
      name: name.trim(),
      price,
      category,
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      stock,
      rating,
      searchCount: 0,
    };

    // Llamar función de envío y cerrar modal
    onSubmit(newProduct);
    onClose();
  };

  return (
    <>
      {/* Overlay oscuro para el modal */}
      <div className={styles.overlay} onClick={onClose} />

      {/* Contenedor del modal */}
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Agregar nuevo producto</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Mostrar errores de validación */}
        {errors.length > 0 && (
          <div className={styles.errorBox}>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Campo Nombre */}
          <div className={styles.formGroup}>
            <label htmlFor="name">Nombre del producto *</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Laptop HP Pavilion"
            />
          </div>

          {/* Campo Precio */}
          <div className={styles.formGroup}>
            <label htmlFor="price">Precio (COP) *</label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              min="0"
              step="10000"
              placeholder="0"
            />
          </div>

          {/* Campo Categoría */}
          <div className={styles.formGroup}>
            <label htmlFor="category">Categoría</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Laptops">Laptops</option>
              <option value="Smartphones">Smartphones</option>
              <option value="Accesorios">Accesorios</option>
              <option value="Audio">Audio</option>
              <option value="Gaming">Gaming</option>
              <option value="Monitores">Monitores</option>
            </select>
          </div>

          {/* Campo Descripción */}
          <div className={styles.formGroup}>
            <label htmlFor="description">Descripción *</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe el producto detalladamente"
              rows={3}
            />
          </div>

          {/* Campo URL de imagen */}
          <div className={styles.formGroup}>
            <label htmlFor="imageUrl">URL de la imagen *</label>
            <input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          {/* Campo Stock */}
          <div className={styles.formGroup}>
            <label htmlFor="stock">Stock disponible</label>
            <input
              id="stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(parseInt(e.target.value))}
              min="0"
              placeholder="0"
            />
          </div>

          {/* Campo Rating */}
          <div className={styles.formGroup}>
            <label htmlFor="rating">Calificación (0-5)</label>
            <input
              id="rating"
              type="number"
              value={rating}
              onChange={(e) => setRating(Math.min(5, Math.max(0, parseFloat(e.target.value))))}
              min="0"
              max="5"
              step="0.1"
              placeholder="0"
            />
          </div>

          {/* Botones de acción */}
          <div className={styles.buttonGroup}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={styles.submitBtn}>
              Guardar producto
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductForm;
