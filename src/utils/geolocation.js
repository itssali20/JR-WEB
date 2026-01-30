/**
 * Detects the user's country using ipapi.co
 * @returns {Promise<string|null>} The country code (e.g., 'US', 'AE', 'PT', 'ES') or null if detection fails.
 */
export const detectUserCountry = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.country_code;
  } catch (error) {
    console.error('Error detecting user country:', error);
    return null;
  }
};
