<a href="https://newfold.com/" target="_blank">
    <img src="https://newfold.com/content/experience-fragments/newfold/site-header/master/_jcr_content/root/header/logo.coreimg.svg/1621395071423/newfold-digital.svg" alt="Newfold Logo" title="Newfold Digital" align="right" 
height="42" />
</a>

# wp-module-patterns WordPress Module

Dynamic WordPress patterns library for WordPress sites at Newfold Digital.

## Installation

### 1. Add the Newfold Satis to your `composer.json`.

```bash
composer config repositories.newfold composer https://newfold.github.io/satis
```

### 2. Require the `newfold-labs/wp-module-wp-module-patterns` package.

```bash
composer require newfold-labs/wp-module-wp-module-patterns
```

## Running the module in dev mode

```bash
npm run start
```

Before running the project, you'll need to add your GitHub Auth Token to `.npmrc` for private repo access.

1. Generate a GitHub personal access token if you haven't:  
   [GitHub Token Settings](https://github.com/settings/tokens).

2. Locate the `.npmrc` file in your project. 

3. Add your GitHub token in `.npmrc`:

    ```
    //npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN_HERE
    ```

4. Save the file.

## More on NewFold WordPress Modules

-   <a href="https://github.com/bluehost/endurance-wp-module-loader#endurance-wordpress-modules">What are modules?</a>
-   <a href="https://github.com/bluehost/endurance-wp-module-loader#creating--registering-a-module">Creating/registering
    modules</a>
-   <a href="https://github.com/bluehost/endurance-wp-module-loader#installing-from-our-satis">Installing from our
    Satis</a>
-   <a href="https://github.com/bluehost/endurance-wp-module-loader#local-development">Local development notes</a>
-   <a href="https://github.com/bluehost/endurance-wp-module-loader#understanding-the-module-lifecycle">Understanding the
    module lifecycle</a>
