const sosoreadsLib = require('sosoreads');
const faunadbLib = require('faunadb'),
  q = faunadbLib.query;



// constants
const faunaDbSecret = ''; // todo: move to credentials file
const goodreadsDeveloperKey = ''; // todo: move to credentials file
const pageSize = 3;
const goodreadsUserIds = ['4812558'];

const sosoreadsOptions = {
    "goodreads_developer_key": goodreadsDeveloperKey
};
const sosoreads = sosoreadsLib(sosoreadsOptions);
const faunadb = new faunadbLib.Client({ secret: faunaDbSecret })



// main flow
saveUsersReviews()
    .then(results => {
        console.log(results);
    })
    .catch(err => {
        console.log(err);
    });



// functions
function createAuthor (sosoAuthor) {
    return {
        "averageRating": sosoAuthor.ratings.average,
        "goodreadsId": sosoAuthor.id,
        "goodreadsUrl": sosoAuthor.url,
        "name": sosoAuthor.name,
        "ratingsCount": sosoAuthor.ratings.count
    };
};

function createBook (review) {
    return {
        "authorIds": [1234567890],
        "descriptions": {
            "short": "This groundbreaking English version by Robert Fagles is the most important recent translation of Homer's great epic poem.",
            "full": "This groundbreaking English version by Robert Fagles is the most important recent translation of Homer's great epic poem. The verse translation has been hailed by scholars as the new standard, providing an Iliad that delights modern sensibility and aesthetic without sacrificing the grandeur and particular genius of Homer's own style and language. The Iliad is one of the two great epics of Homer, and is typically described as one of the greatest war stories of all time, but to say the Iliad is a war story does not begin to describe the emotional sweep of its action and characters: Achilles, Helen, Hector, and other heroes of Greek myth and history in the tenth and final year of the Greek siege of Troy."
        },
        "goodreadsId": "117929",
        "goodreadsUrl": "https://www.goodreads.com/book/show/117929.The_Iliad",
        "id": "2345678901",
        "images": {
            "large": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1482528464l/117929._SX98_.jpg",
            "small": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1482528464l/117929._SY75_.jpg"
        },
        "isbn": "0140445927",
        "isbn13": "9780140445923",
        "originalPublicationYear": "-750",
        "pageCount": 683,
        "ratings": {
            "average": "3.87",
            "count": 346167,
            "distribution": {
                "five": 115210,
                "four": 113155,
                "three": 83415,
                "two": 24967,
                "one": 9420
            }
        },
        "series": [{
            "count": 8,
            "name": "Epic Cycle",
            "positionInSeries": 2
        }],
        "title": "The Iliad"
    };
}

function createSeries (review) {
    return {
        "authorId": "123",
        "bestBookId": "123456",
        "bookCount": "16",
        "description": "P.G. Wodehouse's series of comic novels featuring young British dilettante Bertram \"Bertie\" Wooster, and his wry valet Jeeves, who is often the cause of his salvation from increasingly entangled social situations.",
        "goodreadsId": "52643",
        "id": "52643",
        "title": "Jeeves"
    };
}

function createShelf (sosoShelf) {
    return {
        "goodreadsId": sosoShelf.id,
        "name": sosoShelf.name
    };
}

function createReview (review) {
    return {
        "bookId": "2345678901",
        "owned": false,
        "review": {
            "body": "I'm a fan of the bad book club podcast 372 Pages We'll Never Get Back, and a fan of many of the books they've covered. I built a fan-fiction Choose Your Own Adventure game (372adventure.com). I wrote a 3,212 word review of Trucking through Time, the highest-rated review of Trucking through Time on Goodreads. We've invited friends over for an Eye of Argon reading party.<br /><br />I don't say any of this to brag. I say it so that you can fully understand the following statement: Moon People is the greatest of them all. I didn't think I could love a 1-star book more than Trucking through Time, but I was wrong. So very wrong.<br /><br />It's like Dale M. Courtney studied me secretly for years, learning all about me, and then wrote Moon People solely to make me happy.<br /><br />The main quirk is that DMC must have written the book with text to speech software. That's the only explanation for the lack of commas and quotation marks, and all the homophones. But it would take me far more than 80 pages to catalog everything I like about Moon People, because every sentence is bad in an amazing new way. You really have to read it yourself. Here's just a taste:<br /><br />The main character David talking to the spaceship admiral: <br /><br /> By the way did you realize that Monday was Halloween. Yes sir, I know, it does bother me a little bit. You have until then to change your mind. You are going to have to be here a good 24 hours earlier for launch preparations and a quick health check up. Then after that the only thing you are going to see is the stars. Don't worry I'll be there right along side of you? That's my flight too. Great. The truth about it is I am a little scared of that shuttle launch to the base station especially on Halloween. But I think I will be all right after that. Good Captain Braymer because you and I are going on one hell of a ride Monday morning, trick or treat. I will show you wonders you always dreamed about. That's pretty cool sir. I can't wait.<br /><br />Romance:<br /><br /> She leaned in toward David and they kissed passionately for about a minute and then stopped.<br /><br />First contact with alien life:<br /><br /> If you like asparagus then I bet you'll like to try some of these. We call this a baked potato. We stir it up into a soft pudding and then we add butter and salt. Potatoes also grow well in space. I hope you will like it. Captain Tudmoke replied, I believe I will try it. MMM that's good. We have something like this on our planet its called stemage.<br /><br />The Burj Khalifa, the Mona Lisa, the crack cocaine of bad books.",
            "dates": {
                "add": "2020-02-16T11:33:07-08:00",
                "end": "2020-03-04",
                "start": "2020-02-16",
                "update": "2020-03-04T19:54:53-08:00"
            },
            "goodreadsId": "3193280293",
            "goodreadsUrl": "https://www.goodreads.com/review/show/3193280293",
            "isSpoiler": false,
            "rating": 1,
            "readCount": 1
        },
        "shelfIds": ["3456789012"],
        "userId": "5678901234"
    };
}

