import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store";
import { fetchData, setCrypto } from "./store/slices/dataSlice";
import "./App.css";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const stockData = useSelector((state: RootState) => state.data.stockData);
  const selectedCrypto = useSelector(
    (state: RootState) => state.data.selectedCrypto
  );
  const status = useSelector((state: RootState) => state.data.status);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchData(selectedCrypto));

    const intervalId = setInterval(() => {
      dispatch(fetchData(selectedCrypto));
    }, 5000);

    return () => clearInterval(intervalId);
  }, [dispatch, selectedCrypto]);

  const handleCryptoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCrypto = event.target.value;
    dispatch(setCrypto(newCrypto));
    dispatch(fetchData(newCrypto));
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <h1>Real-Time Stock/Crypto Data</h1>
      <button onClick={openModal}>Change Crypto</button>
      <h3>{selectedCrypto}</h3>
      {isModalOpen && (
        <div className="modal show">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <select value={selectedCrypto} onChange={handleCryptoChange}>
              <option value="bitcoin">Bitcoin</option>
              <option value="ethereum">Ethereum</option>
              <option value="dogecoin">Dogecoin</option>
              <option value="litecoin">Litecoin</option>
              <option value="ripple">Ripple</option>
            </select>
          </div>
        </div>
      )}
      {status === "loading" && <p>Loading...</p>}
      {status === "succeeded" && (
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Price (USD)</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((entry: any) => (
              <tr key={entry._id}>
                <td>{new Date(entry.timestamp).toLocaleString()}</td>
                <td>{entry.data[selectedCrypto]?.usd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {status === "failed" && (
        <>
          <p>Failed to fetch data. Using cached data.</p>
          {stockData.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Price (USD)</th>
                </tr>
              </thead>
              <tbody>
                {stockData.map((entry: any) => (
                  <tr key={entry._id}>
                    <td>{new Date(entry.timestamp).toLocaleString()}</td>
                    <td>{entry.data[selectedCrypto]?.usd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default App;
