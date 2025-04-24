import React, { useState, useEffect } from 'react';
import styles from "./home.module.css";

//export default function Home() {
//    return(
//        <div>
//           <div className={styles.pending}>Pending issues assigned to you</div>            
//            <div className={styles.resolved}>Resolved issues count</div>        
//            <div className={styles.average}>Average issue resolution time</div>
//        </div>
//    )
//}

// components/home.jsx
// components/home.jsx


const MetricCard = ({ title, value, unit }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const startValue = 0;
    const endValue = value;
    let startTime;

   
  return (
    <div className={styles.metricCard}>
      <h3>{title}</h3>
      <div className={styles.metricValue}>
        {displayValue}
        {unit && <span className={styles.metricUnit}>{unit}</span>}
      </div>
    </div>
  );
};

export default function Home() {
  // Mock data - replace with real data from your API
  const [metrics] = useState({
    pending: 8,
    resolved: 24,
    average: 3.2
  });

  return(
    <div className={styles.container}>
      <MetricCard 
        title="Pending issues assigned to you" 
        value={metrics.pending} 
        className={styles.pending}
      />
      <MetricCard 
        title="Resolved issues count" 
        value={metrics.resolved}
        className={styles.resolved}
      />
      <MetricCard 
        title="Average issue resolution time" 
        value={metrics.average}
        unit="h"
        className={styles.average}
      />
    </div>
  )
}

