# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "bas",
  "password": "secret",
  "name": "Bas Eliazt"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "bas",
    "name": "Bas Eliazt"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username must not blank"
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "bas",
  "password": "secret"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "bas",
    "name": "Bas Eliazt",
    "token": "asdkoa"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username or password wrong"
}
```

## Get User

Endpoint : GET /api/users/current

Request Header:
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data": {
    "username": "bas",
    "name": "Bas Eliazt",
    "token": "asdkoa"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```

## Update User

Endpoint : PATCH /api/users

Request Header:
- X-API-TOKEN : token

Request Body :

```json
{
  "username": "bas", // not required
  "password": "secret", // not required
  "name": "baskoro" // not required
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "bas",
    "name": "Bas Eliazt",
    "token": "asdkoa"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User

Endpoint : DELETE /api/users

Request Header:
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data": "OK"
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```