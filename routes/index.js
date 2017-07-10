const express = require('express');
const router  = express.Router();
const FeedParser = require('feedparser');
const request = require("request");


/* GET home page. */
router.get('/', (req, res, next) => {

  var feedparser = new FeedParser([]);



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

  var articleArray = [];

  feedparser.on('readable', function () {

      const keywords = ["tech", "code", "program", "money", "web"];
    // This is where the action is!
    var stream = this; // `this` is `feedparser`, which is a stream
    var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
    var items;


    //???????
    while (items = stream.read()) {

      let count = 0;

      keywords.forEach((keyword) => {
        var reg = new RegExp(keyword, "g");
        console.log(( typeof items.description.match(reg) || []).length);
        console.log(typeof count);
        count = count + (items.description.match(reg) || []).length;
        console.log(`________________________________ ${count}_______________________________`)
      });





      articleArray.push({
        title: items.title,
        count: count,
        uri: items.guid
      });

// console.log(items.description);
// console.log(items.title, items.guid);

      console.log("________________________________________________________________________________________________________________--");





console.log("THE NUMBER OF OCCURENCES IS " + count);

    }
console.log(articleArray);
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
