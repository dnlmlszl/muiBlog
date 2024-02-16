import { createContext, useEffect, useState, useContext } from 'react';

const postCategories = [
  'Running',
  'Coding',
  'Travelling',
  'Economy',
  'Mathematics',
];

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    // Szimuláljuk, hogy az adatok aszinkron módon érkeznek
    setTimeout(() => {
      setCategories(postCategories);
    }, 1000);
  }, []);

  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useGlobalCatContext = () => {
  return useContext(CategoryContext);
};
