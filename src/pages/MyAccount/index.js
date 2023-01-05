import React from 'react';
import { Link } from 'react-router-dom';


const MyAccount = () => {

    return (
        <>
            <h2 style={{ textAlign: 'center' }}>In MyAccount </h2>
            <br />
            <h3 style={{ textAlign: 'center' }}>
                <Link to="/dashboard">Dashboard</Link>
            </h3>
        </>
    );
}

export default MyAccount;