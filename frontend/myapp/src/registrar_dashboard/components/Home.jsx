import styles from "./home.module.css";

export default function Home() {
    return(
        <div>
            <div className={styles.assigned}>yet to be assigned issues</div>
            <div className={styles.issues}>The resolved issues count</div>
            <div className={styles.pending}>The pending issues count</div>
        </div>
    )
}