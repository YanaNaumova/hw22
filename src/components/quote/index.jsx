import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuote } from "../../redux/features/quote/quoteSlice";
import { Spin, Button } from "antd";
import styles from "./styles.module.css";

const contentStyle = {
  padding: 50,
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
};
const content = <div style={contentStyle} />;

function Quote() {
  const dispatch = useDispatch();
  const { data: quote, status, error } = useSelector((state) => state.quote);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchQuote());
    };
    fetchData();
  }, [dispatch]);

  if (status === "loading")
    return (
      <Spin tip="dd" size="large">
        {content}
      </Spin>
    );

  if (status === "failed") return <h1>{error.message}</h1>;

  return (
    <div className={styles.container}>
      <h1>Random Quote Generation</h1>
      {status === "succeeded" &&
        quote.map((el, id) => {
          return (
            <div key={id}>
              <p>"{el.q}"</p>
              <p className={styles.text}>{el.a}</p>
            </div>
          );
        })}
      <Button
        type="primary"
        onClick={() => dispatch(fetchQuote())}
        style={{ maxWidth: "200px" }}
      >
        New Quote
      </Button>
    </div>
  );
}

export default Quote;
