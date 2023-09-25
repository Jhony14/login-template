exports.throwAuthenticationError = () => {
  const error = new Error('Authentication failed');
  error.statusCode = 401;
  throw error;
}

exports.throwUnauthorizedError = (message) => {
  const error = new Error(message || 'Unauthorized');
  error.statusCode = 401;
  throw error;
}
