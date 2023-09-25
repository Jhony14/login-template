exports.getUser = (user) => {
  const { _id, email, name, avatar } = user;

  return {
    id: _id.toString(),
    email,
    name,
    avatar,
  };
};
