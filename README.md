# NestJS Mims test

<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" />
  </a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" />
  </a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" />
  </a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank">
    <img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" />
  </a>
  <a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank">
    <img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" />
  </a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank">
    <img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/>
  </a>
</p>

## Description

[NestJS](https://github.com/nestjs/nest) framework TypeScript starter repository.

---

## Project Setup

```bash
$ npm install
```

## Compile and Run the Project

```bash
# Development
$ npm run start

# Watch mode
$ npm run start:dev

# Production mode
$ npm run start:prod
```

---

## NATS Installer

Para instalar NATS, descarga el archivo desde:
[NATS CLI Releases](https://github.com/nats-io/natscli/releases)

Si tu procesador es `amd64`, descarga:
- `nats-0.1.6-windows-amd64.zip`

Luego, extrae el archivo en `C:\nats` y agrega esta ruta a las variables de entorno.

Para iniciar el servidor de NATS:
```bash
$ nats-server
```

---

## Migraciones Prisma

```bash
$ npx prisma db push
```

---

## Ejecutar Microservicios

Usuarios:
```bash
$ npm run start usuarios
```

Pedidos:
```bash
$ npm run start pedidos
```

---

## Probar el Código

(primero debe correr nats-server en cmd) en cmd Para ejecutar comandos de NATS:

```bash
$ nats pub crear_pedido "{\"usuarioId\": \"123\", \"productos\": [{\"nombre\": \"Producto1\", \"cantidad\": 2}], \"estado\": \"pendiente\"}"

$ nats request listar_pedidos "{ \"usuarioId\": \"123\" }"

$ nats request cambiar_estado_pedido "{ \"id\": \"2acf6c7b-9eeb-485a-84a3-b578c83d8a1e\", \"estado\": \"entregado\" }"'
```

Usuarios:
```bash
$ nats request registro "{ \"email\": \"test@example.com\", \"password\": \"123456\", \"nombre\": \"Usuario Test\" }"

$ nats request login "{ \"email\": \"test@example.com\", \"password\": \"123456\" }"

$ nats request perfil "{ \"token\": \"eyJhbGciOiJIUzI1...\" }"
```

---

## Ejecutar Pruebas Unitarias

Para pedidos:
```bash
$ npm run test pedidos.controller.spec.ts
```

Para usuarios:
```bash
$ npm run test usuarios.controller.spec.ts
```

---

## Configuración del Archivo `.env`

Este proyecto requiere una URL de base de datos. Puedes usar [Supabase](https://supabase.com/) para obtener una conexión rápida.

---

## Run Tests

```bash
# Unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```

---

## Deployment

Para desplegar la aplicación en producción, revisa la documentación de NestJS sobre [despliegue](https://docs.nestjs.com/deployment).

Si deseas una solución en la nube, puedes usar **Mau** para desplegar en AWS:

```bash
$ npm install -g mau
$ mau deploy
```

---

## Recursos Útiles

- [Documentación de NestJS](https://docs.nestjs.com)
- [Canal de Discord](https://discord.gg/G7Qnnhy)
- [Cursos oficiales](https://courses.nestjs.com/)
- [NestJS Devtools](https://devtools.nestjs.com)
- [Soporte empresarial](https://enterprise.nestjs.com)
- [Jobs board](https://jobs.nestjs.com)

---

## Support

Nest es un proyecto de código abierto con licencia MIT. Puedes apoyar su desarrollo [aquí](https://docs.nestjs.com/support).

---

## Contacto

- Autor - Luis Rodriguez


---

## License

Nest está bajo la licencia [MIT](https://github.com/nestjs/nest/blob/master/LICENSE).


