import PropTypes from "prop-types";
import styles from "./index.module.scss";

function Modal({ setItem, item }) {
  return (
    <div
      style={{ display: item ? "flex" : "none" }}
      onClick={() => setItem(null)}
      className={styles.modal}
    >
      <div className={styles.card}>
        <div className={styles.image}>
          <img
            src={item?.coverImageSrc || ""}
            alt="Food"
          />
        </div>
        <div className={styles.about}>
          <p className={styles.name}>{item?.name[0]?.value || "No Name"}</p>
          <p className={styles.type}>Fast Food</p>
          <div className={styles.price}>
            {`₼ ${item?.priceSell ? (item.priceSell.toFixed(2)) : "0.00"}`}
          </div>
          <hr />
          <ul>
            <li>Size: Large</li>
            <li>Nuts: Hazelnut, 2 x Almond, Macadamia</li>
            <li>Syrups: Vanilla, Honey</li>
            <li>Fruits: Banana, 2 x Raspberry</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  setItem: PropTypes.func.isRequired,
  item: PropTypes.shape({
    coverImageSrc: PropTypes.string,
    name: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
      })
    ),
    priceSell: PropTypes.number,
  }),
};

export default Modal;
