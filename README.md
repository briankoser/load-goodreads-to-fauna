# load-goodreads-to-fauna
Load Goodreads data to FaunaDB. 

Will run in an AWS Lambda function for kodex.

All Goodreads shelves are saved as reviewTags; creating a bookTag is a manual process.

## Examples
### Creating collection
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

### Truncating collection
```
Map(
  Paginate(Documents(Collection("Shelf"))),
  Lambda("X", Delete(Var("X")))
)
```