import React, { createContext, useState, useContext } from 'react';

const TemaContext = createContext();

export const TemaProvider = ({ children }) => {
  const [tema, setTema] = useState('claro');

  const alternarTema = () => {
    setTema((prev) => (prev === 'claro' ? 'escuro' : 'claro'));
  };

  return (
    <TemaContext.Provider value={{ tema, alternarTema }}>
      {children}
    </TemaContext.Provider>
  );
};

export const useTema = () => useContext(TemaContext);
