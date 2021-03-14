const { celebrate, Joi } = require('celebrate');

const isValidBodyCreateUser = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    // password: Joi.string().required().min(6).max(26),
  }),
});

// const isValidBodyLoginUser = () => celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().min(6).max(26),
//   }),
// });

// const isValidReqIdArticleDelete = () => celebrate({
//   params: Joi.object().keys({
//     articleId: Joi.string().required().length(24),
//   }),
// });

// const isValidBodyCreateArticle = () => celebrate({
//   body: Joi.object().keys({
//     keyword: Joi.string().required(),
//     title: Joi.string().required(),
//     text: Joi.string().required(),
//     date: Joi.string().required(),
//     source: Joi.string().required(),
//     link: Joi.string()
//       .required()
//       .pattern(new RegExp(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/)),
//     image: Joi.string()
//       .required()
//       .pattern(new RegExp(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/)),
//   }),
// });

module.exports = {
  isValidBodyCreateUser,
  // isValidBodyLoginUser,
  // isValidBodyCreateArticle,
  // isValidReqIdArticleDelete,
};
