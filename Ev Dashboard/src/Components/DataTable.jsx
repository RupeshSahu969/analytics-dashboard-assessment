// src/components/DataTable.jsx
import React, { useMemo, useState } from "react";

const DataTable = ({ data = [] }) => {
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const headers = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const keys = Object.keys(data[0]);
    
    const preferred = ["Make", "Model", "Model Year", "Electric Vehicle Type", "City", "State", "Electric Range"];
    const presentPreferred = preferred.filter(k => keys.includes(k));
    return presentPreferred.length ? presentPreferred : keys.slice(0, 8);
  }, [data]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, page]);

  if (!data || data.length === 0) {
    return <div className="bg-white p-4 rounded-lg shadow text-center">No rows to display</div>;
  }

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-10">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              {headers.map(h => <th key={h} className="px-3 py-2 text-left border-b">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {paged.map((row, i) => (
              <tr key={i} className="border-b even:bg-white odd:bg-gray-50">
                {headers.map((h) => <td key={h} className="px-3 py-2">{row[h] ?? "—"}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <div>Showing { (page-1)*pageSize + 1 }–{ Math.min(page*pageSize, data.length) } of {data.length.toLocaleString()}</div>
        <div className="flex gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>
          <div className="px-3 py-1 border rounded">{page} / {totalPages}</div>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataTable;