const settings = {
    basePath: process.env.REACT_APP_BASE_PATH || '',
    baseRoutePath: process.env.REACT_APP_BASE_ROUTE_PATH || '/api',
    baseURL: process.env.REACT_APP_BASE_URL || 'https://localhost:8080',
    baseAPI: 'http://localhost:8080/api/'
};

export { settings };