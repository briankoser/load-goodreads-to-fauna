# load-goodreads-to-fauna
Load Goodreads data to FaunaDB. 

Will run in an AWS Lambda function for kodex.

All Goodreads shelves are saved as reviewTags; creating a bookTag is a manual process.

## Loading FaunaDB manually example
```
Map(
    [{
        "name": "ReadYear",
        "scope": "USER"
    }],
    Lambda(
      'shelf_type',
      Create(
        Collection('ShelfType'),
        { data: Var('shelf_type') },
      )
    )
)
```