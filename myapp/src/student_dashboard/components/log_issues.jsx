import React, { useState } from 'react';
import styles from './log_issues.module.css';

function Log() {
    const [select1Value, setSelect1Value] = useState("");
    const [select2Value, setSelect2Value] = useState("");
    const [select3Value, setSelect3Value] = useState("");
    const [textareaValue, setTextareaValue] = useState("");
    const [displayValue, setDisplayValue] = useState({ select1:"", select2:"",select3:"",text:"" });

    const handleSelect1Change = (event) => {
        setSelect1Value(event.target.value);
    };

    const handleSelect2Change = (event) => {
        setSelect2Value(event.target.value);
    };

    const handleSelect3Change = (event) => {
        setSelect3Value(event.target.value);
    };

    const handleTextareaChange = (event) => {
        setTextareaValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setDisplayValue({
            select1: select1Value,
            select2: select2Value,
            select3: select3Value,
            text: textareaValue,
        });
    };

    return (
        <div>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='courseunit' className={styles.label}>course unit</label>
                    <select value={select1Value} onChange={handleSelect1Change} name="courseunit" id="courseunit" className={styles.select}>
                        <option value="ist1204">Ist1204</option>
                        <option value="csc1201">Csc1201</option>
                        <option value="csc1204">Csc1204</option>
                        <option value="csc1200">Csc1200</option>
                        <option value="csc1202">Csc1202</option>
                    </select>

                    <label htmlFor='complaint' className={styles.label}>complaint</label>
                    <select value={select2Value} onChange={handleSelect2Change} name="complaint" id="complaint" className={styles.select}>
                        <option value="missing_marks">missing marks</option>
                        <option value="incorrect_marks">incorrect marks</option>
                        <option value="remarking">remarking</option>
                    </select>

                    <label htmlFor='type' className={styles.label}>type</label>
                    <select value={select3Value} onChange={handleSelect3Change} name="type" id="type" className={styles.select}>
                        <option value="test">test</option>
                        <option value="coursework">course work</option>
                        <option value="finals">final exam</option>

                    </select>

                    <label htmlFor='customcomplaint' className={styles.label}>custom complaint</label>
                    <textarea value={textareaValue} onChange={handleTextareaChange} name="customcomplaint" id="customcomplaint" cols="30" rows="10" className={styles.textarea}></textarea>

                    <button className={styles.button}>clear</button>
                    <button type="submit" className={styles.button}>Submit</button>
                </form>
            </div>
            <div className={styles.myform}>
                <h5>issue form</h5>
                <div>
                    <p>COURSE UNIT:{displayValue.select1}</p>
                    <p>COMPLAINT:{displayValue.select2}</p>
                    <p>TYPE:{displayValue.select3}</p>
                    <p>CUSTOM COMPLAINT:{displayValue.text}</p>
                </div>
                <button type="submit" className={styles.mybutton}>submit form</button>
            </div>
        </div>
    );
}

export default Log;