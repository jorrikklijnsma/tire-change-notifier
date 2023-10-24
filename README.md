# Tire Change Notifier

Tire Change Notifier is a versatile tool that helps you stay on top of your tire-swapping game. Never be caught off guard by changing seasons again. With this app, you'll always know when the weather is just right for that tire change.

## Features

- **Accurate Weather Forecasts:** Leveraging weather forecasts with up to 14 days of advanced notice.
- **Flexible Notifications:** Receive timely alerts via Telegram, ensuring you're always in the know.
- **Sleek User Interface:** Enjoy a modern, minimalist UI design inspired by glassmorphism and the latest aesthetics.
- **Easy Manual Checks:** Conveniently check the status of your tire change at any time.

## Folder Structure

```
/tire-change-notifier/
|-- /packages/
|   |-- /backend/
|   |   |-- /src/
|   |   |   |-- # all the backend files go here
|   |   |-- package.json
|   |   |-- .env
|   |-- /frontend/
|   |   |-- /src/
|   |   |   |-- # all the frontend files go here
|   |   |-- package.json
|   |   |-- vite.config.js
|-- README.md
|-- package.json
```

## Technologies Used

- **Frontend:** Built with Vite, the fast web development build tool. In combination with tailwindcss, the frontend is designed to be lightweight and responsive.
- **Backend:** Powered by Express.js for handling backend functionality.
- **Notifications:** Stay informed with Telegram notifications.
- **Weather Data:** Weather data is provided by Your Weather API.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/tire-change-notifier.git
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   cd tire-change-notifier
   npm install
   ```

3. Set up your environment variables:

   - Copy the `.env.example` to `.env` file in the `/backend` directory and configure your environment variables (e.g., API keys, settings).

4. Start the development server:

   ```bash
   # For frontend (from the root directory)
   npm run frontend

   # For backend (from the /packages/backend directory)
   npm start
   ```

5. Access the app in your browser at `http://localhost:3000`.

## Contributing

We welcome contributions from the community! Whether it's bug fixes, feature enhancements, or documentation improvements, your input is valuable. Please follow our [Contributing Guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Weather data provided by [Your Weather API](https://yourweatherapi.com/).
- Telegram integration powered by the [Telegram Bot API](https://core.telegram.org/bots).

## Contact

For any questions, suggestions, or feedback, please contact us at <tirechangemail@example.com>.

Happy tire swapping! 🚗🌦️
