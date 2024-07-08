# Address API Spec

## Create Address

Endpoint : POST /api/contacts/:idContact/addresses

Request Header:

- X-API-TOKEN : token

Request Body

```json
{
  "street": "street",
  "city": "city",
  "province": "province",
  "postal_code": "12345"
}
```

Response Body (Success)

```json
{
  "data": {
    "id": 1,
    "street": "street",
    "city": "city",
    "province": "province",
    "postal_code": "12345"
  }
}
```

Response Body (Failed)

```json
{
  "errors": "postal code must not blank"
}
```

## Get Address

Endpoint : GET /api/contacts/:idContact/addresses/:idAddresses

Request Header:

- X-API-TOKEN : token

Response Body (Success)

```json
{
  "data": {
    "id": 1,
    "street": "street",
    "city": "city",
    "province": "province",
    "postal_code": "12345"
  }
}
```

Response Body (Failed)

```json
{
  "errors": "idAddresses is required"
}
```

## Update Address

Endpoint : PUT /api/contacts/:idContact/addresses/:idAddresses

Request Header:

- X-API-TOKEN : token

Request Body

```json
{
  "street": "street",
  "city": "city",
  "province": "province",
  "postal_code": "12345"
}
```

Response Body (Success)

```json
{
  "data": {
    "id": 1,
    "street": "street",
    "city": "city",
    "province": "province",
    "postal_code": "12345"
  }
}
```

Response Body (Failed)

```json
{
  "errors": "postal code must not blank"
}
```

## Remove Address

Endpoint : DELETE /api/contacts/:idContact/addresses/:idAddresses

Request Header:

- X-API-TOKEN : token

Response Body (Success)

```json
{
  "data": "OK"
}
```

Response Body (Failed)

```json
{
  "errors": "idAddresses must not blank"
}
```

## List Address

Endpoint : GET /api/contacts/:idContact/addresses

Request Header:

- X-API-TOKEN : token

Response Body (Success)

```json
{
  "data": [
    {
      "id": 1,
      "street": "street",
      "city": "city",
      "province": "province",
      "postal_code": "12345"
    }
  ]
}
```

Response Body (Failed)

```json
{
  "errors": "Contact is not found"
}
```
