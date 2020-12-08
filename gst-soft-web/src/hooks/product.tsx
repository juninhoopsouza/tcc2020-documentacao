import React, { createContext, useContext, useEffect, useState } from 'react';
import { IProduct, IStock } from '../containers/Product/models';

interface ProductContextData {
  products: IProduct[];
  saveProduct(product: IProduct): void;
  getStock(code: string): IStock[];
}

const ProductContext = createContext<ProductContextData>(
  {} as ProductContextData,
);

const ProductProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>();

  useEffect(() => {
    const json = localStorage.getItem('@productsData');
    if (json) setProducts(JSON.parse(json) || []);
    else setProducts([]);
  }, []);

  useEffect(() => {
    localStorage.setItem('@productsData', JSON.stringify(products));
  }, [products]);

  const getProductById = (code: string): IProduct => {
    return products?.find(product => product.code === code);
  };

  const saveProduct = ({ code, ...rest }: IProduct): void => {
    const product = getProductById(code);

    const list = [...products];
    if (product) {
      const index = list.indexOf(product);
      list[index] = { code, ...rest };
      setProducts([...list]);
    } else {
      setProducts([...list, { code, ...rest }]);
    }
  };

  const getStock = (code: string): IStock[] => {
    const product = getProductById(code);
    if (!product) return [];
    return product.stock;
  };

  return (
    <ProductContext.Provider value={{ products, saveProduct, getStock }}>
      {children}
    </ProductContext.Provider>
  );
};

function useProduct(): ProductContextData {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within an ProductProvider');
  }
  return context;
}

export { ProductProvider, useProduct };
