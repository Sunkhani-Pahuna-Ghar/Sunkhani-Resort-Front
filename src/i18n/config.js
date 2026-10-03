import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        about: 'Our Story',
        stay: 'Stay With Us',
        farm: 'Farm & Nature',
        culture: 'Culture',
        seminar: 'Seminar Hall',
        gallery: 'Gallery',
        travel: 'Explore the Region',
        book: 'Book Now',
        contact: 'Contact',
      },
      hero: {
        tagline: 'Our peaceful base near Kalinchowk, Dolakha',
        title: 'Sunkhani Pahuna Ghar Resort',
        subtitle: 'Village hospitality, working farm, and mountain air in Sunkhani — on the route to Tsho Rolpa and Dudhkunda',
        cta: 'Check Availability',
        ctaSecondary: 'Our Story',
      },
      rooms: {
        title: 'Where You\u2019ll Stay',
        farmTitle: 'Farm Retreat Rooms',
        farmDesc: 'Three rooms a five minute walk from the main house, set among crops, flowers, and a resident cow. Quiet, close to the fields.',
        mainTitle: 'Main House Rooms',
        mainDesc: 'Five rooms in the main compound, steps from the dining hall and seminar space. Easy, sociable, close to everything.',
      },
      footer: {
        rights: 'All rights reserved.',
      },
    },
  },
  ne: {
    translation: {
      nav: {
        home: 'गृहपृष्ठ',
        about: 'हाम्रो कथा',
        stay: 'बसाइ',
        farm: 'खेतीपाती र प्रकृति',
        culture: 'संस्कृति',
        seminar: 'सेमिनार हल',
        gallery: 'ग्यालरी',
        travel: 'वरपर घुम्नुहोस्',
        book: 'बुक गर्नुहोस्',
        contact: 'सम्पर्क',
      },
      hero: {
        tagline: 'कालिन्चोक, दोलखा नजिकैको शान्त बास',
        title: 'सुनखानी पाहुना घर रिसोर्ट',
        subtitle: 'सुनखानी, कालिन्चोक गाउँपालिकामा गाउँले आतिथ्य, खेतीपाती फार्म र हिमाली हावा',
        cta: 'उपलब्धता हेर्नुहोस्',
        ctaSecondary: 'हाम्रो कथा',
      },
      rooms: {
        title: 'बसाइको ठाउँ',
        farmTitle: 'फार्म रिट्रीट कोठा',
        farmDesc: 'मुख्य घरबाट पाँच मिनेट हिँडेर पुगिने तीन कोठा, बाली, फूल र गाईको बीचमा। शान्त र खेतनजिक।',
        mainTitle: 'मुख्य घरका कोठा',
        mainDesc: 'मुख्य परिसरमा पाँच कोठा, डाइनिङ हल र सेमिनार ठाउँ नजिकै। सजिलो र सबैभन्दा नजिक।',
      },
      footer: {
        rights: 'सर्वाधिकार सुरक्षित।',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
