# Image Repository Back End

Expandable Node.js/Express.js back end for image repository.

Built by M Groesbeck, 2020-2021, with MIT license.

## Contents
### [API Endpoints](#Endpoints)
### [DB Schema](#DB)

## <a name="Endpoints"></a>Endpoints

### Base API URL
/api

| URL            | Request | JWT required? | Description |
|----------------|---------|---------------|----------------------------------------------|
| [/image/](#GET/api/image)        | GET | YES | Return data for filtered images uploaded by logged-in user or set as public |
| [/image/](#POST/api/image)        | POST | YES | Upload new image |
| [/image/:id](#GET/api/image/:id)     | GET | YES | Download image if uploaded by logged-in user or set as public |
| [/image/:id](#DELETE/api/image/:id)     | DELETE | YES | Deletes image if uploaded by logged-in user |
| [/user/login](#POST/api/user/login)    | POST | NO | Log in existing user |
| [/user/register](#POST/api/user/register) | POST | NO | Register new user |

## Request Formats:

### <a name="GET/api/image"></a>GET /api/image
```json
    {
        "headers": {
            "Authorization": "token(string)"
        }
    }
```

Returns:
```json
    {
        "images": "array of image data JSON objects"
    }
```

### <a name="POST/api/image"></a>POST /api/image
```json
    {
        "headers": {
            "Authorization": "token(string)"
        },
        "image": "image",
        "public": "integer (0=private)",
        "metadata": "JSON object"
    }
```

### <a name="GET/api/image/:id"></a>GET /api/image/:id
```json
    {
        "headers": {
            "Authorization": "token(string)"
        }
    }
```

Returns image as res.download

### <a name="DELETE/api/image/:id"></a>DELETE /api/image/:id
```json
    {
        "headers": {
            "Authorization": "token(string)"
        }
    }
```

### <a name="POST/api/user/login"></a>POST /api/user/login
```json
    {
        "username": "string",
        "password": "string (plaintext)"
    }
```

Returns: 
```json
    {
        "user": "JSON object",
        "token": "string"
    }
```

### <a name="POST/api/user/register"></a>POST /api/user/register
```json
    {
        "username": "string",
        "password": "string (plaintext)",
        "email": "string"
    }
```

Returns: 
```json
    {
        "user": "JSON object",
        "token": "string"
    }
```

## <a name="DB"></a>Database Schema

### image
| Name | Type | Required | Unique | Notes |
|------|------|----------|--------|-------|
| id | integer | YES | YES | Primary key assigned by DB |
| user_id | int |YES | NO | Foreign key for "id" in "user" table |
| file_uuid | uuid | YES | | Used internally by back end as filename |
| public | integer | YES | NO | 0 if private; defaults to 0 |
| metadata | JSON object | NO | NO | Currently only searchable by exact match |

### user
| Name | Type | Required | Unique | Notes |
|------|------|----------|--------|-------|
| id | integer | YES | YES | Primary key assigned by DB |
| username | string | YES | YES | User name |
| email | string | YES | NO | User email |
| password | string | YES | NO | Password (stored hashed) |