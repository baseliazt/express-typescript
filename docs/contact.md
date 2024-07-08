# Contact API Spec

## Create Contact

Endpoint : POST /api/contacts

Request Header:

- X-API-TOKEN : token

Request Body

```json
{
  "first_name": "Bas",
  "last_name": "Eliazt",
  "email": "baseliazt@gmail.com",
  "phone": "081117479812"
}
```

Response Body (Success)

```json
{
  "data": {
    "id": 1,
    "first_name": "Bas",
    "last_name": " Eliazt",
    "email": "baseliazt@gmail.com",
    "phone": "081117479812"
  }
}
```

Response Body (Failed)

```json
{
  "errors": "first name must not blank"
}
```

## Get Contact

Endpoint : GET /api/contacts/:id

Request Header:

- X-API-TOKEN : token

Response Body (Success)

```json
{
  "data": {
    "id": 1,
    "first_name": "Bas",
    "last_name": " Eliazt",
    "email": "baseliazt@gmail.com",
    "phone": "081117479812"
  }
}
```

Response Body (Failed)

```json
{
  "errors": "Contact is not found"
}
```

## Update Contact

Endpoint : PUT /api/contacts/:id

Request Header:

- X-API-TOKEN : token

Request Body

```json
{
  "first_name": "Bas",
  "last_name": "Eliazt",
  "email": "baseliazt@gmail.com",
  "phone": "081117479812"
}
```

Response Body (Success)

```json
{
  "data": {
    "id": 1,
    "first_name": "Bas",
    "last_name": " Eliazt",
    "email": "baseliazt@gmail.com",
    "phone": "081117479812"
  }
}
```

Response Body (Failed)

```json
{
  "errors": "Contact is not found"
}
```

## Remove Contact

Endpoint : DELETE /api/contacts/:id

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
  "errors": "Contact is not found"
}
```

## Search Contact

Endpoint : GET /api/contacts

Query Parameter:

- name: string, contact first name or contact last name (optional)
- phone: string, contact phone (optional)
- email: string, contact email (optional)
- page: number, default 1
- size: number, default 10

Request Header:

- X-API-TOKEN : token

Response Body (Success)

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Bas",
      "last_name": " Eliazt",
      "email": "baseliazt@gmail.com",
      "phone": "081117479812"
    },
    {
      "id": 2,
      "first_name": "Bas",
      "last_name": " Eliazt",
      "email": "baseliazt@gmail.com",
      "phone": "081117479812"
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
