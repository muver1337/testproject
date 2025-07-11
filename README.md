<h1>🧩 User API (Node.js + TypeScript + Prisma + PostgreSQL)</h1>

<p>REST API для управления пользователями: регистрация, логин, получение, блокировка. Подходит как бэкенд для административных или пользовательских панелей.</p>

<h2>🚀 Стек технологий</h2>
<ul>
  <li>Node.js</li>
  <li>TypeScript</li>
  <li>Express.js</li>
  <li>Prisma ORM</li>
  <li>PostgreSQL</li>
  <li>bcrypt + JWT</li>
  <li>Swagger (OpenAPI)</li>
</ul>

<h2>📦 Установка и запуск</h2>

<h3>1. Клонирование проекта</h3>

<pre><code>git clone https://github.com/muver1337/testproject.git
cd testproject
</code></pre>

<h3>2. Установка зависимостей</h3>

<pre><code>npm install</code></pre>

<h3>3. Создай .env файл в корне:</h3>

<pre><code>DB_HOST="Your_Host"
DB_PORT="Your_Port"
DB_USER="Your_User"
DB_PASS="Your_Password"
DB_NAME="Your_Database_Name"

JWT_SECRET="Your_Jwt_Secret_Here"

PORT=3000

DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/NAMEYOURDB?schema=public"
</code></pre>

<h3>4. Настройка базы данных</h3>

<pre><code>npx prisma generate
npx prisma migrate dev --name init
</code></pre>

<h3>5. Запуск проекта</h3>

<pre><code>npm start</code></pre>

<h2>🧪 API Эндпоинты</h2>

<p><strong>📖 Swagger:</strong> <a href="http://localhost:3000/api-docs">http://localhost:3000/api-docs</a></p>

<h3>🔐 POST /api/register</h3>
<p>Регистрация нового пользователя</p>
<p> content-type: JSON </p>

<pre><code>{
  "name": "JohnDoe",
  "firstName": "John",
  "lastName": "Doe",
  "birthDate": "2000-01-01",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}</code></pre>

<h3>🔐 POST /api/login</h3>
<p>Логин пользователя</p>
<p> content-type: JSON </p>

<pre><code>{
  "email": "john@example.com",
  "password": "password123"
}</code></pre>

<h3> Для Postman - Bearer token вставляется в Authorization, в соответствующий тип </h3>

<h3>🔍 GET /api/users/:id</h3>
<p>Получение пользователя по ID (admin может видеть всех, user сам себя)</p>

<h3>📋 GET /api/users</h3>
<p>Получение всех пользователей (только admin)</p>

<h3>🚫 PATCH /api/users/:id/block</h3>
<p>Блокировка пользователя (только admin)</p>

<h3> Так же могу предоставить коллекцию Postman</h3>

