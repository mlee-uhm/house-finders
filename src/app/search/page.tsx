'use client';

import React, { useState } from 'react';
import { Condition, Property } from '@prisma/client';
import SearchPropertyCard from '@/components/SearchPropertyCard';
import { Row, Col } from 'react-bootstrap';
import defaultData from '../../../config/settings.development.json';

const Search: React.FC = () => {
  const [filters, setFilters] = useState({
    condition: '' as keyof typeof Condition,
    price: 2000,
    bedrooms: 5,
    bathrooms: 5,
    sqft: 1000,
  });

  const [filteredData, setFilteredData] = useState(
    defaultData.defaultData.map((data, index) => ({ ...data, id: index, condition: data.condition as Condition })),
  );

  const uniqueConditions = Array.from(new Set(defaultData.defaultData.map((data) => data.condition)));

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: id === 'price' || id === 'bedrooms' || id === 'bathrooms' || id === 'sqft' ? Number(value) : value,
    }));
  };

  const handleSearch = () => {
    const results = defaultData.defaultData
      .map((data, index) => ({
        ...data,
        id: index,
        condition: data.condition as Condition,
      }))
      .filter(
        (data) => (filters.condition === null || data.condition === filters.condition)
          && data.price <= filters.price
          && data.bedrooms <= filters.bedrooms
          && data.bathrooms <= filters.bathrooms
          && data.sqft <= filters.sqft,
      );

    setFilteredData(results);
  };

  return (
    <div style={{ fontFamily: 'Merriweather, serif', color: 'black', textShadow: '0 0 5px rgb(189, 204, 120)' }}>
      <h1>
        <strong>Search Properties</strong>
      </h1>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
          <span>
            {filters.bedrooms}
          </span>
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
          <span>
            {filters.bathrooms}
          </span>
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
          <span>
            {filters.sqft}
          </span>
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

      <h2>
        <strong>Search Results</strong>
      </h2>
      <Row key="search-row" xs={1} md={2} lg={3} className="g-4">
        {filteredData.length > 0 ? (
          filteredData.map((data: Property) => (
            <Col>
              <SearchPropertyCard key={data.id} property={data} />
            </Col>
          ))
        ) : (
          <p>No properties match the search criteria.</p>
        )}
      </Row>
    </div>
  );
};

export default Search;
