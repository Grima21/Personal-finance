import { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Summary from "./components/Summary";
import Form from "./components/Form";
import Charts from "./components/Charts";
import Transactions from "./components/Transactions";
import styles from "./App.module.css";
import { MESES, CATEGORIAS } from "./components/data";

function App() {
  const [transacciones, setTransacciones] = useState([]);
  const [mesSeleccionado, setMesSeleccionado] = useState(MESES[0]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  // 🔄 Obtener transacciones al iniciar
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "transacciones"),
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransacciones(docs);
      }
    );

    // Cleanup
    return () => unsubscribe();
  }, []);

  // 🔄 Guardar transacción en Firestore
  const handleAddTransaccion = async (nueva) => {
    try {
      await addDoc(collection(db, "transacciones"), nueva);
    } catch (error) {
      console.error("Error al guardar en Firebase:", error);
    }
  };

  const transaccionesFiltradas = transacciones.filter((t) => {
    const fecha = new Date(t.fecha);
    const coincideMes = fecha.getMonth() === MESES.indexOf(mesSeleccionado);
    const coincideCategoria =
      categoriaSeleccionada === "Todas" ||
      t.categoria === categoriaSeleccionada;
    return coincideMes && coincideCategoria;
  });

  const ingresos = transaccionesFiltradas
    .filter((t) => t.tipo === "Ingreso")
    .reduce((acc, curr) => acc + curr.monto, 0);

  const gastos = transaccionesFiltradas
    .filter((t) => t.tipo === "Gasto")
    .reduce((acc, curr) => acc + curr.monto, 0);

  const balance = ingresos - gastos;

  const meses = MESES;

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

  const dataCategoria = transaccionesFiltradas
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
          <Hero
            mesSeleccionado={mesSeleccionado}
            setMesSeleccionado={setMesSeleccionado}
            categoriaSeleccionada={categoriaSeleccionada}
            setCategoriaSeleccionada={setCategoriaSeleccionada}
          />
          <Summary ingresos={ingresos} gastos={gastos} balance={balance} />
          <Charts dataMensual={dataMensual} dataCategoria={dataCategoria} />
          <Transactions transacciones={transaccionesFiltradas} />
        </div>
        <aside className={styles.dashboardRight}>
          <Form onAdd={handleAddTransaccion} />
        </aside>
      </main>
    </>
  );
}

export default App;
