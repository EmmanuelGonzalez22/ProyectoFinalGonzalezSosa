import { useEffect, useState } from "react";
import { getProductById } from "../../asyncMock";
import { useParams } from "react-router-dom";
import { ItemDetail, Loader } from "../../common";

const ItemDetailContainer = () => {
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const id = useParams().id;

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        setIsLoading(true);
        const response = await getProductById(Number(id));
        setItem(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductById();
  }, [id]);

  return (
    <div>{item && !isLoading ? <ItemDetail item={item} /> : <Loader />}</div>
  );
};

export { ItemDetailContainer };