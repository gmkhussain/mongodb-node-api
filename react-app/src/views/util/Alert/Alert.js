const Alert = (props) => {

    const styles = {
            alert: {
                    padding: '5px'
                },
            btn: {
                width: '10px',
                height: '10px',
                overflow: 'hidden',
                backgroundSize: '10px',
                marginLeft: 'auto'
            }
        };


    return (
        <>
            <div className={`alert alert-${props.class}`} role="alert" style={styles.alert}>
                
                { props.title ? <h6>{props.title}</h6> : " "}
                { props.desc? <span>{props.desc}</span> : " " }
                
                {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"
                    style={styles.btn}></button> */}
            </div>
        </>
    )
}

export default Alert;