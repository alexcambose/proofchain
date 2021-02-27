export const isClient = () => typeof window !== 'undefined';
export const isDevelopment = () => process.env.NODE_ENV === 'development';
