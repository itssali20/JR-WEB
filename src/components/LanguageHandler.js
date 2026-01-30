import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { detectUserCountry } from '../utils/geolocation';

const LanguageHandler = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const setLanguageBasedOnLocation = async () => {
      // const countryCode = await detectUserCountry();
      const countryCode = 'AE'; // Hardcoded for testing Arabic
      console.log('Detected Country:', countryCode);
      
      if (!countryCode) return; // Fallback to default (en) if detection fails

      let lang = 'en';

      // Middle East countries (Partial list of Arabic speaking countries)
      const middleEastCountries = ['AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'LB', 'JO', 'EG', 'IQ', 'SY', 'YE', 'PS'];
      
      if (middleEastCountries.includes(countryCode)) {
        lang = 'ar';
      } else if (countryCode === 'PT') {
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
    };

    setLanguageBasedOnLocation();
  }, [i18n]);

  return null; // This component doesn't render anything
};

export default LanguageHandler;
