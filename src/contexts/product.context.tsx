import React, {createContext, useContext, useState, useMemo} from 'react';
import {IProduct} from '../types/product.type';

interface ProductContextProps {
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

const ProductContext = createContext<ProductContextProps | null>(null);

export function ProductProvider({children}: {children: React.ReactNode}) {
  const [products, setProducts] = useState<IProduct[]>([]);

  const value = useMemo(
    () => ({
      products,
      setProducts,
    }),
    [products, setProducts],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export const useProductContext = (): ProductContextProps => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
