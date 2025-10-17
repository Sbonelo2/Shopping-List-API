# Shopping List API

A RESTful API built with Node.js and TypeScript for managing shopping list items. This API allows you to create, read, update, and manage shopping items with their quantities and purchase status.

## Features

- ✅ Create new shopping items
- ✅ Get all shopping items
- ✅ Get a specific item by ID
- ✅ Update item details (name, quantity, purchased status)
- ✅ Delete shopping items
- ✅ Full input validation
- ✅ Centralized error handling
- ✅ Consistent JSON response structure
- ✅ TypeScript for type safety
- ✅ RESTful API design

## Tech Stack

- **Node.js** - Runtime environment
- **TypeScript** - Type-safe JavaScript
- **HTTP Module** - Built-in Node.js HTTP server
- **Nodemon** - Development auto-reload
- **ts-node** - TypeScript execution

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Sbonelo2/Shopping-List-API.git
cd Shopping-List-API-3
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:4000`

## Response Structure

All API responses follow a consistent JSON structure:

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ }
}
```

### Success Message Response
```json
{
  "success": true,
  "message": "Operation completed successfully"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

## API Endpoints

### Base URL
```
http://localhost:4000
```

### 1. Get All Items
**GET** `/items`

Returns all shopping list items.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 0,
      "name": "Apples",
      "quantity": 5,
      "purchasedStatus": false
    }
  ]
}
```

### 2. Get Item by ID
**GET** `/items/:id`

Returns a specific item by its ID.

**Parameters:**
- `id` (number) - Item ID

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 0,
    "name": "Apples",
    "quantity": 5,
    "purchasedStatus": false
  }
}
```

**Error Responses:**
- `400` - Invalid item ID
```json
{
  "success": false,
  "error": "Invalid item ID"
}
```
- `404` - Item not found
```json
{
  "success": false,
  "error": "Item not found"
}
```

### 3. Create New Item
**POST** `/items`

Creates a new shopping list item.

**Request Body:**
```json
{
  "name": "Apples",
  "quantity": 5,
  "purchasedStatus": false
}
```

**Validation Rules:**
- `name` (required, string) - Item name
- `quantity` (required, number) - Item quantity
- `purchasedStatus` (required, boolean) - Purchase status

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 0,
    "name": "Apples",
    "quantity": 5,
    "purchasedStatus": false
  }
}
```

**Error Responses:**
- `400` - Validation error or invalid JSON
```json
{
  "success": false,
  "error": "Name is required and must be a string"
}
```

### 4. Update Item
**PUT** `/items/:id`

Updates an existing item. All fields are optional, but at least one must be provided.

**Parameters:**
- `id` (number) - Item ID

**Request Body (all fields optional):**
```json
{
  "name": "Green Apples",
  "quantity": 10,
  "purchasedStatus": true
}
```

**Validation Rules:**
- `name` (optional, string) - Updated item name
- `quantity` (optional, number) - Updated quantity
- `purchasedStatus` (optional, boolean) - Updated purchase status
- At least one field must be provided

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 0,
    "name": "Green Apples",
    "quantity": 10,
    "purchasedStatus": true
  }
}
```

**Error Responses:**
- `400` - Invalid item ID, validation error, or no fields provided
```json
{
  "success": false,
  "error": "At least one field (name, quantity, or purchasedStatus) must be provided"
}
```
- `404` - Item not found
```json
{
  "success": false,
  "error": "Item not found"
}
```

### 5. Delete Item
**DELETE** `/items/:id`

Deletes an existing item by its ID.

**Parameters:**
- `id` (number) - Item ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "Item deleted successfully"
}
```

**Error Responses:**
- `400` - Invalid item ID
```json
{
  "success": false,
  "error": "Invalid item ID"
}
```
- `404` - Item not found
```json
{
  "success": false,
  "error": "Item not found"
}
```

## Example Usage

### Using cURL

**Create an item:**
```bash
curl -X POST http://localhost:4000/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Bananas","quantity":3,"purchasedStatus":false}'
```

**Get all items:**
```bash
curl http://localhost:4000/items
```

**Get item by ID:**
```bash
curl http://localhost:4000/items/0
```

**Update an item:**
```bash
curl -X PUT http://localhost:4000/items/0 \
  -H "Content-Type: application/json" \
  -d '{"quantity":5,"purchasedStatus":true}'
```

**Delete an item:**
```bash
curl -X DELETE http://localhost:4000/items/0
```

### Using JavaScript Fetch

```javascript
// Create an item
fetch('http://localhost:4000/items', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Milk',
    quantity: 2,
    purchasedStatus: false
  })
})
  .then(res => res.json())
  .then(data => console.log(data));

// Update an item
fetch('http://localhost:4000/items/0', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    purchasedStatus: true
  })
})
  .then(res => res.json())
  .then(data => console.log(data));

// Delete an item
fetch('http://localhost:4000/items/0', {
  method: 'DELETE'
})
  .then(res => res.json())
  .then(data => console.log(data));
```

## Project Structure

```
Shopping-List-API-3/
├── src/
│   ├── controller/
│   │   └── items.ts          # Business logic for items
│   ├── routes/
│   │   └── items.ts          # Route handlers
│   ├── types/
│   │   └── items.ts          # TypeScript interfaces
│   ├── utils/
│   │   └── response.ts       # Response helpers & error handlers
│   └── server.ts             # Server entry point
├── package.json
├── tsconfig.json
└── README.md
```

## Development

### Scripts

- `npm run dev` - Start development server with auto-reload

### Data Storage

Currently, the API stores data in memory. Data will be lost when the server restarts. For persistent storage, consider integrating a database like MongoDB, PostgreSQL, or SQLite.

## Error Handling

The API uses centralized error handling with consistent response structures. All errors return a JSON object with `success: false` and an `error` message.

### HTTP Status Codes

- `200` - Success (GET, PUT, DELETE)
- `201` - Created (POST)
- `400` - Bad Request (validation errors, invalid JSON, invalid ID)
- `404` - Not Found (item doesn't exist)
- `405` - Method Not Allowed (unsupported HTTP method)

### Common Error Types

**Bad Request (400)**
- Invalid item ID
- Missing required fields
- Invalid data types
- Invalid JSON payload

**Not Found (404)**
- Item with specified ID doesn't exist

**Method Not Allowed (405)**
- Unsupported HTTP method on endpoint

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC

## Author

Sbonelo2

## Repository

[https://github.com/Sbonelo2/Shopping-List-API](https://github.com/Sbonelo2/Shopping-List-API)


<img src="https://socialify.git.ci/Sbonelo2/Shopping-List-API/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="Shopping-List-API" width="640" height="320" />