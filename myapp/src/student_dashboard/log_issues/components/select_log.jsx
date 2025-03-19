import React from 'react';
import styles from './components.module.css';

function Log() {
    return (
        <div className={styles.container}>
            <form>
                <label htmlFor='courseunit' className={styles.label}>course unit</label>
                <select name="courseunit" id="courseunit" className={styles.select}>
                    <option value="ist1204">Ist1204</option>
                    <option value="csc1201">Csc1201</option>
                    <option value="csc1204">Csc1204</option>
                    <option value="csc1200">Csc1200</option>
                    <option value="csc1202">Csc1202</option>
                </select>

                <label htmlFor='complaint' className={styles.label}>complaint</label>
                <select name="complaint" id="complaint" className={styles.select}>
                    <option value="missing_marks">missing marks</option>
                    <option value="incorrect_marks">incorrect marks</option>
                    <option value="remarking">remarking</option>
                </select>

                <label htmlFor='type' className={styles.label}>type</label>
                <select name="type" id="type" className={styles.select}>
                    <option value="test">test</option>
                    <option value="coursework">course work</option>
                    <option value="finals">final exam</option>

                </select>

                <label htmlFor='customcomplaint' className={styles.label}>custom complaint</label>
                <textarea name="customcomplaint" id="customcomplaint" cols="30" rows="10" className={styles.textarea}></textarea>

                <button className={styles.button}>clear</button>
                <button className={styles.button}>Submit</button>
            </form>
        </div>
    );
}

export default Log