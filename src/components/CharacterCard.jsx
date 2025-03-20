import { useTranslation } from 'react-i18next';
import '../styles/CharacterCard.css';

const CharacterCard = ({ character }) => {
  const { t } = useTranslation();
  
  const getStatusText = (status) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return t('characters.statuses.alive');
      case 'dead':
        return t('characters.statuses.dead');
      default:
        return t('characters.statuses.unknown');
    }
  };

  const getGenderText = (gender) => {
    switch (gender.toLowerCase()) {
      case 'male':
        return t('characters.genders.male');
      case 'female':
        return t('characters.genders.female');
      case 'genderless':
        return t('characters.genders.genderless');
      default:
        return t('characters.genders.unknown');
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'green';
      case 'dead':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <div className="character-card">
      <div className="character-image">
        <img src={character.image} alt={character.name} />
      </div>
      <div className="character-info">
        <h2 className="character-name">{character.name}</h2>
        
        <div className="character-status">
          <span 
            className="status-indicator" 
            style={{ backgroundColor: getStatusColor(character.status) }}
          ></span>
          <div className="info-label">{t('characters.table.status')}:</div>
          <div className="info-value">{getStatusText(character.status)}</div>
        </div>
        
        <div className="character-details">
          <div className="info-label">{t('characters.table.species')}:</div>
          <div className="info-value">{character.species}</div>
        </div>
        
        <div className="character-details">
          <div className="info-label">{t('characters.table.gender')}:</div>
          <div className="info-value">{getGenderText(character.gender)}</div>
        </div>
        
        <div className="character-details">
          <div className="info-label">{t('characters.table.origin')}:</div>
          <div className="info-value">{character.origin.name}</div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard; 