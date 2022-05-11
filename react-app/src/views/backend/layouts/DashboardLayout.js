import React from 'react';

import Wrapper from './Wrapper';
import Header from './Header';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
    return (
    <React.Fragment>
        <Header />
        <Wrapper>
            <Sidebar />
            <div className='col-md-10'>
                {children}
            </div>
        </Wrapper>
    </React.Fragment>
    );
};
export default DashboardLayout;