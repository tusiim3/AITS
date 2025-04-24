import styles from "./home.module.css";

export default function Home() {
    return(
        <div>
            <div className={styles.pending}>Pending issues assigned to you</div>            
            <div className={styles.resolved}>Resolved issues count</div>        
            <div className={styles.average}>Average issue resolution time</div>
        </div>
    )
}