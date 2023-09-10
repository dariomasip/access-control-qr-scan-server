#Backend

Concise description of what the backend does and its purpose in the context of the project.

## Table of Contents

- [Requirements](#requirements)
- [Settings](#settings)
- [Execution](#execution)
- [API Documentation](#api-documentation)
- [Database](#database)
- [Dependencies](#dependencies)
- [Contribution](#contribution)
- [License](#license)
- [Author](#author)

## Requirements

- Node.js 18.17.1
- MongoDB

## Setting

1. Clone the repository:

```bash
git clone https://github.com/dariomasip/elchetostaff-server.git.
```

2. Create a .env file in the root directory of the project and define the necessary environment variables:

```bash
PORT=[PORT]
MONGO_CREDENTIAL=mongodb://localhost/your-database
TOKEN=[your_secret_key]
```

3. Install the dependencies:

```bash
npm install
```

## Execution

Start the server in development mode:

```bash
npm run dev
```

Start the server in production mode:

```bash
npm start
```

## API Documentation

Below is the backend API documentation:

Base URL:

```http
https://{{your_domain}}/api/v1.0
```

### Get valid codes from an event

**Description**: Gets all valid codes for an event.

**HTTP Method**: GET.

**Path**: `/codes/valid/:concert`

**Request Parameters**:

- `concert`: ID of the event.

**Example Request**:

```http
GET https://{{your_domain}}/api/v1.0/codes/valid/64effa691db394b49e4685f6
```

**Successful Response:**

```json
{
  "_id": "64effa691db394b49e4685f6",
  "validationCodes": [
    {
      "code": "AQRC12",
      "type": "Male",
      "_id": "64fbc7ae4d7dfaeea69dfe6b"
    },
    {
      "code": "RNLZ15",
      "type": "Male",
      "_id": "64fbc7ae4d7dfaeea69dfe6c"
    }
  ]
}
```

### Get registered codes from an event

**Description**: Obtains all the codes that were registered for an event.

**HTTP Method**: GET.

**Path**: `/codes/registration/:concert`

**Request Parameters**:

- `concert`: ID of the event.

**Example Request**:

```http
GET https://{{your_domain}}/api/v1.0/codes/resgistration/64effa691db394b49e4685f6
```

**Successful Response:**

```json
{
  "_id": "64effa691db394b49e4685f6",
  "registrationCodes": [
    {
      "code": "IYHH16",
      "status": "valid",
      "type": "Female",
      "validatedAt": "2023-09-09T03:31:07.544Z",
      "reason": null,
      "_id": "64fbe6fee5b8122628433630"
    },
    {
      "code": "NBXI71",
      "status": "valid",
      "type": "Male",
      "validatedAt": "2023-09-09T03:31:23.577Z",
      "reason": null,
      "_id": "64fbe70de5b8122628433ae7"
    }
  ]
}
```

### Load code registration

**Description**: Load the registration of a scanned code.

**HTTP Method**: POST.

**Path**: `/codes/add-record/:concert`

**Request Parameters**:

- `concert`: ID of the event.

**Example Request**:

```http
GET https://{{your_domain}}/api/v1.0/codes/add-record/64effa691db394b49e4685f6
```

**Successful Response:**

```json
Code loaded successfully
```
