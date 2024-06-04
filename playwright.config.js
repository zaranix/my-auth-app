module.exports = {
    use: {
      baseURL: 'http://app:3000', // Ensure this uses http
      headless: true,
      ignoreHTTPSErrors: true,
    },
    projects: [
      {
        name: 'firefox',
        use: { browserName: 'firefox' },
      },
      {
        name: 'webkit',
        use: { browserName: 'webkit' },
      },
  
     
    ],
  };
  