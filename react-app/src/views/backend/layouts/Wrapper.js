const Wrapper = (props) => {
    return ( 
        <>
            <main className="wrapper">
                <div className='container-fluid'>
                    <div className='row'>
                        {props.children}
                    </div>
                </div>
            </main>
        </>
    )
}

export default Wrapper;
