/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { getAllData } from "../../Redux/Slice/categoriesSlice";
import Modal from "../../Components/Modal";
function HomePage() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.categories.filterData);
  useEffect(() => {
    dispatch(getAllData([]));
  }, []);

  const [item,setItem] = useState(null) // Modal açılan zaman hansı menuİtem olduğunu təyin etmək üçün
  return (
    <>
      <Modal  setItem={setItem} item={item} />
      <section className={styles.home}>
        {data.map((e) => {
          if(!e.isArchived)
          return (
            <div key={e._id} className={styles.block}>
              <p>{e.name[0].value}</p>
              <div className={styles.menuList}>
                {e.menuItems.map((e) => {
                  if(!e.isArchived)
                  return (
                    <div key={e.id} onClick={()=>{setItem(e) ; console.log(item)}} className={styles.menuItem}>
                      <div className={styles.content}>
                        <div className={styles.price}>
                          {("₼ " + e.priceSell).length < 5
                            ? "₼ " + e.priceSell + ".00"
                            : "₼ " + e.priceSell + "0"}
                        </div>
                        <div className={styles.image}>
                          <img
                            src={e.coverImageSrc}
                            alt=""
                          />
                        </div>
                        <div className={styles.name}>
                          <p>{e.name[0].value}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default HomePage;
