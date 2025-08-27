import React from "react";

const Filters = ({
  makes = [],
  years = [],
  types = [],
  selectedMake,
  setSelectedMake,
  selectedYear,
  setSelectedYear,
  selectedType,
  setSelectedType,
  searchText,
  setSearchText,
  resetFilters,
}) =>{
  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <div className="flex flex-col md:flex-row gap-3 md:items-end md:justify-between">
        <div className="flex gap-3 flex-wrap">
          <div className="min-w-[140px]">
            <label className="block text-xs text-gray-600 mb-1">Make</label>
            <select
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="All">All Makes</option>
              {makes.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="min-w-[140px]">
            <label className="block text-xs text-gray-600 mb-1">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="All">All Years</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div className="min-w-[180px]">
            <label className="block text-xs text-gray-600 mb-1">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="All">All Types</option>
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3 items-center w-full md:w-auto">
          <div className="flex-1">
            <label className="block text-xs text-gray-600 mb-1">Search (Make / Model / City)</label>
            <input
              type="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search..."
              className="w-full border rounded p-2"
            />
          </div>

          <div className="pt-6">
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-white bg-black rounded-md text-sm"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;