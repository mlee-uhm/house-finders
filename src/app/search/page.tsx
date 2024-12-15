'use client';

import React, { useState } from 'react';
import PropertyCard from '@/components/PropertyCard';
import defaultData from '../../../config/settings.development.json';

type Condition = 'new' | 'good' | 'fair' | 'poor'; // Define the Condition type

const Search: React.FC = () => {
  const [filters, setFilters] = useState({
    condition: '',
    price: 2000,
    bedrooms: 5,
    bathrooms: 5,
    sqft: 1000,
  });
    defaultData.defaultData.map((data, index) => ({ ...data, id: index, condition: data.condition as Condition })),
  const [filteredData, setFilteredData] = useState(
    defaultData.defaultData.map((data, index) => ({ ...data, id: index })),
  );

  const uniqueConditions = Array.from(
    new Set(defaultData.defaultData.map((data) => data.condition)),
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: id === 'price' || id === 'bedrooms' || id === 'bathrooms' || id === 'sqft' ? Number(value) : value,
    }));
  };

  const handleSearch = () => {
    const results = defaultData.defaultData.map((data, index) => ({ ...data, id: index })).filter((data) => (
      (filters.condition === '' || data.condition === filters.condition)
        && data.price <= filters.price
        && data.bedrooms <= filters.bedrooms
        && data.bathrooms <= filters.bathrooms
        && data.sqft <= filters.sqft
    ));

    setFilteredData(results);
  };

  return (
    <div>
      <h1>Search Properties</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="condition">Condition:</label>
        <select id="condition" value={filters.condition} onChange={handleFilterChange} aria-labelledby="condition">
          <option value="">Any</option>
          {uniqueConditions.map((condition) => (
            <option key={condition} value={condition}>
              {condition}
            </option>
          ))}
        </select>
        <br />
        <br />

        <label htmlFor="price">
          Price:
          {' '}
          <span>
            $
            {filters.price}
          </span>
        </label>
        <input
          type="range"
          id="price"
          min="0"
          max="2000"
          step="100"
          value={filters.price}
          onChange={handleFilterChange}
        />
        <br />
        <br />

        <label htmlFor="bedrooms">
          Bedrooms:
          {' '}
          <span>{filters.bedrooms}</span>
        </label>
        <input
          type="range"
          id="bedrooms"
          min="1"
          max="5"
          step="1"
          value={filters.bedrooms}
          onChange={handleFilterChange}
        />
        <br />
        <br />

        <label htmlFor="bathrooms">
          Bathrooms:
          {' '}
          <span>{filters.bathrooms}</span>
        </label>
        <input
          type="range"
          id="bathrooms"
          min="1"
          max="5"
          step="1"
          value={filters.bathrooms}
          onChange={handleFilterChange}
        />
        <br />
        <br />

        <label htmlFor="sqft">
          Sqft:
          {' '}
          <span>{filters.sqft}</span>
        </label>
        <input
          type="range"
          id="sqft"
          min="100"
          max="1000"
          step="50"
          value={filters.sqft}
          onChange={handleFilterChange}
        />
        <br />
        <br />

        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </form>

      <h2>Search Results</h2>
      {filteredData.length > 0 ? (
        filteredData.map((data) => (
          <PropertyCard key={data.id} property={data} />
        ))
      ) : (
        <p>No properties match the search criteria.</p>
      )}
    </div>
  );
};

export default Search;
