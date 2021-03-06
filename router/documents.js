const router = require('express').Router();
const {
  createDocument,
  deleteDocument,
  getDocuments,
  patchDocument,
} = require('../controllers/documents');

router.get('/', getDocuments);
router.post('/', createDocument);
router.delete('/:id', deleteDocument);
router.patch('/', patchDocument);

module.exports = router;
