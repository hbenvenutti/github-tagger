# Github Tagger
Github Client to tag repositories.

**Deploy**: [Heroku](https://github-tagger-hbenvenutti.herokuapp.com/)

# Running the application

* **yarn build | npm run build**: It generates all ".js" files at "./dist".
* **yarn test | npm run test**: It executes jest tests.
* **yarn dev:server | npm run dev:server**: It executes the project in dev environment without building it.

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

### **Post** ***/users***: <br>

**Creates a User**;<br>

Request:
  ```ts
    request.body: {
      username: string;
      password: string;
      email: string;
      github_tag?: string;
    }
  ```


