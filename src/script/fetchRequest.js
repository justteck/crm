/* eslint-disable require-jsdoc */
// custom error class
class StatusError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'StatusError';
    this.responseStatus = status;
  }
}

export const fetchRequest = async (url, {
  method = 'get',
  callback,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };

    if (body) options.body = JSON.stringify(body);
    if (headers) options.headers = headers;

    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();

      if (callback) return callback(null, data);
      return data;
    }

    throw new StatusError(
      `Ошибка ${response.status}!`, response.status);
  } catch (err) {
    console.log('Сообщение', err.message);
    console.log('Ошибка', err.name);
    console.log('Статус', err.responseStatus);
    callback(err);
    return false;
  }
};
