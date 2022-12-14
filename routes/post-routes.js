const express = require('express')
const router = express.Router()
const {
  getPost,
  getPosts,
  deletePost,
  addPost,
  getEditPost,
  getAddPost,
  editPost
} = require('../controllers/post-controller')

router.get('/posts/:id', getPost)
router.delete('/posts/:id', deletePost)
router.get('/posts', getPosts)
router.post('/add-post', addPost)
router.get('/add-post', getAddPost)
router.get('/edit/:id', getEditPost)
router.put('/edit/:id', editPost)

module.exports = router
