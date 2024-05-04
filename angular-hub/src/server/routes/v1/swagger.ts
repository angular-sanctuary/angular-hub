import { defineEventHandler } from 'h3';

export default defineEventHandler(() => {
  return `
    <!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Angular Hub</title>
  <base href="/" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta property="og:title" content="Angular Hub" />
  <meta
    property="og:image"
    content="https://angular-hub.com/assets/images/og-image.png"
  />
  <meta
    property="og:description"
    content="Curated list of Angular events and communities"
  />
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
  <style>
  @font-face {
  font-family: 'Pixelify';
  src: local('Trebutchet MS'), url('/assets/fonts/PixelifySans-Regular.ttf');
  font-display: swap;
}
  html, body {
    margin: 0;
    padding: 0;
  }

  header {
    background-color: #303030;
    padding: 1rem;
    display: flex;
    gap: 1rem;
  }

  header img {
    width: 40px;
    height: 40px;
  }

  h1.title {
  font-family: 'Pixelify', 'sans-serif';
  margin: 0;
  background-image: linear-gradient(
    to right,
    #bf25b9,
    #836ae9,
    #1690fa,
    #00aaf3,
    #00bee0
  );
  width: fit-content;
  background-size: 100%;
  background-repeat: repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
    .main a.link {
      display: none;
    }
</style>
</head>
<body>
<header>
    <img src="/assets/images/logo.webp" alt="">
  <h1 class="title">ANGULAR HUB</h1>
</header>
<div id="swagger-ui"></div>
<script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js" crossorigin></script>
<script>
  window.onload = () => {
    window.ui = SwaggerUIBundle({
      url: '/assets/swagger/openapi.yml',
      dom_id: '#swagger-ui',
    });
  };
</script>
</body>
</html>

  `;
});
