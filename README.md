# Dall-E Dash - AI Image Generation Made Easier

Dall-E Dash is a powerful and user-friendly full-stack web application designed to simplify the process of generating AI imagery. Through the innovative concept of metaprompting, Dall-E Dash empowers users to effortlessly create stunning and imaginative images using natural language prompts. This README provides an overview of Dall-E Dash, its features, technologies used, and instructions for setting up and running the application.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Live Link](#live-link)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Dall-E Dash is built to harness the capabilities of the OpenAI DALL-E-2 API, enabling users to create intricate and captivating images from simple prompts. By employing the concept of metaprompting, Dall-E Dash takes basic phrases and transforms them into detailed prompts that produce high-quality and visually appealing images.

## Features

- **Metaprompting:** Transform ordinary prompts into elaborate and creative instructions to generate exceptional images.
- **User-Friendly Interface:** An intuitive web interface that makes it easy for users to input prompts and view generated images.
- **AI Image Generation:** Utilize the power of the OpenAI DALL-E-2 API to generate diverse and imaginative images.
- **Authentication:** Secure user accounts and authentication powered by Passport.js.
- **Database Integration:** Store user preferences and generated images using PostgreSQL and Supabase.
- **Responsive Design:** A responsive and visually appealing design built with TypeScript, React, and React Router.
- **Backend Support:** Node.js and Express.js provide a robust backend for handling requests and managing data.
- **Scalability:** Deploy on Google Cloud Platform to ensure scalability and reliability.

## Technologies Used

- TypeScript
- React
- React Router
- Node.js
- Express.js
- Passport.js
- PostgreSQL
- Supabase
- OpenAI API
- DALL-E-2 API
- Google Cloud Platform

## Live Link

Check out Dall-E Dash in action by visiting the [Live Demo](https://dalle-dash.uc.r.appspot.com/).

## Usage

To use Dall-E Dash, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/dall-e-dash.git
   Create a .env file in the server directory and add the following environment variables:
   SUPABASE_URL=your_supabase_url
   SUPABASE_API_KEY=your_supabase_api_key
   PASSPORT_SECRET=your_passport_secret
   OPEN_AI_KEY=your_open_ai_key
   DALLE_KEY=your_dalle_key
   MY_DOMAIN=your_domain
   STRIPE_KEY=your_stripe_key
   ENDPOINT_SECRET=your_endpoint_secret
   cd client
   npm install
   npm run build
  
   cd ../server
   npm install

   npm run nodemon
   ```
2. Open your web browser and navigate to http://localhost:5000 to access Dall-E Dash.

## Contributing

We welcome contributions to enhance Dall-E Dash. Please fork the repository and submit pull requests for review.

## License

Dall-E Dash is licensed under the MIT License. Feel free to use, modify, and distribute this code for personal or commercial projects.
