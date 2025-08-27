// src/components/EVAnalyticsDashboard.jsx
import React, { useMemo, useState } from "react";
import useCSV from "../Hooks/useCSV";
import Filters from "./Filters";
import StatCard from "./StatCard";
import ChartCard from "./ChartCard";
import DataTable from "./DataTable";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, CartesianGrid, Legend
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

const  DashboardPages=() =>{
  const { data, loading, error } = useCSV("/Electric_Vehicle_Population_Data.csv");
  const [selectedMake, setSelectedMake] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [searchText, setSearchText] = useState("");

  
  const makes = useMemo(() => {
    const s = new Set();
    data.forEach(r => r.Make && s.add(r.Make));
    return Array.from(s).sort();
  }, [data]);

  const years = useMemo(() => {
    const s = new Set();
    data.forEach(r => {
      const y = r["Model Year"] ?? r["ModelYear"] ?? r["Model year"];
      if (y) s.add(String(y));
    });
    return Array.from(s).sort();
  }, [data]);

  const types = useMemo(() => {
    const s = new Set();
    data.forEach(r => {
      const t = r["Electric Vehicle Type"] ?? r["EV Type"] ?? r["EV_Type"];
      if (t) s.add(t);
    });
    return Array.from(s).sort();
  }, [data]);

  const resetFilters = () => {
    setSelectedMake("All");
    setSelectedYear("All");
    setSelectedType("All");
    setSearchText("");
  };

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = searchText.trim().toLowerCase();
    return data.filter((r) => {
      if (selectedMake !== "All" && r.Make !== selectedMake) return false;
      if (selectedYear !== "All") {
        const y = String(r["Model Year"] ?? r["ModelYear"] ?? r["Model year"] ?? "");
        if (y !== selectedYear) return false;
      }
      if (selectedType !== "All") {
        const t = (r["Electric Vehicle Type"] ?? r["EV Type"] ?? r["EV_Type"] ?? "").toString();
        if (!t.toLowerCase().includes(selectedType.toLowerCase())) return false;
      }
      if (q) {
        const hay = `${r.Make ?? ""} ${r.Model ?? ""} ${r.City ?? ""} ${r["Clean Alternative Fuel Vehicle (CAFV) Eligibility"] ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [data, selectedMake, selectedYear, selectedType, searchText]);

  const totalRecords = filtered.length;
  const bevCount = filtered.filter(r => /BEV|Battery/i.test(r["Electric Vehicle Type"] ?? r["EV Type"] ?? "")).length;
  const phevCount = filtered.filter(r => /PHEV|Plug-in/i.test(r["Electric Vehicle Type"] ?? r["EV Type"] ?? "")).length;

  const topMakes = useMemo(() => {
    const map = new Map();
    filtered.forEach(r => {
      const m = r.Make || "Unknown";
      map.set(m, (map.get(m) || 0) + 1);
    });
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, count]) => ({ name, count }));
  }, [filtered]);

  const byYear = useMemo(() => {
    const map = new Map();
    filtered.forEach(r => {
      const y = r["Model Year"] ?? r["ModelYear"] ?? r["Model year"];
      if (!y) return;
      map.set(y, (map.get(y) || 0) + 1);
    });
    return Array.from(map.entries())
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([year, count]) => ({ year: String(year), count }));
  }, [filtered]);

  const cafv = useMemo(() => {
    const m = new Map();
    filtered.forEach(r => {
      const key = r["Clean Alternative Fuel Vehicle (CAFV) Eligibility"] ?? r["CAFV Eligibility"] ?? "Unknown";
      m.set(key, (m.get(key) || 0) + 1);
    });
    return Array.from(m.entries()).map(([name, value]) => ({ name, value }));
  }, [filtered]);

  if (loading) return <div className="p-6 text-center">Loading CSV...</div>;
  if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-base sm:text-[0.5rem] md:text-[1rem] font-semibold">
  EV Dashboard
</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total (filtered)" value={totalRecords.toLocaleString()} />
        <StatCard title="BEV" value={bevCount.toLocaleString()} />
        <StatCard title="PHEV" value={phevCount.toLocaleString()} />
      </div>

      <Filters
        makes={makes}
        years={years}
        types={types}
        selectedMake={selectedMake}
        setSelectedMake={setSelectedMake}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        searchText={searchText}
        setSearchText={setSearchText}
        resetFilters={resetFilters}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
        <div className="lg:col-span-2 space-y-4">
          <div className="border border-yellow-200 rounded-md p-2">
            <ChartCard title="Registrations by Year">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={byYear}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-yellow-200 rounded-md p-2">
              <ChartCard title="Top Makes">
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={topMakes}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            <div className="border border-yellow-200 rounded-md p-2">
              <ChartCard title="CAFV Eligibility">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={cafv} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                      {cafv.map((entry, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </div>
        </div>

        <div className="border border-yellow-200 rounded-md p-2">
          <ChartCard title="Quick Summary">
            <div className="space-y-2 text-sm">
              <div>Total dataset: <strong>{data.length.toLocaleString()}</strong></div>
              <div>Filtered rows: <strong>{totalRecords.toLocaleString()}</strong></div>
              <div>Unique makes: <strong>{makes.length}</strong></div>
              <div>Years: <strong>{years.slice(0,5).join(", ")}{years.length > 5 ? ` +${years.length-5}` : ""}</strong></div>
            </div>
          </ChartCard>
        </div>
      </div>

      <div className="border border-gray-300 rounded-md p-2">
        <DataTable data={filtered} />
      </div>
    </div>
  );
}

export default DashboardPages;