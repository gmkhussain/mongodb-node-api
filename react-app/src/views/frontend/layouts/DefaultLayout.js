import React from 'react';

import Header from './Header';

const DefaultLayout = ({ children }) => {
    return (
    <React.Fragment>
        <Header />
        <div className="navigationWrapper">
            <main>{children}</main>
        </div>
    </React.Fragment>
    );
};
export default DefaultLayout;