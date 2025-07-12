/**
 * @openapi
 * /api/register:
 *   post:
 *     summary: Регистрация нового пользователя (Role вывел, чтобы была возможность создать админа и проверить функционал)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date-time
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       201:
 *         description: Пользователь успешно зарегистрирован
 *       400:
 *         description: Неверные данные для регистрации
 */
export const registerRoute = `
/api/register:
  post:
    summary: Регистрация нового пользователя
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              name:
                type: string
              firstName:
                type: string
              lastName:
                type: string
              birthDate:
                type: string
                format: date-time  # Формат даты и времени для поля
              email:
                type: string
              password:
                type: string
    responses:
      201:
        description: Пользователь успешно зарегистрирован
      400:
        description: Неверные данные для регистрации
`;

/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: Вход пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успешный вход
 *       401:
 *         description: Неверные учетные данные
 */
export const loginRoute = `
/api/login:
  post:
    summary: Вход пользователя
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              email:
                type: string
              password:
                type: string
    responses:
      200:
        description: Успешный вход
      401:
        description: Неверные учетные данные
`;

/**
 * @openapi
 * /api/users/{id}/block:
 *   patch:
 *     summary: Блокировка пользователя по ID (Доступно только админу)
 *     security:
 *       - bearerAuth: []  # Требуется Bearer токен для доступа
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID пользователя
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Пользователь заблокирован
 *       404:
 *         description: Пользователь не найден
 */
export const blockByIdRoute = `
/api/users/{id}/block:
  patch:
    summary: Блокировка пользователя по ID
    security:
      - bearerAuth: []  # Требуется Bearer токен для доступа
    parameters:
      - in: path
        name: id
        required: true
        description: ID пользователя
        schema:
          type: string
    responses:
      200:
        description: Пользователь заблокирован
      404:
        description: Пользователь не найден
`;

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Получить информацию о пользователе по ID (Для админа любой пользователь, для юзера только о самом себе)
 *     security:
 *       - bearerAuth: []  # Требуется Bearer токен для доступа
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID пользователя
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Информация о пользователе
 *       404:
 *         description: Пользователь не найден или нет доступа
 */
export const getByIdRoute = `
/api/users/{id}:
  get:
    summary: Получить информацию о пользователе по ID
    security:
      - bearerAuth: []  # Требуется Bearer токен для доступа
    parameters:
      - in: path
        name: id
        required: true
        description: ID пользователя
        schema:
          type: string
    responses:
      200:
        description: Информация о пользователе
      404:
        description: Пользователь не найден или нет доступа
`;

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Получить список пользователей (Доступно только админу)
 *     security:
 *       - bearerAuth: []  # Требуется Bearer токен для доступа
 *     responses:
 *       200:
 *         description: Список пользователей
 *       401:
 *         description: Нет доступа (неавторизованный запрос)
 */
export const getRoute = `
/api/users:
  get:
    summary: Получить список пользователей
    security:
      - bearerAuth: []  # Требуется Bearer токен для доступа
    responses:
      200:
        description: Список пользователей
      401:
        description: Нет доступа (неавторизованный запрос)
`;
