const express = require("express");
const router = express.Router();
const Item = require("../../models/itemModel");

router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    completed: false
  })
  newItem.save((err, item) => {
    if (err) {
      res.send(`Error saving document: ${err}`)
    } else {
      
      res.json({ item });
    }
  });
});

router.put('/:id', (req, res) => {
  Item.findById(req.params.id, (err, item) => {
    if (err) {
      res.send(`Error saving document: ${err}`)
    } else {
      item.finished = !item.finished;
      item.save((err, item) => {
        if (err) {
          res.send(`Error saving document: ${err}`)
        } else {
          
          res.json({ item })
        }
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  Item.findByIdAndDelete(req.params.id, (err, todo) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      res.status(200).json({ success: true })
    }
  })
})

module.exports = router;