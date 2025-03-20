import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const enTranslations = {
  characters: {
    title: 'Rick and Morty Characters',
    filters: {
      title: 'Filters',
      status: 'Status',
      species: 'Species',
      sort: 'Sort by',
      all: 'All',
    },
    table: {
      name: 'Name',
      status: 'Status',
      species: 'Species',
      gender: 'Gender',
      origin: 'Origin',
    },
    statuses: {
      alive: 'Alive',
      dead: 'Dead',
      unknown: 'Unknown',
    },
    genders: {
      male: 'Male',
      female: 'Female',
      genderless: 'Genderless',
      unknown: 'Unknown',
    },
    noResults: 'No characters found',
    loading: 'Loading characters...',
    loadingMore: 'Loading more characters...',
    error: 'Error loading characters',
    loadMore: 'Load More',
  },
  language: {
    title: 'Language',
    en: 'English',
    de: 'German',
  },
};

// German translations
const deTranslations = {
  characters: {
    title: 'Rick und Morty Charaktere',
    filters: {
      title: 'Filter',
      status: 'Status',
      species: 'Spezies',
      sort: 'Sortieren nach',
      all: 'Alle',
    },
    table: {
      name: 'Name',
      status: 'Status',
      species: 'Spezies',
      gender: 'Geschlecht',
      origin: 'Herkunft',
    },
    statuses: {
      alive: 'Lebendig',
      dead: 'Tot',
      unknown: 'Unbekannt',
    },
    genders: {
      male: 'Männlich',
      female: 'Weiblich',
      genderless: 'Geschlechtslos',
      unknown: 'Unbekannt',
    },
    noResults: 'Keine Charaktere gefunden',
    loading: 'Lade Charaktere...',
    loadingMore: 'Lade weitere Charaktere...',
    error: 'Fehler beim Laden der Charaktere',
    loadMore: 'Mehr laden',
  },
  language: {
    title: 'Sprache',
    en: 'Englisch',
    de: 'Deutsch',
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      de: {
        translation: deTranslations,
      },
    },
    lng: 'en', 
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 