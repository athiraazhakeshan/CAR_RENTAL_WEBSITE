import React, { createContext, useContext, useState,useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token'));

    useEffect(() => {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        setToken(savedToken);
      }
    }, []);
    const [user, setUser] = useState(() => {
      const savedUser = localStorage.getItem('user');
      console.log("Saved User:", savedUser); 
      return savedUser ? JSON.parse(savedUser) : null;
    });
};