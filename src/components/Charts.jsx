// Charts.jsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import styles from "./Charts.module.css";
// import React from "react";

export default function Charts({ dataMensual, dataCategoria }) {
  const colores = [
    "#16a34a",
    "#dc2626",
    "#f59e0b",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#6b7280",
  ];

  return (
    <section className={styles.chartsSection}>
      <div className={styles.card}>
        <h3 className={styles.title}>Ingresos vs Gastos</h3>
        {dataMensual.length > 0 && (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dataMensual}>
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ingreso" fill="#16a34a" />
              <Bar dataKey="gasto" fill="#dc2626" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className={styles.card}>
        <h3 className={styles.title}>Gastos por Categoría</h3>
        {dataCategoria.length > 0 && (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dataCategoria}
                dataKey="gasto"
                nameKey="categoria"
                innerRadius={60}
                outerRadius={100}
                label
              >
                {dataCategoria.map((_, i) => (
                  <Cell key={i} fill={colores[i % colores.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
