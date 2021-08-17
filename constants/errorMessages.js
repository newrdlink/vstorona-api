const notFoundErrors = {
  badToken: 'Проблемы с токеном',
  workerNotFound: 'Уже нет такого работника',
  userNotFound: 'Нет такого пользователя',
  badPath: ' - нет такого пути',
};

const notAccessErrors = {
  forbidden: 'У вас нет прав',
};

const notAuthErrors = {
  noAuth: 'Нужна авторизация',
  reAuth: 'Необходима повторная авторизация',
  userNotFound: 'Нет такого пользователя',
  badEmailOrPass: 'Не правильный email или пароль',
};

const errorsInModels = {
  badLink: 'Не совсем валидная ссылка ...',
  badEmail: 'Не совсем валидный email ...',
};

const generalErrors = {
  emailRepeat: 'Пользователь с таким email уже есть',
  failData: 'Дело в том, что это не валидные данные',
};

const alreadyExists = {
  dirFounded: 'Такая папка уже существует',
  fileExists: 'Файл с таким именем существует',
  errWriteFile: 'Ошибка записи файла',
};

module.exports = {
  notFoundErrors,
  notAccessErrors,
  notAuthErrors,
  errorsInModels,
  generalErrors,
  alreadyExists,
};
