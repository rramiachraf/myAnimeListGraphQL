# Nexus-Boilerplate ![ci](https://github.com/rramiachraf/nexus-boilerplate/workflows/ci/badge.svg?branch=main)
Code-First GraphQL server.

## Usage
```sh
> git clone https://github.com/rramiachraf/nexus-boilerplate [projectName]
> cd [projectName]
> yarn
> yarn dev
```

## Environment variables
Create a `.env` file in the root of the project and add your variables, but in case you want to use them you need to import them from `src/env.ts` using the [`env-var`](https://www.npmjs.com/package/env-var) library.
 