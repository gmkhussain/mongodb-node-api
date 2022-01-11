import React from 'react';

import Header from './Header';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
    return (
    <React.Fragment>
        <Header />
        <div className="navigationWrapper">
            <Sidebar />
            <main>{children}</main>
        </div>
    </React.Fragment>
    );
};
export default DashboardLayout;