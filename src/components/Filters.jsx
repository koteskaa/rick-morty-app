import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { GET_SPECIES } from '../graphql/queries';
import '../styles/Filters.css';

const Filters = ({ filters, onFilterChange, sortBy, sortOrder, onSortChange }) => {
  const { t } = useTranslation();
  const [speciesList, setSpeciesList] = useState([]);
  
  const { data: speciesData } = useQuery(GET_SPECIES, {
    fetchPolicy: 'cache-first',
  });
  
  useEffect(() => {
    if (speciesData?.characters?.results) {
      const allSpecies = speciesData.characters.results.map(char => char.species);
      const uniqueSpecies = [...new Set(allSpecies)].filter(species => species).sort();
      setSpeciesList(uniqueSpecies);
    }
  }, [speciesData]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    console.log('Setting status filter to:', newStatus);
    onFilterChange({
      ...filters,
      status: newStatus
    });
  };

  const handleSpeciesChange = (e) => {
    const newSpecies = e.target.value;
    console.log('Setting species filter to:', newSpecies);
    onFilterChange({
      ...filters,
      species: newSpecies
    });
  };

  const getSortIndicator = (field) => {
    if (sortBy === field) {
      return sortOrder === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  return (
    <div className="filters-container">
      <h2>{t('characters.filters.title')}</h2>
      
      <div className="filters-grid">
        <div className="filter-group">
          <label>{t('characters.filters.status')}:</label>
          <select value={filters.status} onChange={handleStatusChange}>
            <option value="">{t('characters.filters.all')}</option>
            <option value="alive">{t('characters.statuses.alive')}</option>
            <option value="dead">{t('characters.statuses.dead')}</option>
            <option value="unknown">{t('characters.statuses.unknown')}</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>{t('characters.filters.species')}:</label>
          <select value={filters.species} onChange={handleSpeciesChange}>
            <option value="">{t('characters.filters.all')}</option>
            {speciesList.map(species => (
              <option key={species} value={species}>{species}</option>
            ))}
          </select>
        </div>
        
        <div className="sort-group">
          <label>{t('characters.filters.sort')}:</label>
          <div className="sort-buttons">
            <button 
              className={sortBy === 'name' ? 'active' : ''}
              onClick={() => onSortChange('name')}
            >
              {t('characters.table.name')}{getSortIndicator('name')}
            </button>
            <button 
              className={sortBy === 'origin' ? 'active' : ''}
              onClick={() => onSortChange('origin')}
            >
              {t('characters.table.origin')}{getSortIndicator('origin')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters; 