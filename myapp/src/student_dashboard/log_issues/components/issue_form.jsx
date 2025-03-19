import React from "react";
import styles from "./components.module.css";

function Myform() {
    return (
        <div className={styles.myform}>
            {/* this one contains the results of the user input */}
            <button type="submit" className={styles.mybutton}>submit form</button>
        </div>
    );
}

export default Myform