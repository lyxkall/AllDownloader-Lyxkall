<div align="center">

<br /> <h1 style="font-size: 3rem; font-weight: 900;"> ZERONAUT.DOWNLOADER </h1>

<h3 style="color: #a5f3fc;"> NO-WATERMARK MEDIA DOWNLOADER ENGINE // V.6.1 </h3>

<p> <em>A modern web application to download videos and images from various social media platforms without watermarks in the best quality.</em> </p>

<br /> <a href="https://zero-nout-downloader.vercel.app/" target="_blank"> </a> <br /> <br />

<h2 align="left">Interface Preview</h2> <img src="demo1.png" alt="Zeronaut Desktop Preview" width="100%" style="border-radius: 10px; border: 1px solid #333;" /> <br /> <br /> <img src="demo2.png" alt="Zeronaut Desktop Preview" width="100%" style="border-radius: 10px; border: 1px solid #333;" /> <br /> <br />

<p> <img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB" /> <img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white" /> <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white" /> <img src="https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white" /> <img src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white" /> </p>

</div>

<hr />

Introduction
Zeronaut Downloader is a Full-Stack application designed to simplify the process of downloading media content from various social platforms. With a Futuristic/Cyberpunk design aesthetic, this application provides a seamless user experience on both Desktop and Mobile devices.

Unlike other downloaders, Zeronaut focuses on No-Watermark media extraction and high-quality (HD) output, utilizing an optimized backend to bypass CORS and API restrictions.

Key Features
Multi-Platform Support: Download from Instagram (Reels/Post), Facebook, TikTok, YouTube, Pinterest, Spotify, and many more.

No Watermark: Retrieve clean versions of videos without platform logos.

Futuristic UI: Glassmorphism effects, neon gradients, and smooth animations using Framer Motion.

Fully Responsive: Adaptive display that works perfectly on both phones and computers.

Smart Error Handling: A system that notifies users if a link is invalid or if an account is private.

Vercel Ready: Optimized folder structure for serverless deployment on Vercel.

Technologies Used
Frontend
Framework: React.js (Vite)

Styling: Tailwind CSS

Animations: Framer Motion

Icons: Lucide React

HTTP Client: Axios

Backend
Runtime: Node.js

Server: Express.js

API: Custom Scraper Integration & Gimita API

Deployment: Vercel Serverless Functions

Getting Started (Local Setup)
Follow these steps to run the project on your computer.

Installation
Clone the repository git clone https://github.com/rezaaplvv/Zeronaut-Downloader.git cd zeronaut-downloader

Install Dependencies npm install

Run Development Server Open two separate terminals:

Terminal 1 (Frontend): npm run dev

Terminal 2 (Backend): node server/index.js

Access the Application Open your browser and go to http://localhost:5173.

Project Structure
zeronaut-downloader/ ├── api/ # Vercel Serverless entry point │ └── index.js ├── server/ # Backend Logic │ ├── services/ # Platform-specific logic (IG, FB, etc.) │ └── index.js # Express configuration ├── src/ # Frontend Logic │ ├── App.jsx # Main UI │ └── index.css # Tailwind directives ├── vercel.json # Vercel Deployment configuration ├── package.json # List of dependencies └── README.md # This documentation

Deployment (Vercel)
This project is already configured for Vercel.

Create a new project on Vercel.

Connect to this GitHub repository.

Ensure the vercel.json file is in the root folder.

Click Deploy.

<div align="center"> <p> Created by <strong>rezaaplvv</strong> </p> </div>
