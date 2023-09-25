module.exports.send = (res, data, statusCode = 200) => {
  try {
    res.status(statusCode).json({
      message: 'Success',
      data: data
    });
  } catch (error) {
    // Handle error here, e.g., log it or send an error response
    console.error('Error sending response:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports.message = (res, message, statusCode = 200) => {
  try {
    res.status(statusCode).json({
      message: message
    });
  } catch (error) {
    // Handle error here, e.g., log it or send an error response
    console.error('Error sending response:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
