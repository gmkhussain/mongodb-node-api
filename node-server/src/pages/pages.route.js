const express = require('express')
const router = express.Router()
const Page = require('./pages.model')

const currentDateTime = require('../util/_date')





// List API with Pagination
async function pagesWithPagination(pageSize=1, page=1) {
  const pages = await Page.find({}).limit(pageSize).skip(pageSize * page);;
  // console.log('Page:::', pages);
  return pages;
}

// Getting all
router.get('/', async (req, res) => {

  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.setHeader('access-control-expose-headers', '*' );
  res.setHeader('total', (await Page.find()).length );
  res.setHeader('total_pages', Math.ceil( 
                                  ( (await Page.find()).length ) / pageSize )
                                );


  try {
    const pagesList = await pagesWithPagination(pageSize, page);
    res.json( pagesList )
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})




// Search Route
router.post('/find', async (req, res) => {
  Page.find({}, {
          title: req.body.title
        }, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
})




// Getting One
router.get('/:id', getPage, (req, res) => {
  res.json(res.page)
})





// Creating Page
router.post('/create', async (req, res) => {
  
  const users = new Page({
    title: req.body.title,
    content: req.body.content,
    status: '1'
  })

  try {
    const newPage = await pages.save()
    res.status(201).json(newPage)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})







// Updating One
router.patch('/:id', getPage, async (req, res) => {

  if (req.body.title != null) {
    res.user.title = req.body.title
  }

  if (req.body.content != null) {
    res.user.content = req.body.content
  }


  try {
    const updatedPage = await res.page.save()
    res.json(updatedPage)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }

})






// Deleting One
router.delete('/:id', getPage, async (req, res) => {
  try {
    await res.page.remove()
    res.json({ message: 'Deleted user', info: res.page  })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})





async function getPage(req, res, next) {
  let page
  try {
    page = await Page.findById(req.params.slug)
    if (page == null) {
      return res.status(404).json({ message: 'Cannot find page' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.page = page
  next()
}




module.exports = router