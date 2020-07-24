# Github Tagger
Github Client to tag repositories.

**Deploy**: [Heroku](https://github-tagger-hbenvenutti.herokuapp.com/)

# Running the application

* `yarn build | npm run build`:

  It generates all ".js" files at "./dist".

* `yarn test | npm run test`:

  It executes jest tests.

* `yarn dev:server | npm run dev:server`:

  It executes the project in dev environment without building it.

* `yarn typeorm migration:run | npx typeorm migration:run` :

  It runs migrations.

# GitHub Authentication
* This application uses GitHub personal access token. So the user must create one at [GitHub settings](https://github.com/settings/tokens).
*  The user must provide a token to list private starred repositories.


# Features

## Enforcing Code Style & Commit Standardization.

* Configured Husky and Lint-Staged to enforce lint before every commit.
* Husky runs staged tests before each commit and all tests before each push.
* Commit-Lint ensures commit standardization.
* Commitizen displays an interactive interface to write the commit message.

# Routes

## __***/users***__ :

>### **Post** ***/users***: <br>

**Creates a User**;<br>

Request:
  ```ts
    request.body: {
      username: string;
      password: string;
      email: string;
      github_tag?: string;
      github_username: string
    }
  ```
Response:
  ```ts
  user: {
    id: string;
    username: string;
    email: string;
    github_tag?: string;
    github_username: string;
    created_at: string;
    updated_at: string;
  }
  ```
  <hr>

## __***/sessions***__:

> ### **Post** ***/sessions***

**Authenticates a User**;<br>

Request:
  ```ts
    request.body: {
      email: string;
      password: string;
    }
  ```
Response:

  ```ts
    token: string;
  ```
<hr>

# Authentication Required Routes
To access auth required routes, must provide the token in request headers;

Request:
```ts
  request: {
    headers: {
      authorization: "bearer <token>"
    }
  }
```
<hr>

## __***/repositories***__:

> ### **Post** ***/repositories***
**Gets remote repositories and stores locally**;<br>

Request:
```ts
  request: {
    headers: {
      authorization: "bearer <token>"
    }
  }
```

Response:
```ts
  response: [
    repository: {
      id: string;,
      remote_id: number;
      user_id: string;
      name: string;
      description: string;
      url: string;
      created_at: Date;
      updated_at: Date;
    }
  ]
```
<hr>

> ### **Post** ***/repositories/tags/:repo_id***
**Tags a repository**;<br>

Request:
```ts
  request: {
    headers: {
      authorization: "bearer <token>"
    },
    body: {
      tagName: string;
    }
  }
```
Response:
```ts
  response: {
    tag: {
      name: string;
      id: string;
      created_at: Date;
      updated_at: Date;
    },
    associativeTagRepo: {
      repository_id: string;
      tag_id: string;
      created_at: Date;
      updated_at: Date;
    }
  }
```
