const current = async (req, res) => {
  const { name, email, birthday, phone, address, avatarURL } = req.user;
  res.json({ name, email, birthday, phone, address, avatarURL });
};

module.exports = current;
