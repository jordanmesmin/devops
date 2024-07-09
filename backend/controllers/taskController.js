const db = require('../config/db.config');

exports.getTasks = (req, res) => {
  db.query('SELECT * FROM Tasks', (err, results) => {
    if (err) return res.status(500).send('There was a problem finding the tasks.');
    res.status(200).send(results);
  });
};

exports.createTask = (req, res) => {
  const { title, description, status, userId } = req.body;

  db.query('INSERT INTO Tasks (title, description, status, UserId) VALUES (?, ?, ?, ?)', [title, description, status, userId], (err, results) => {
    if (err) return res.status(500).send('There was a problem adding the task.');
    res.status(201).send(results);
  });
};
