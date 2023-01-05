import React from 'react';
import { useDispatch } from "react-redux";
import { LOGIN_F } from '../../../constants';


const Header = () => {
    // const dispatch = useDispatch();
    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch({ type: LOGIN_F })
    }
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2 >Header</h2>
                <button type='button' onClick={onLogout}>Logout</button>
            </div>
        </>
    );
}

export default Header;