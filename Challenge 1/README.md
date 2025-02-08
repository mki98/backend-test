## Features
- **JWT Authentication**: Secure login endpoint to generate access tokens.
- **Role-Based Authorization**: Admin-only access for creating, updating, and deleting products.
- **CRUD Operations**: Create, read, update, and delete products.
- **Pagination**: Fetch products in batches of 10 per page.
- **Input Validation**: Robust validation using Express Validator.
- **MongoDB Integration**: Scalable NoSQL database for product storage.


Install dependencies:

```
npm install bcryptjs dotenv express express-validator jsonwebtoken mongoose
```
# API Endpoints
## Authentication
|Method|	Endpoint|	Access|
|------|----------|----------|
|POST	|/auth/register|	Register a new user|
|POST	|/auth/login|	Login to get JWT token	Public|

## Products


|Method|	Endpoint|	Description	Access|
|------|----------|-------------------|
|POST|	/products	|Add a new product	Admin-only|
|GET	|/products	|List all products (paged)	Public|
|GET	|/products/:id |	Get product by ID	Public|
|PUT	|/products/:id |	Update product by ID	Admin-only|
|DELETE|	/products/:id |	Delete product by ID	Admin-only|

## Validation Rules

* POST /products:

  * name: Required, string.

  * category: Optional, string.

  * price: Required, positive number.

  * quantity: Required, non-negative integer.

## Security Practices
* JWT Tokens: Tokens expire after 1 hour (configurable).

* Role-Based Access: Only admins can modify products.

* Environment Variables: Sensitive data (JWT secret, DB URI) stored in .env.

* Input Sanitization: Express Validator sanitizes user inputs.