async function getAuthorRefsAsync (sosoAuthors) {
    let authors = [];

    for (const sosoAuthor of sosoAuthors) {
        let doesExist = false;
        
        if (doesExist) {
            console.log('author exists');
            // if author exists, get authorid.
        }
        else {
            // if author doesn't exist, insert it
            let author = createAuthor(sosoAuthor);
            console.log(author);
            let response = await faunadb.query(
                q.Create(
                    q.Collection('Author'),
                    { data: author },
                ));
            console.log(`Create author: ${response.ref}`);
            authors.push(response.ref);
        }
    };

    console.log(`Author count: ${authors.length}`);
    return authors;
}

async function getBookIdAsync (review) {
    // if author exists, get authorid. if author doesn't exist, insert it
    // let authorId = await getAuthorIdAsync(review);
    // console.log(`Author ID: ${authorId}`);
    
    // if series exists, get seriesid. if series doesn't exist, insert it
    // if bookseries exists, get bookseriesid. if bookseries doesn't exist, insert it

    // create book
}

async function getShelfRefsAsync (sosoShelves) {
    let shelves = [];

    for (const sosoShelf of sosoShelves) {
        let getResponse = await faunadb.query(
            q.Map(
                q.Paginate(
                    q.Match(q.Index("shelvesByGoodreadsId"), sosoShelf.id)
                ),
                q.Lambda("X", q.Get(q.Var("X")))));
                    
        let doesExist = getResponse.data.length > 0;
        if (doesExist) {
            shelves.push(getResponse.data[0].ref);
        }
        else {
            // if shelf doesn't exist, insert it
            let createResponse = await faunadb.query(
                q.Create(
                    q.Collection('Shelf'),
                    { data: {
                        "type": q.Ref(q.Collection("ShelfType"), "294435424391135754"),
                        "goodreadsId": sosoShelf.id,
                        "name": sosoShelf.name
                    }},
                )
            );
            console.log(`Create shelf ${sosoShelf.name}: ${createResponse.ref}`);
            shelves.push(createResponse.ref);
        }
    };

    console.log(`Shelf count: ${shelves.length}`);
    return shelves;
}
        
async function getUserBookIdAsync (review) {
    let doesExist = false;
    if (doesExist) {
        console.log('user book exists');
        // if user book exists, return user book id
    }
    else {
        // if authors don't exist, insert them
        let authorRefs = await getAuthorRefsAsync(review.book.authors);

        // if shelves exist, get shelfids. if shelves don't exist, insert them
        let shelfRefs = await getShelfRefsAsync(review.book.shelves);
        
        // if book exists, get bookid. if book doesn't exist, insert it

        // create user book
    }
}

async function saveUserReviewsAsync (goodreadsUserId) {
    let isSaveComplete = false;
    let page = 0;
    
    // loop saving a page of reviews until all are saved
    while (!isSaveComplete) {
        page += 1;
        const reviewsOptions = {
            "userId": goodreadsUserId,
            "paging": {
                "count": pageSize,
                "number": page
            },
            "shelf": "read"
        };

        // get page of reviews from Goodreads
        await sosoreads.getReviews(reviewsOptions)
            .then(async response => {
                // loop through reviews
                response.reviews.forEach(async review => {
                    console.log(`review id: ${review.id}`);
                    
                    // check if review exists in Fauna
                    // faunadb.query(
                    //     q.Match(
                    //         q.Ref("indexes/all_links")
                    //     )
                    // )
                    // .then( response => { ... })
                    let doesReviewExist = false;
                    if (doesReviewExist) {
                        console.log('review exists');
                        // if changes, update
                        // if no change, break from loop
                    }
                    else {
                        // if userbook exists, get userbookid. if userbook doesn't exist, insert it
                        let userBookId = await getUserBookIdAsync(review);

                        // insert review
                        console.log(`todo: insert review`);
                    }
                });

                isSaveComplete = true;
            });

        // if every review in the page was new, save next page of reviews and loop again
        await sleep(1000);
    }

    return page;
};

function saveUsersReviews () {
    let saveUserReviewsArray = [];
    goodreadsUserIds.forEach(userId => saveUserReviewsArray.push(saveUserReviewsAsync(userId)));
    return Promise.all(saveUserReviewsArray);
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
} 
