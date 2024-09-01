import React, { createContext, useState, useContext } from 'react';

const VisitPagesContext = createContext();

export const VisitPages = ({ children }) => {
    const [visitedPage, setVisitedPage] = useState({});

    return (
        <VisitPagesContext.Provider value={{ visitedPage ,  setVisitedPage}}>
            {children}
        </VisitPagesContext.Provider>
    );
};

export const usePageVisit = () => useContext(VisitPagesContext);
