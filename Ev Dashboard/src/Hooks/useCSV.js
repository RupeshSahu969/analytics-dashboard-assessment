import { useEffect, useState } from "react";
import Papa from "papaparse";

const useCSV = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Papa.parse("/Electric_Vehicle_Population_Data.csv", {
      download: true,
      header: true,
      dynamicTyping: false,
      skipEmptyLines: true,
      complete: (results) => {
        setData(results.data || []);
        setLoading(false);
      },
      error: (err) => {
        setError(err.message || "Failed to parse CSV");
        setLoading(false);
      },
    });
  }, []);

  return { data, setData, loading, error };
};

export default useCSV;
