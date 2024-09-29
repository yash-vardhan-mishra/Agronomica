module.exports = ({ config }) => {
  return {
    ...config,
    ios: {
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
      }
    }
  };
};