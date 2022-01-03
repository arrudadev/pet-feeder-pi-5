<h1>
  Pet Feeder Server API
</h1>

[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

> Server API from the Integration Project 5 of the college.

# :pushpin: Table of Contents

* [Technologies](#-technologies)
* [Installation](#construction_worker-installation)
* [Getting Started](#runner-getting-started)
* [Found a bug? Missing a specific feature?](#bug-issues)
* [Contributing](#tada-contributing)
* [License](#closed_book-license)

## 💻 Technologies

This project was developed with the following technologies:

- [NodeJs](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [IBM Cloud](https://cloud.ibm.com/)
- [IBM DB2](https://www.ibm.com/br-pt/products/db2-database)

# :construction_worker: Installation

**You need to install [Node.js](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/) first, then in order to clone the project via HTTPS, run this command:**

```
git clone https://github.com/monteiro-alexandre/pet-feeder-pi-5.git
```

SSH URLs provide access to a Git repository via SSH, a secure protocol. If you use a SSH key registered in your Github account, clone the project using this command:

```
git clone git@github.com:monteiro-alexandre/pet-feeder-pi-5.git
```

And enter in the mobile project folder:

```
cd server
```

**Install dependencies**

```
yarn install
```

Or

```
npm install
```

Create your environment variables based on the examples of .env.example and fill with your [IBM DB2](https://www.ibm.com/br-pt/products/db2-database) credentials.

```
cp .env.example .env
```

# :runner: Getting Started

Run the following command to start the application in a development environment:

```yarn dev```

# :bug: Issues

Feel free to **file a new issue** with a respective title and description on the the [Pet Feeder](https://github.com/monteiro-alexandre/pet-feeder-pi-5/issues) repository. If you already found a solution to your problem, **I would love to review your pull request**! Have a look at our [contribution guidelines](https://github.com/monteiro-alexandre/pet-feeder-pi-5/blob/master/CONTRIBUTING.md) to find out about the coding standards.

# :tada: Contributing

Check out the [contributing](https://github.com/monteiro-alexandre/pet-feeder-pi-5/blob/master/CONTRIBUTING.md) page to see the best places to file issues, start discussions and begin contributing.

# :closed_book: License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/monteiro-alexandre/pet-feeder-pi-5/blob/master/LICENSE) file for details.
