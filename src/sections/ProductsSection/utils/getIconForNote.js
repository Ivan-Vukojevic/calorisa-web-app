import { 
  TbMessageCircle, 
  TbBook, 
  TbToolsKitchen2, 
  TbBarbell, 
  TbCalendarTime, 
  TbChefHat,
  TbHeart,
  TbListCheck,
  TbUsers,
  TbClipboardText,
  TbDevices,
  TbVideo,
  TbPhone,
  TbSquareCheck
} from 'react-icons/tb';

export const getIconForNote = (note) => {
  let id = null;
  if (note && typeof note === 'object' && note.id) id = note.id;
  if (typeof note === 'string' && /^[a-z0-9-_]+$/i.test(note)) id = note;

  if (id) {
    switch (id) {
      case 'analysis':
      case 'tips-analysis':
        return TbMessageCircle;
      case 'education':
      case 'education-habits':
        return TbBook;
      case 'suggestions':
        return TbSquareCheck;
      case 'meal-plan':
      case 'nutrition-plan':
        return TbToolsKitchen2;
      case 'training-plan':
      case 'workout-plan':
        return TbBarbell;
      case 'recipes':
      case 'meal-options':
        return TbChefHat;
      case 'communication':
      case 'flexibility':
        return TbPhone;
      case 'adjustment':
      case 'scheduling':
        return TbSquareCheck;
      case 'nutrition-training-plans':
      case 'combined-plans':
        return TbBarbell;
      case 'support':
      case '24h-support':
        return TbPhone;
      case 'weekly-checks':
      case 'check-ins':
        return TbCalendarTime;
      case 'process-guidance':
      case 'guidance':
        return TbHeart;
      case 'customized-workout':
        return TbBarbell;
      case 'individual-coaching':
      case 'coaching':
        return TbSquareCheck;
      case 'flexible-scheduling':
        return TbListCheck;
      case 'progress':
      case 'progress-tracking':
        return TbClipboardText;
      case 'video':
      case 'video-sessions':
        return TbVideo;
      case 'weekly-plans':
        return TbSquareCheck;
      case 'online-support':
        return TbPhone;
      case 'devices':
      case 'device-access':
        return TbDevices;
      case 'partner':
      case 'partner-exercises':
        return TbUsers;
      case 'full-body':
      case 'full-body-workout':
        return TbBarbell;
      case 'all-levels':
        return TbSquareCheck;
      case 'motivation':
      case 'enhanced-motivation':
        return TbHeart;
      default:
        return TbSquareCheck;
    }
  }

  if (typeof note === 'string') {
    const noteLower = note.toLowerCase();
    if (noteLower.includes('savjet') || noteLower.includes('analiz') || noteLower.includes('advice') || noteLower.includes('consult')) {
      return TbMessageCircle;
    }
    if (noteLower.includes('edukacija') || noteLower.includes('education') || noteLower.includes('učenj')) {
      return TbBook;
    }
    if (noteLower.includes('plan prehrane') || noteLower.includes('meal plan') || noteLower.includes('plan obroka')) {
      return TbToolsKitchen2;
    }
    if (noteLower.includes('plan trening') || noteLower.includes('vježb') || noteLower.includes('training') || noteLower.includes('workout')) {
      return TbBarbell;
    }
    if (noteLower.includes('recept') || noteLower.includes('recipe') || noteLower.includes('obrok')) {
      return TbChefHat;
    }
    if (noteLower.includes('komunikacija') || noteLower.includes('podrška') || noteLower.includes('support') || noteLower.includes('24-satna')) {
      return TbPhone;
    }
    if (noteLower.includes('tjedn') || noteLower.includes('provjera') || noteLower.includes('weekly') || noteLower.includes('check')) {
      return TbCalendarTime;
    }
    if (noteLower.includes('fleksibiln') || noteLower.includes('prilagod') || noteLower.includes('flexib') || noteLower.includes('custom')) {
      return TbListCheck;
    }
    if (noteLower.includes('video') || noteLower.includes('online')) {
      return TbVideo;
    }
    if (noteLower.includes('uređaj') || noteLower.includes('device') || noteLower.includes('dostupn')) {
      return TbDevices;
    }
    if (noteLower.includes('par') || noteLower.includes('duo') || noteLower.includes('pair') || noteLower.includes('zajedno')) {
      return TbUsers;
    }
    if (noteLower.includes('motiv') || noteLower.includes('vodič') || noteLower.includes('guidance')) {
      return TbHeart;
    }
    if (noteLower.includes('praćenj') || noteLower.includes('napredak') || noteLower.includes('progress')) {
      return TbClipboardText;
    }
  }

  return TbSquareCheck;
};
