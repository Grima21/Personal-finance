import { useState } from "react";
import styles from "./Form.module.css";
import { MESES, CATEGORIAS, TIPOS } from "./data";

export default function Form({ onAdd }) {
  const [form, setForm] = useState({
    fecha: new Date().toISOString().split("T")[0],
    tipo: "",
    categoria: "",
    monto: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.tipo || !form.categoria || !form.monto) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    onAdd({
      ...form,
      monto: parseFloat(form.monto),
      id: Date.now(),
    });

    setForm({
      fecha: new Date().toISOString().split("T")[0],
      tipo: "",
      categoria: "",
      monto: "",
      descripcion: "",
    });
  };

  return (
    <section className={styles.sectionForm}>
      <div className={styles.container}>
        <div className={styles.titleForm}>
          <h2 className={styles.title}>
            <img src="./assets/plus.png" alt="plus icon" /> Nueva Transaccion
          </h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formContainers}>
            <label htmlFor="fecha" className={styles.labelForm}>
              Fecha
            </label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
              className={styles.inputForm}
            />
          </div>
          <div className={styles.formContainers}>
            <label htmlFor="tipo" className={styles.labelForm}>
              Tipo
            </label>
            <select
              className={styles.selectForm}
              id="tipo"
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
            >
              <option value="">Selecciona un tipo</option>
              {TIPOS.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formContainers}>
            <label htmlFor="categoria" className={styles.labelForm}>
              Categoría
            </label>
            <select
              id="categoria"
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              className={styles.selectForm}
            >
              <option value="">Selecciona una categoría</option>
              {CATEGORIAS.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formContainers}>
            <label htmlFor="monto" className={styles.labelForm}>
              Monto
            </label>
            <input
              type="number"
              name="monto"
              id="monto"
              value={form.monto}
              onChange={handleChange}
              className={styles.inputForm}
              placeholder="0.00"
            />
          </div>
          <div className={styles.formContainers}>
            <label htmlFor="descripcion" className={styles.labelForm}>
              Descripción
            </label>
            <textarea
              className={styles.textForm}
              name="descripcion"
              id="descripcion"
              value={form.descripcion}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className={styles.formBtn}>
            <img src="./assets/plusWhite.png" alt="icon plus" />
            Agregar Transacción
          </button>
        </form>
      </div>
    </section>
  );
}
