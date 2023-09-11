var express = require('express');
var router = express.Router();
const fs = require('fs');
const { type } = require('os');

/* GET home page. */
router.get('/', function (req, res) {
  fs.readdir("./upload", { withFileTypes: true }, function (err, data) {
    if (err) {
      console.log(err)
    }
    else {
      // console.log(data)
      res.render('index', { files: data });
    }
  })
});

router.get('/back', function (req, res) {
  res.redirect("back")
});

router.post('/rename/:filename', function(req, res) {
  fs.rename(`./upload/${req.params.filename}`,`./upload/${req.body.newname}`,function(err){
    if(err) res.send(err) 
    else res.redirect("back")
  })
});

router.get('/file/:filename', function (req, res) {
  fs.readdir("./upload", { withFileTypes: true }, function (err, data) {
    fs.readFile(`./upload/${req.params.filename}`, "utf8", function (err, filedata) {
      if (err) {
        console.log(err)
      }
      else {
        // console.log(data)
        res.render('opened', { files: data, elem: req.params.filename, filedata });
      }
    })

  })
});

router.post('/update/:filename', function (req, res) {
  fs.writeFile(`./upload/${req.params.filename}`, req.body.data, function (err) {
    res.redirect("back");
  })
});


router.get('/delete/:type/:filename', function (req, res) {

  if (req.params.type === "folder") {
    fs.rmdir(`./upload/${req.params.filename}`, function (err) {
      res.redirect("back");
    })
  }
  else {
    fs.unlink(`./upload/${req.params.filename}`, function (err) {
      res.redirect("back");
    })
  }

});



router.get('/newfile', function (req, res) {
  fs.writeFile(`./upload/${req.query.file}`, "", function (err) {
    if (err) res.send(err);
    else res.redirect("back");
  })
});

router.get('/folder', function (req, res) {
  fs.mkdir(`./upload/${req.query.newfolder}`, function (err) {
    if (err) res.send(err);
    else res.redirect("back");
  })
});



module.exports = router;
