import styles from './Loader.module.css'
const Loader = () => {
    
    return (
        <>
            <div className={styles.spinnerHolder}>
                <div className={styles.spinner}>
                    <div className={styles.spinnerIcon}></div>
                </div>
            </div>
        </>
    )
}

export default Loader