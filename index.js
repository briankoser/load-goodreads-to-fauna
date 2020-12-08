const sosoreads = require('sosoreads');



// constants
const goodreadsDeveloperKey = '';
const pageSize = 3;
const userIds = ['4812558'];

const sosoreadsOptions = {
    "goodreads_developer_key": goodreadsDeveloperKey
};
const api = sosoreads(sosoreadsOptions);



// main flow
loadUsers().then(results => {
    console.log(results);
}).catch(err => {
    console.log(err);
});



// functions
async function loadUser (userId) {
    // loop loading a page of reviews
    let isLoadComplete = false;
    let page = 0;
    
    while (!isLoadComplete) {
        // load reviews
        page += 1;
        const reviewsOptions = {
            "userId": userId,
            "paging": {
                "count": pageSize,
                "number": page
            },
            "shelf": "read"
        };

        await api.getReviews(reviewsOptions)
            .then(response => {
                // loop through reviews
                response.reviews.forEach(review => {
                    console.log(review.book.title);
                    // check if review exists in Fauna
                    // if exists
                        // if changes, update
                        // if no change, break from loop
                    // if doesn't exist
                        // if author exists, get authorid. if author doesn't exist, insert it
                        // Author
                        // {
                        //     "averageRating": "4.08",
                        //     "dates": {
                        //         "born": "1948-04-04",
                        //         "died": "2024-07-09"
                        //     },
                        //     "gender": "male",
                        //     "goodreadsId": "2687",
                        //     "goodreadsUrl": "https://www.goodreads.com/author/show/2687.Dan_Simmons",
                        //     "id": "1234567890",
                        //     "name": "Dan Simmons",
                        //     "ratingsCount": 4184744
                        // }


                        // if book exists, get bookid. if book doesn't exist, insert it
                        // Book
                        // {
                        //     "authorIds": [1234567890],
                        //     "descriptions": {
                        //         "short": "This groundbreaking English version by Robert Fagles is the most important recent translation of Homer's great epic poem.",
                        //         "full": "This groundbreaking English version by Robert Fagles is the most important recent translation of Homer's great epic poem. The verse translation has been hailed by scholars as the new standard, providing an Iliad that delights modern sensibility and aesthetic without sacrificing the grandeur and particular genius of Homer's own style and language. The Iliad is one of the two great epics of Homer, and is typically described as one of the greatest war stories of all time, but to say the Iliad is a war story does not begin to describe the emotional sweep of its action and characters: Achilles, Helen, Hector, and other heroes of Greek myth and history in the tenth and final year of the Greek siege of Troy."
                        //     },
                        //     "goodreadsId": "117929",
                        //     "goodreadsUrl": "https://www.goodreads.com/book/show/117929.The_Iliad",
                        //     "id": "2345678901",
                        //     "images": {
                        //         "large": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1482528464l/117929._SX98_.jpg",
                        //         "small": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1482528464l/117929._SY75_.jpg"
                        //     },
                        //     "isbn": "0140445927",
                        //     "isbn13": "9780140445923",
                        //     "originalPublicationYear": "-750",
                        //     "pageCount": 683,
                        //     "ratings": {
                        //         "average": "3.87",
                        //         "count": 346167,
                        //         "distribution": {
                        //             "five": 115210,
                        //             "four": 113155,
                        //             "three": 83415,
                        //             "two": 24967,
                        //             "one": 9420
                        //         }
                        //     },
                        //     "series": [{
                        //         "count": 8,
                        //         "name": "Epic Cycle",
                        //         "positionInSeries": 2
                        //     }],
                        //     "title": "The Iliad"
                        // }

                        // if series exists, get seriesid. if series doesn't exist, insert it
                        // Series
                        // {
                        //     "authorId": "123",
                        //     "bestBookId": "123456",
                        //     "bookCount": "16",
                        //     "description": "P.G. Wodehouse's series of comic novels featuring young British dilettante Bertram \"Bertie\" Wooster, and his wry valet Jeeves, who is often the cause of his salvation from increasingly entangled social situations.",
                        //     "goodreadsId": "52643",
                        //     "id": "52643",
                        //     "title": "Jeeves"
                        // }

                        // if shelf exists, get shelfid. if shelf doesn't exist, insert it
                        // Shelf
                        // {
                        //     "exclusive": true,
                        //     "id": "3456789012",
                        //     "goodreadsId": "15377251",
                        //     "name": "read"
                        // }

                        // insert review
                        // Review
                        // {
                        //     "bookId": "2345678901",
                        //     "owned": false,
                        //     "review": {
                        //         "body": "I'm a fan of the bad book club podcast 372 Pages We'll Never Get Back, and a fan of many of the books they've covered. I built a fan-fiction Choose Your Own Adventure game (372adventure.com). I wrote a 3,212 word review of Trucking through Time, the highest-rated review of Trucking through Time on Goodreads. We've invited friends over for an Eye of Argon reading party.<br /><br />I don't say any of this to brag. I say it so that you can fully understand the following statement: Moon People is the greatest of them all. I didn't think I could love a 1-star book more than Trucking through Time, but I was wrong. So very wrong.<br /><br />It's like Dale M. Courtney studied me secretly for years, learning all about me, and then wrote Moon People solely to make me happy.<br /><br />The main quirk is that DMC must have written the book with text to speech software. That's the only explanation for the lack of commas and quotation marks, and all the homophones. But it would take me far more than 80 pages to catalog everything I like about Moon People, because every sentence is bad in an amazing new way. You really have to read it yourself. Here's just a taste:<br /><br />The main character David talking to the spaceship admiral: <br /><br /> By the way did you realize that Monday was Halloween. Yes sir, I know, it does bother me a little bit. You have until then to change your mind. You are going to have to be here a good 24 hours earlier for launch preparations and a quick health check up. Then after that the only thing you are going to see is the stars. Don't worry I'll be there right along side of you? That's my flight too. Great. The truth about it is I am a little scared of that shuttle launch to the base station especially on Halloween. But I think I will be all right after that. Good Captain Braymer because you and I are going on one hell of a ride Monday morning, trick or treat. I will show you wonders you always dreamed about. That's pretty cool sir. I can't wait.<br /><br />Romance:<br /><br /> She leaned in toward David and they kissed passionately for about a minute and then stopped.<br /><br />First contact with alien life:<br /><br /> If you like asparagus then I bet you'll like to try some of these. We call this a baked potato. We stir it up into a soft pudding and then we add butter and salt. Potatoes also grow well in space. I hope you will like it. Captain Tudmoke replied, I believe I will try it. MMM that's good. We have something like this on our planet its called stemage.<br /><br />The Burj Khalifa, the Mona Lisa, the crack cocaine of bad books.",
                        //         "dates": {
                        //             "add": "2020-02-16T11:33:07-08:00",
                        //             "end": "2020-03-04",
                        //             "start": "2020-02-16",
                        //             "update": "2020-03-04T19:54:53-08:00"
                        //         },
                        //         "goodreadsId": "3193280293",
                        //         "goodreadsUrl": "https://www.goodreads.com/review/show/3193280293",
                        //         "isSpoiler": false,
                        //         "rating": 1,
                        //         "readCount": 1
                        //     },
                        //     "shelfIds": ["3456789012"],
                        //     "userId": "5678901234"
                        // }
                });

                isLoadComplete = true;
            });

        // if every review in the page was new, load next page of reviews and loop again
    }

    return page;
};

function loadUsers () {
    let loadUserArray = [];
    userIds.forEach(userId => loadUserArray.push(loadUser(userId)));
    return Promise.all(loadUserArray);
}