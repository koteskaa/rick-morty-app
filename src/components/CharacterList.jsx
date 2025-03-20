import { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { GET_CHARACTERS } from '../graphql/queries';
import CharacterCard from './CharacterCard';
import Filters from './Filters';
import '../styles/CharacterList.css';

const CharacterList = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    status: '',
    species: '',
  });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [characters, setCharacters] = useState([]);
  const loaderRef = useRef(null);
  const loadingMore = useRef(false);

  const { loading, error, data, fetchMore, refetch } = useQuery(GET_CHARACTERS, {
    variables: {
      page: 1,
      filter: {
        status: filters.status || undefined,
        species: filters.species || undefined,
      }
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data?.characters?.results) {
      let sortedCharacters = [...data.characters.results];
      
      sortedCharacters.sort((a, b) => {
        let valueA, valueB;
        
        if (sortBy === 'name') {
          valueA = a.name;
          valueB = b.name;
        } else if (sortBy === 'origin') {
          valueA = a.origin.name;
          valueB = b.origin.name;
        }
        
        if (sortOrder === 'asc') {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      });
      
      setCharacters(sortedCharacters);
    }
  }, [data, sortBy, sortOrder]);

  const handleFilterChange = (newFilters) => {
    console.log('Filter changed:', newFilters);
    setFilters(newFilters);
    setPage(1);
    setCharacters([]);
    
    const variables = {
      page: 1,
      filter: {
        status: newFilters.status || undefined,
        species: newFilters.species || undefined,
      }
    };
    console.log('Refetching with variables:', variables);
    refetch(variables).then((result) => {
      console.log('Refetch result:', result);
    }).catch(error => {
      console.error('Error refetching:', error);
    });
  };

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const loadMoreCharacters = useCallback(() => {
    if (data?.characters?.info?.next && !loading && !loadingMore.current) {
      loadingMore.current = true;
      
      fetchMore({
        variables: {
          page: data.characters.info.next,
          filter: {
            status: filters.status || undefined,
            species: filters.species || undefined,
          }
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            characters: {
              ...fetchMoreResult.characters,
              results: [
                ...prev.characters.results,
                ...fetchMoreResult.characters.results
              ]
            }
          };
        }
      }).then(() => {
        loadingMore.current = false;
        setPage(page + 1);
      });
    }
  }, [data, loading, fetchMore, filters, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && data?.characters?.info?.next) {
          loadMoreCharacters();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadMoreCharacters, data]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && 
        data?.characters?.info?.next && 
        !loading && 
        !loadingMore.current
      ) {
        loadMoreCharacters();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreCharacters, data, loading]);

  if (loading && characters.length === 0) {
    return <div className="loading">{t('characters.loading')}</div>;
  }

  if (error) {
    return <div className="error">{t('characters.error')}: {error.message}</div>;
  }

  return (
    <div className="character-list-container">
      <h1>{t('characters.title')}</h1>
      
      <Filters 
        filters={filters}
        onFilterChange={handleFilterChange}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />

      {characters.length === 0 && !loading ? (
        <div className="no-results">{t('characters.noResults')}</div>
      ) : (
        <>
          <div className="character-grid">
            {characters.map(character => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
          
          <div 
            ref={loaderRef} 
            className="scroll-loader"
          >
            {(loading || loadingMore.current) && (
              <>
                <div className="loader-dots"><span></span></div>
                <div className="loading-text">{t('characters.loadingMore')}</div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CharacterList; 