import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../functions/capitalizeLetter";

const Item = ({
  id,
  name,
  img,
  price,
  handleRemove,
  showCartItem,
  quantity,
}) => {
  return (
    <article className={!showCartItem ? "cardUi" : "cardCart"}>
      {!showCartItem && (
        <div
          className='background-img'
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      )}
      <header>
        <h2>{capitalizeFirstLetter(name)}</h2>
      </header>
      <div className={!showCartItem ? "container__img" : "containerCart__img"}>
        <img src={img} alt={name} />
      </div>
      <section className={!showCartItem ? "card__price" : "cardCart__price"}>
        {!showCartItem ? <h3>Precio: $ {price}</h3> : <h3>$ {price}</h3>}
      </section>
      {showCartItem && (
        <section className='cardCart__subtotal'>
          <h5>Cantidad: {quantity}</h5>
          <h4>Subtotal: ${price * quantity}</h4>
        </section>
      )}
      <footer className={!showCartItem ? "card__footer" : "cardCart__footer"}>
        {showCartItem ? (
          <button className='removeButton button' onClick={handleRemove}>
            X
          </button>
        ) : (
          <Link className='button' to={`/item/${id}`}>
            {" "}
            Ver producto
          </Link>
        )}
      </footer>
    </article>
  );
};

export { Item };
