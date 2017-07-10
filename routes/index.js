const express = require('express');
const router  = express.Router();
const FeedParser = require('feedparser');
const request = require("request");


/* GET home page. */
router.get('/', (req, res, next) => {

  var feedparser = new FeedParser([]);
  const keywords = ["tennis", "baseball", "programming", "soylent", "norway"];


class Feed {
  constructor(uri){
    this.uri = uri;
  }

  launch (){

  const rssReq = request(this.uri);


  rssReq.on("error", (err) => {

    res.render('index', {
      result: err
    })
  });

  rssReq.on('response', (res) => {
    // console.log(this);
    var stream = rssReq; // `this` is `req`, which is a stream

    if (res.statusCode !== 200) {
      this.emit('error', new Error('Bad status code'));
    }
    else {

      rssReq.pipe(feedparser);
    }
  });

  feedparser.on('error', function (error) {
    // always handle errors
  });

  feedparser.on('readable', function () {
    // This is where the action is!
    var stream = this; // `this` is `feedparser`, which is a stream
    var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
    var item;
//???????
    while (item = stream.read()) {
      console.log(item);
      console.log("________________________________________________________________________________________________________________--");
    }
  });



  }



}


const blah = new Feed("https://medium.com/feed/free-code-camp");
blah.launch();


  res.render('index');
});



// function batshitcrazy(){
//
//   console.log(this);
//   console.log("blah");
// }
// batshitcrazy();

module.exports = router;
