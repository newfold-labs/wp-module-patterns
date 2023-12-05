<a href="https://newfold.com/" target="_blank">
    <img src="https://newfold.com/content/experience-fragments/newfold/site-header/master/_jcr_content/root/header/logo.coreimg.svg/1621395071423/newfold-digital.svg" alt="Newfold Logo" title="Newfold Digital" align="right" 
height="42" />
</a>

# wp-module-patterns WordPress Module

Dynamic WordPress patterns library for WordPress sites at Newfold Digital.

## Installation

1. Add the Newfold Satis to your `composer.json`.

```bash
composer config repositories.newfold composer https://newfold-labs.github.io/satis
```

2. Require the `newfold-labs/wp-module-patterns` package.

```bash
composer require newfold-labs/wp-module-patterns
```

## Dev mode

### GitHub Auth Token

Add GitHub Auth Token to `.npmrc` for private repo access.

1. Generate a GitHub personal access token if you haven't:  
   [GitHub Token Settings](https://github.com/settings/tokens).

2. Locate the `.npmrc` file in your project.

3. Add your GitHub token in `.npmrc`:

    ```
    //npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN_HERE
    ```

4. Save the file.


## Releases

Prior to tagging a release, it is essential to verify that the version has been appropriately incremented in both the PHP and JavaScript components. Specifically, ensure that the PHP constant NFD_WONDER_BLOCKS_VERSION has been updated to the intended release version, as indicated on line 18 of the `/bootstrap.php` file. This PHP constant dictates the expected location of build files for the module.

Simultaneously, confirm that the JavaScript release version aligns with the desired release by checking line 3 in the `package.json` file. This package version is crucial for the build process, guiding the placement of files within the build directory and subsequently within a version-specific subdirectory.


### Local cloud-patterns platform

If using local cloud-patterns platform, define `NFD_WB_DEV_MODE` as true in wp-config.php. This will switch the API fetch source from patterns.hiive.cloud to localhost:8888 and disable caching of the results.

Add this line to your `wp-config.php`:

```
define('NFD_WB_DEV_MODE', true);
```

With `NFD_WB_DEV_MODE` enabled, all API requests will be directed to localhost:8888 instead of the production server, and the responses will not be cached, facilitating easier development and testing.

### Run the module in dev mode

```bash
npm run start
```


## More on NewFold WordPress Modules

-   <a href="https://github.com/bluehost/endurance-wp-module-loader#endurance-wordpress-modules">What are modules?</a>
-   <a href="https://github.com/bluehost/endurance-wp-module-loader#creating--registering-a-module">Creating/registering
    modules</a>
-   <a href="https://github.com/bluehost/endurance-wp-module-loader#installing-from-our-satis">Installing from our
    Satis</a>
-   <a href="https://github.com/bluehost/endurance-wp-module-loader#local-development">Local development notes</a>
-   <a href="https://github.com/bluehost/endurance-wp-module-loader#understanding-the-module-lifecycle">Understanding the
    module lifecycle</a>
