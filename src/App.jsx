// App.jsx
import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Summary from "./components/Summary";
import Form from "./components/Form";
import Charts from "./components/Charts";
import styles from "./App.module.css"; // Usando CSS Modules
import Transactions from "./components/Transactions";
function App() {
  const [transacciones, setTransacciones] = useState([]);

  const handleAddTransaccion = (nueva) => {
    setTransacciones((prev) => [...prev, nueva]);
  };

  const ingresos = transacciones
    .filter((t) => t.tipo === "Ingreso")
    .reduce((acc, curr) => acc + curr.monto, 0);

  const gastos = transacciones
    .filter((t) => t.tipo === "Gasto")
    .reduce((acc, curr) => acc + curr.monto, 0);

  const balance = ingresos - gastos;

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const dataMensual = meses.map((mes, index) => {
    const transaccionesMes = transacciones.filter((t) => {
      const fecha = new Date(t.fecha);
      return fecha.getMonth() === index;
    });

    const ingreso = transaccionesMes
      .filter((t) => t.tipo === "Ingreso")
      .reduce((acc, t) => acc + t.monto, 0);

    const gasto = transaccionesMes
      .filter((t) => t.tipo === "Gasto")
      .reduce((acc, t) => acc + t.monto, 0);

    return { mes, ingreso, gasto };
  });

  const dataCategoria = transacciones
    .filter((t) => t.tipo === "Gasto")
    .reduce((acc, curr) => {
      const existente = acc.find((item) => item.categoria === curr.categoria);
      if (existente) {
        existente.gasto += curr.monto;
      } else {
        acc.push({ categoria: curr.categoria, gasto: curr.monto });
      }
      return acc;
    }, []);

  return (
    <>
      <Header />
      <main className={styles.dashboardMain}>
        <div className={styles.dashboardLeft}>
          <Hero />
          <Summary ingresos={ingresos} gastos={gastos} balance={balance} />
          <Charts dataMensual={dataMensual} dataCategoria={dataCategoria} />
          <Transactions transacciones={transacciones} />
        </div>
        <aside className={styles.dashboardRight}>
          <Form onAdd={handleAddTransaccion} />
        </aside>
      </main>
    </>
  );
}

export default App;
