import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchCategories,
  fetchProductById,
  fetchProducts,
} from "../../services/products";

const useServices = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("Bienvenidos a Pet´s BRC");
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const { category } = useParams();
  const { id } = useParams();

  /* CARGA LAS CATEGORIAS */
  const loadCategories = async () => {
    try {
      const { categories } = await fetchCategories();
      if (categories) {
        setCategories(categories);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  /* CARGA LOS PRODUCTOS */
  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const productData = await fetchProducts(category);

      if (productData.products === null) {
        return setError(productData.message);
      }

      if (productData.products.length === 0) {
        return setMsg(productData.message);
      }

      setProducts(productData.products);
      setMsg(productData.message);
    } catch (error) {
      setError(`Error al obtener los productos: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  /* CARGA PRODUCTO POR ID */
  const loadProduct = async () => {
    setIsLoading(true);
    try {
      const productResponse = await fetchProductById(id);

      if (productResponse.item === null) {
        return setError(productResponse.message);
      }

      if (productResponse.item === undefined) {
        return setMsg(productResponse.message);
      }

      setItem(productResponse.item);
    } catch (error) {
      setError(`Error al obtener el producto: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    categories,
    products,
    isLoading,
    setIsLoading,
    msg,
    item,
    id,
    category,
    loadCategories,
    loadProducts,
    loadProduct,
    error,
  };
};

export { useServices };
