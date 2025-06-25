import styles from "./Transactions.module.css";

export default function Transactions({ transacciones }) {
  const recientes = [...transacciones]
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .slice(0, 5);

  return (
    <section className={styles.transacciones}>
      <h3 className={styles.title}>Transacciones Recientes</h3>
      <ul className={styles.lista}>
        {recientes.length === 0 ? (
          <p className={styles.vacio}>No hay transacciones recientes.</p>
        ) : (
          recientes.map((t) => (
            <li key={t.id} className={styles.item}>
              <div>
                <p className={styles.descripcion}>
                  {t.descripcion || "Sin descripción"}
                </p>
                <small className={styles.meta}>
                  {t.categoria} • {t.fecha}
                </small>
              </div>
              <span
                className={t.tipo === "Ingreso" ? styles.ingreso : styles.gasto}
              >
                {t.tipo === "Ingreso" ? "+" : "-"}${t.monto.toFixed(2)}
              </span>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
