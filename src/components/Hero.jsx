import styles from "./Hero.module.css";
import { useState } from "react";
import { MESES, CATEGORIAS, TIPOS } from "./data";

export default function Hero() {
  // Importa los estilos si no lo has hecho aún

  const [mesSeleccionado, setMesSeleccionado] = useState(MESES[0]);
  const [categoriaSeleccionado, setCategoriaSeleccionado] = useState(
    CATEGORIAS[0]
  );
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.itemHero}>
          <img src="./assets/funnel.svg" alt="filter icon" />
          <span>Filtros</span>
        </div>
        <div className={styles.itemHero}>
          <label className={styles.labelHero} htmlFor="mes-select">
            Mes:
          </label>
          <select
            id="mes-select"
            className={styles.selectHero}
            value={mesSeleccionado}
            onChange={(e) => setMesSeleccionado(e.target.value)}
          >
            {MESES.map((mes) => (
              <option key={mes} value={mes}>
                {mes}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.itemHero}>
          <label className={styles.labelHero} htmlFor="categoria-select">
            Categoria
          </label>
          <select
            id="categoria-select"
            className={styles.selectHero}
            value={categoriaSeleccionado}
            onChange={(e) => setCategoriaSeleccionado(e.target.value)}
          >
            {CATEGORIAS.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
