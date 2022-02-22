const Alert = (props) => {

    const styles = {
            alert: {
                    display: 'flex',
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
            <div class={`alert alert-${props.class}`} role="alert" style={styles.alert}>
                
                <h6>{props.title}</h6>
                <p>{props.desc}</p>

                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
                    style={styles.btn}></button>
            </div>
        </>
    )
}

export default Alert;