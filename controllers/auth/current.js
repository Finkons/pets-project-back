const current = async (req, res) => {
  const { name, email, birthday, phone, address } = req.user;
  res.json({ name, email, birthday, phone, address });
};

module.exports = current;
