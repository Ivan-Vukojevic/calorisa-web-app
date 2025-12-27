import {
  MessageCircle,
  Book,
  Utensils,
  Dumbbell,
  Calendar,
  ChefHat,
  Heart,
  ListChecks,
  Users,
  ClipboardList,
  MonitorSmartphone,
  Video,
  Phone,
  SquareCheck,
} from 'lucide-react';

export const getIconForNote = (note) => {
  let id = null;
  if (note && typeof note === 'object' && note.id) id = note.id;
  if (typeof note === 'string' && /^[a-z0-9-_]+$/i.test(note)) id = note;

  if (id) {
    switch (id) {
      case 'analysis':
      case 'tips-analysis':
        return MessageCircle;
      case 'education':
      case 'education-habits':
        return Book;
      case 'suggestions':
        return SquareCheck;
      case 'meal-plan':
      case 'nutrition-plan':
        return Utensils;
      case 'training-plan':
      case 'workout-plan':
        return Dumbbell;
      case 'recipes':
      case 'meal-options':
        return ChefHat;
      case 'communication':
      case 'flexibility':
        return Phone;
      case 'adjustment':
      case 'scheduling':
        return SquareCheck;
      case 'nutrition-training-plans':
      case 'combined-plans':
        return Dumbbell;
      case 'support':
      case '24h-support':
        return Phone;
      case 'weekly-checks':
      case 'check-ins':
        return Calendar;
      case 'process-guidance':
      case 'guidance':
        return Heart;
      case 'customized-workout':
        return Dumbbell;
      case 'individual-coaching':
      case 'coaching':
        return SquareCheck;
      case 'flexible-scheduling':
        return ListChecks;
      case 'progress':
      case 'progress-tracking':
        return ClipboardList;
      case 'video':
      case 'video-sessions':
        return Video;
      case 'weekly-plans':
        return SquareCheck;
      case 'online-support':
        return Phone;
      case 'devices':
      case 'device-access':
        return MonitorSmartphone;
      case 'partner':
      case 'partner-exercises':
        return Users;
      case 'full-body':
      case 'full-body-workout':
        return Dumbbell;
      case 'all-levels':
        return SquareCheck;
      case 'motivation':
      case 'enhanced-motivation':
        return Heart;
      default:
        return SquareCheck;
    }
  }

  if (typeof note === 'string') {
    const noteLower = note.toLowerCase();
    if (noteLower.includes('savjet') || noteLower.includes('analiz') || noteLower.includes('advice') || noteLower.includes('consult')) {
      return MessageCircle;
    }
    if (noteLower.includes('edukacija') || noteLower.includes('education') || noteLower.includes('učenj')) {
      return Book;
    }
    if (noteLower.includes('plan prehrane') || noteLower.includes('meal plan') || noteLower.includes('plan obroka')) {
      return Utensils;
    }
    if (noteLower.includes('plan trening') || noteLower.includes('vježb') || noteLower.includes('training') || noteLower.includes('workout')) {
      return Dumbbell;
    }
    if (noteLower.includes('recept') || noteLower.includes('recipe') || noteLower.includes('obrok')) {
      return ChefHat;
    }
    if (noteLower.includes('komunikacija') || noteLower.includes('podrška') || noteLower.includes('support') || noteLower.includes('24-satna')) {
      return Phone;
    }
    if (noteLower.includes('tjedn') || noteLower.includes('provjera') || noteLower.includes('weekly') || noteLower.includes('check')) {
      return Calendar;
    }
    if (noteLower.includes('fleksibiln') || noteLower.includes('prilagod') || noteLower.includes('flexib') || noteLower.includes('custom')) {
      return ListChecks;
    }
    if (noteLower.includes('video') || noteLower.includes('online')) {
      return Video;
    }
    if (noteLower.includes('uređaj') || noteLower.includes('device') || noteLower.includes('dostupn')) {
      return MonitorSmartphone;
    }
    if (noteLower.includes('par') || noteLower.includes('duo') || noteLower.includes('pair') || noteLower.includes('zajedno')) {
      return Users;
    }
    if (noteLower.includes('motiv') || noteLower.includes('vodič') || noteLower.includes('guidance')) {
      return Heart;
    }
    if (noteLower.includes('praćenj') || noteLower.includes('napredak') || noteLower.includes('progress')) {
        return ClipboardList;
    }
  }
      return SquareCheck;
  return TbSquareCheck;
};
