import styles from "./Header.module.css";

export default function Headder() {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img
            className={styles.imgLogo}
            src="./assets/wallet.png"
            alt="icon wallet"
          />
        </div>
        <div className={styles.titleHeader}>
          <h1>Finanzas Personales</h1>
          <p>Controla tus ingresos y gastos</p>
        </div>
      </div>
    </header>
  );
}
