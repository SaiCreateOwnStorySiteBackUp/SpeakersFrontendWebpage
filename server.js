const express = require('express');
const app = express();
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

// ---------- Static file serving ----------

// Public views: index.html, cherana.html, readStory.html, etc
app.use(express.static(path.join(__dirname, 'views')));

// Public assets: css, js, images, uploads
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/cssStyles', express.static(path.join(__dirname, 'cssStyles')));

// ---------- API Proxy ----------
// app.use('/stories', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));
const BACKEND_URL = 'https://speakersbackendwebpage.onrender.com';

app.use('/api/stories', createProxyMiddleware({ target: BACKEND_URL, changeOrigin: true }));
app.use('/users', createProxyMiddleware({ target: BACKEND_URL, changeOrigin: true }));
// You can add other backend routes too
app.use('/auth', createProxyMiddleware({ target: BACKEND_URL, changeOrigin: true }));
app.use('/upload', createProxyMiddleware({ target: BACKEND_URL, changeOrigin: true }));
// ---------- API Routes (read-only APIs) ----------
// These routes should allow public to get stories and speakers info
// const storiesRoute = require('./routes/stories');
// app.use('/api/stories', storiesRoute);
//
// const usersRoute = require('./routes/users');
// // Optionally expose some public user data if needed (be careful with private data)
// app.use('/users', usersRoute);

// ---------- Page Routes ----------

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/cherana', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'cherana.html'));
});

// TODO: add other public speaker pages here (e.g., /sadhana, /muni, etc.)

app.get('/readStory.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'readStory.html'));
});

// No login or admin routes here

// ---------- Start frontend server ----------
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`🚀 Frontend Server started at http://localhost:${PORT}`);
// });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Frontend Server started on port ${PORT}`);
});
// Option 1: Traditional function
// app.listen(process.env.PORT || 3000, function () {
//   console.log(`🚀 Frontend Server started at port ${process.env.PORT || 3000}`);
// });

// Option 2: Arrow function (without function keyword)
// app.listen(process.env.PORT || 3000, () => {
//   console.log(`🚀 Frontend Server started at port ${process.env.PORT || 3000}`);
// });


// app.listen(process.env.PORT || 3000, function() => {
//   console.log(`🚀 Frontend Server started at 3000`);
// });
