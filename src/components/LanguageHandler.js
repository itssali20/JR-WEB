import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { detectUserCountry } from '../utils/geolocation';

const LANGUAGE_STORAGE_KEY = 'preferredLanguage';
const SUPPORTED_LANGUAGES = ['en', 'ar', 'es', 'pt'];

const LanguageHandler = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const setLanguageBasedOnLocation = async () => {
      const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (storedLanguage && SUPPORTED_LANGUAGES.includes(storedLanguage)) {
        if (i18n.language !== storedLanguage) {
          i18n.changeLanguage(storedLanguage);
        }
        document.body.dir = storedLanguage === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = storedLanguage;
        return;
      }

      const countryCode = await detectUserCountry();
      console.log('Detected Country:', countryCode);
      
      if (!countryCode) return; // Fallback to default (en) if detection fails

      let lang = 'en';

      // Middle East countries (Partial list of Arabic speaking countries)
      const middleEastCountries = ['AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'LB', 'JO', 'EG', 'IQ', 'SY', 'YE', 'PS'];
      
      if (middleEastCountries.includes(countryCode)) {
        lang = 'ar';
      } else if (['PT', 'BR'].includes(countryCode)) {
        lang = 'pt';
      } else if (countryCode === 'ES') {
        lang = 'es';
      }

      // Check if language is already set to avoid unnecessary re-renders or loops if logic was more complex
      if (i18n.language !== lang) {
        console.log('Changing language to:', lang);
        i18n.changeLanguage(lang);
      }
      
      // Update HTML dir attribute for Arabic
      document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    };

    setLanguageBasedOnLocation();
  }, [i18n]);

  return null; // This component doesn't render anything
};

export default LanguageHandler;
