import { useTranslation } from 'react-i18next';
import '../styles/LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="language-switcher">
      <span>{t('language.title')}: </span>
      <button 
        className={i18n.language === 'en' ? 'active' : ''} 
        onClick={() => changeLanguage('en')}
      >
        {t('language.en')}
      </button>
      <button 
        className={i18n.language === 'de' ? 'active' : ''} 
        onClick={() => changeLanguage('de')}
      >
        {t('language.de')}
      </button>
    </div>
  );
};

export default LanguageSwitcher; 