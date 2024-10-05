module.exports = ({ config }) => {
  return {
    ...config,
    ios: {
      bundleIdentifier: "com.agronomica.app",
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
      }
    }
  };
};