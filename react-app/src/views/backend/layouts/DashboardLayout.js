import React from 'react';

import Header from './Header';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
    return (
    <React.Fragment>
        <Header />
        <main className="wrapper">
            <div className='container-fluid'>
                <div className='row'>
                    <Sidebar />
                    <div className='col-md-9'>
                        {children}
                    </div>
                </div>
            </div>
        </main>
    </React.Fragment>
    );
};
export default DashboardLayout;