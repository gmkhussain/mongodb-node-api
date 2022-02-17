import React from 'react';

const PlainLayout = ({ children }) => {
    return (
    <React.Fragment>
        <div className="navigationWrapper">
            <main>{children}</main>
        </div>
    </React.Fragment>
    );
};
export default PlainLayout;