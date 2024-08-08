# MeowMeow API Documentation

## Overview

The MeowMeow API provides a simple and robust interface for managing MeowMeows. This API allows you to perform CRUD (Create, Read, Update, Delete) operations on MeowMeow records. The API is designed with RESTful principles in mind, making it easy to use and extend in the long term.

## Base URL
All API endpoints are prefixed with the base URL:
```bash
http://localhost:8080/api/v1
```

## Endpoints

1. **Get All MeowMeows**:
- Endpoint: `/meow-meows`
- Method: `"GET"`
- Description: Retrieves a list of all MeowMeows.
- Response:
    - `200 OK`: Returns a JSON array of MeowMeows.
    ```json
        [
            { "type": "bank-draft", "title": "Bank Draft", "position": 0, "thumbnail": "/meow-meow/bank-draft.gif" },
            { "type": "bill-of-lading", "title": "Bill of Lading", "position": 1, "thumbnail": "/meow-meow/bill-of-lading.gif" },
            { "type": "invoice", "title": "Invoice", "position": 2, "thumbnail": "/meow-meow/invoice.gif" },
            { "type": "bank-draft-2", "title": "Bank Draft 2", "position": 3, "thumbnail": "/meow-meow/bank-draft-2.gif" },
            { "type": "bill-of-lading-2", "title": "Bill of Lading 2", "position": 4, "thumbnail": "/meow-meow/bill-of-lading-2.gif" }
        ]
    ```

2. **Get One MeowMeow**:
- Endpoint: `/meow-meows/{position}`
- Method: `"GET"`
- Description: Retrieves a specific MeowMeow by its position.
- Response:
    - `200 OK`: Returns One MeowMeow object
    - `404 Not Found`: If the MeowMeow with the given ID does not exist.

    ```json 
    {
    "type": "bank-draft", "title": "Bank Draft", "position": 0, "thumbnail": "/meow-meow/bank-draft.gif"
    }
    ```

3. **Create A MeowMeow**:
- Endpoint: `/meow-meows`
- Method: `"POST"`
- Description: Creates a new MeowMeow.
- Request Body:
    - Content-Type: `application/json`
    
    ```json
    {
    "type": "bank-ledger", "title": "Bank Ledger", "position": 5, "thumbnail": "/meow-meow/bank-ledger.gif"
    }
    ```
- Response:
    - `200 OK`: Returns new MeowMeow.
    - `400 Bad Request`: If the request body is invalid.
    ```json
    {
    "type": "bank-ledger", "title": "Bank Ledger", "position": 5, "thumbnail": "/meow-meow/bank-ledger.gif"
    }
    ```

4. **Update an Existing MeowMeow**
- Endpoint: `/meow-meows/{id}`
- Method: `"PUT"`
- Description: Updates an existing MeowMeow by its ID.
- Request Body:
    - `Content-Type`: `application/json`
    ```json
    {
    "type": "bank-balance-sheet", "title": "bank-balance-sheet", "position": 5, "thumbnail": "/meow-meow/bank-balance-sheet.gif"
    }
    ```
- Response:
    - `200 OK`: Returns the updated MeowMeow object.
    - `404 Not Found`: If the MeowMeow with the given ID does not exist.
    - `400 Bad Request`: If the request body is invalid.
    ```json
    {
    "type": "bank-balance-sheet", "title": "bank-balance-sheet", "position": 5, "thumbnail": "/meow-meow/bank-balance-sheet.gif"
    }
    ```

5. **Delete a MeowMeow**
- Endpoint: `/meow-meows/{id}`
- Method: `DELETE`
- Description: Deletes a MeowMeow by its ID.
- Response
    - `204 No Content`: If the deletion is successful.
    - `404 Not Found`: If the MeowMeow with the given ID does not exist.

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of an API request:

- `200 OK`: The request was successful.
- `201 Created`: The resource was successfully created.
- `204 No Content`: The resource was successfully deleted.
- `400 Bad Request`: The request was malformed or invalid.
- `404 Not Found`: The requested resource was not found.
- `500 Internal Server Error`: An error occurred on the server.

## Long-Term Maintenance Considerations
1. **Versioning**: The API is versioned with `/v1` in the URL. Future versions can be introduced (e.g., `/v2`) without breaking existing clients.

2. **Modular Design**: Each endpoint is focused on a single responsibility, making the API easier to maintain and extend.

3. **Error Handling**: Consistent error responses ensure that clients can reliably handle errors and implement retry logic.

4. **Documentation**: Keeping this README up-to-date with the API changes ensures that developers can easily understand and use the API.