import React, { useState, useEffect } from 'react';
import styles from "./home.module.css";
import RSSParser from "rss-parser";

const MetricCard = ({ title, value, unit, className, onClick }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const startValue = 0;
    const endValue = value;
    let startTime;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const currentValue = Math.ceil(progress * endValue);
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <div className={`${styles.metricCard} ${className}`} onClick={onClick} style={{ cursor: 'pointer' }}>
      <h3>{title}</h3>
      <div className={styles.metricValue}>
        {displayValue}
        {unit && <span className={styles.metricUnit}>{unit}</span>}
      </div>
    </div>
  );
};

export default function Home({ onNavigate }) {
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
        onClick={() => onNavigate('Pending')}
      />
      <MetricCard 
        title="Resolved issues count" 
        value={metrics.resolved}
        className={styles.resolved}
        onClick={() => onNavigate('IssueHistory')}
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



