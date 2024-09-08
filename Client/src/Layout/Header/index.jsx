import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.scss";
import { filter } from "../../Redux/Slice/categoriesSlice";
import { useState } from "react";
function Header() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.categories.data);
  const [filterCategory, setFilterCategory] = useState("All");
  return (
    <>
      <header>
        <p>Menu</p>
        <nav className={styles.navigation}>
          <span
            style={
              filterCategory == "All"
                ? { backgroundColor: "black", color: "white" }
                : {}
            } // bg color dinamik olaraq dəyişir
            onClick={() => {
              dispatch(filter("All"))
              setFilterCategory('All')// bg color dinamik olaraq dəyişir
            }}
          >
            All
          </span>
          {data.map((e, i) => {
            return (
              <span
                key={i}
                style={
                  filterCategory == e.name[0].value
                    ? { backgroundColor: "black", color: "white" }
                    : {}
                }// bg color dinamik olaraq dəyişir
                onClick={() => {
                  dispatch(filter(e.name[0].value))
                  setFilterCategory(e.name[0].value)// bg color dinamik olaraq dəyişir
                }}
              >
                {e.name[0].value}
              </span>
            );
          })}
        </nav>
      </header>
      <nav></nav>
    </>
  );
}

export default Header;
