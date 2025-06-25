import styles from "./Summary.module.css";
export default function Summary({ ingresos, gastos, balance }) {
  return (
    <section className={styles.summary}>
      <div className={styles.card}>
        <div className={styles.title}>
          <h3>Ingresos</h3>
          <img
            src="./assets/trending-up.svg"
            alt="Arrow trending upward representing increasing ingresos, with a positive financial tone, next to the heading Ingresos"
          />
        </div>

        <p className={styles.numberGreen}>${ingresos.toFixed(2)}</p>
      </div>
      <div className={styles.card}>
        <div className={styles.title}>
          <h3>Gastos</h3>
          <img
            src="./assets/trending-down (1).svg"
            alt="Arrow trending downward representing increasing gastos, with a cautionary financial tone, next to the heading Gastos"
          />
        </div>
        <p className={styles.numberRed}>${gastos.toFixed(2)}</p>
      </div>
      <div className={styles.card}>
        <div className={styles.title}>
          <h3>Balance</h3>
          <img
            src="./assets/dollar-sign.svg"
            alt="Dollar sign symbolizing overall balance, conveying a neutral financial summary, next to the heading Balance"
          />
        </div>
        <p className={styles.numberGreen}>${balance.toFixed(2)}</p>
      </div>
    </section>
  );
}
