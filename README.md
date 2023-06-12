
# Online Shop :computer: :shopping_cart:

Welcome to the Web Developer Shop repository! This is a web application where users can shop for web development products. It includes both customer and admin interfaces, user authentication, and follows the MVC pattern. Let's dive into the details!

## Technologies Used :rocket:

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- MongoDB
- EJS
- multer

## Features :sparkles:

- User authentication: Users can create an account, log in, and log out.
- Customer interface: Customers can browse and purchase web development products.
- Admin interface: Admins can manage products, view orders, and update the shop inventory.
- Image upload: Multer is used to allow customers to upload images for their products.
- MVC pattern: The codebase is organized following the Model-View-Controller (MVC) pattern.
- NPM: The project is built using npm to manage dependencies and scripts.

## Installation :hammer_and_wrench:

1. Clone the repository:

   ```shell
   git clone https://github.com/manjjott/online-shop.git
   ```

2. Navigate to the project directory:

   ```shell
   cd online-shop
   ```

3. Install the dependencies:

   ```shell
   npm install
   ```

4. Set up the environment variables:

   - Create a `.env` file in the root directory.
   - Add the following variables:

     ```plaintext
     MONGODB_URI=your-mongodb-uri
     SESSION_SECRET=your-session-secret
     ```

5. Start the application:

   ```shell
   npm start
   ```

6. Open your web browser and visit `http://localhost:3000` to access the Web Developer Shop.

## Folder Structure :file_folder:

The project follows a structured folder organization:

```
.
├── config
│   └── ...    # Configuration files (e.g., database connection)
├── controllers
│   └── ...    # Logic for handling HTTP requests
├── models
│   └── ...    # Database models and schemas
├── public
│   └── ...    # Static assets (e.g., CSS, images)
├── routes
│   └── ...    # Route definitions
├── views
│   └── ...    # EJS templates for rendering views
└── app.js      # Entry point of the application
```

---

Thank you for checking out the Web Developer Shop! We hope you find it useful for your web development needs. If you have any questions, feel free to reach out. Happy shopping! :tada:
