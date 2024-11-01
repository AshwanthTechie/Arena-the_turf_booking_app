import React, { createContext, useState, useEffect } from 'react';

const MyContext = createContext();

const MyProvider = ({ children }) => {
    const [loginStatus, setLoginStatus] = useState(() => {
        const savedState = localStorage.getItem('loginStatus');
        return savedState ? JSON.parse(savedState) : false;
    });

    const [userId, setUserId] = useState(() => {
        const savedUserId = localStorage.getItem('userId');
        return savedUserId ? JSON.parse(savedUserId) : null;
    });

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        localStorage.setItem('loginStatus', JSON.stringify(loginStatus));
    }, [loginStatus]);

    useEffect(() => {
        localStorage.setItem('userId', JSON.stringify(userId));
    }, [userId]);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    return (
        <MyContext.Provider value={{ loginStatus, setLoginStatus, userId, setUserId, user, setUser }}>
            {children}
        </MyContext.Provider>
    );
};

export { MyContext, MyProvider };
