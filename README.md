<a href="https://newfold.com/" target="_blank">
    <img src="https://newfold.com/content/experience-fragments/newfold/site-header/master/_jcr_content/root/header/logo.coreimg.svg/1621395071423/newfold-digital.svg" alt="Newfold Logo" title="Newfold Digital" align="right" 
height="42" />
</a>

# WordPress WonderBlocks Module

[![Version Number](https://img.shields.io/github/v/release/newfold-labs/wp-module-patterns?color=21a0ed&labelColor=333333)](https://github.com/newfold-labs/wp-module-patterns/releases)
[![License](https://img.shields.io/github/license/newfold-labs/wp-module-patterns?labelColor=333333&color=666666)](https://raw.githubusercontent.com/newfold-labs/wp-module-patterns/master/LICENSE)

Dynamic WordPress patterns library for WordPress sites at Newfold Digital.

## Module Responsibilities

- Show "WonderBlocks" button in page and site editors (using Gutenberg).
- Add CSS utility classes that can be used on frontend and when editing pages with Gutenberg.
- When the "WonderBlocks" button is clicked, a modal is opened displaying WonderBlocks patterns and templates that can be inserted into the page editor when clicked on.
- When WooCommerce plugin is active, additional "Product" patterns and templates are available in the modal.
- When in Site Editor, "Headers" and "Footers" categories are available in the modal.
- Register WonderBlocks patterns to WordPress.
- Show a CTA next to the "Add New Page" on the `edit.php?post_type=page` page.
- When the CTA is clicked, a new page is created and the WonderBlocks modal is automatically opened with the "Templates" tab pre-selected.
- When the module is active it hides Wonder Theme patterns from the default WordPress Patterns library.

## Critical Paths

## Installation

1. Add the Newfold Satis to your `composer.json`.

```bash
composer config repositories.newfold composer https://newfold-labs.github.io/satis
```

2. Require the `newfold-labs/wp-module-patterns` package.

```bash
composer require newfold-labs/wp-module-patterns
```

## Development

### GitHub Auth Token

Add GitHub Auth Token to `.npmrc` for private repo access.

1. Generate a GitHub personal access token if you haven't:  
   [GitHub Token Settings](https://github.com/settings/tokens).

2. Locate the `.npmrc` file in your project.

3. Add your GitHub token in `.npmrc`:

   ```
   @newfold-labs:registry=https://npm.pkg.github.com/
   //npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN_HERE
   ```

4. Save the file.

### Local cloud-patterns platform

If using local cloud-patterns platform, define `NFD_DATA_WB_DEV_MODE` as true in wp-config.php. This will switch the API fetch source from patterns.hiive.cloud to localhost:8888 and disable caching of the results.

Add this line to your `wp-config.php`:

```
define('NFD_DATA_WB_DEV_MODE', true);
```

With `NFD_DATA_WB_DEV_MODE` enabled, all API requests will be directed to localhost:8888 instead of the production server, and the responses will not be cached, facilitating easier development and testing.

### Run the module in dev mode

```bash
npm run start
```

## Releases

To ensure a smooth and error-free release, follow these detailed instructions closely.

### Initial Setup

1. Checkout a new branch for the release using the format `release/<new_version>`.

2. Run `npm install` to install necessary npm packages.

3. Execute `composer install` to install PHP dependencies.

### Version Updates

It is essential to verify that the version has been appropriately incremented in both the PHP and JavaScript components. Specifically, ensure that:

1. PHP constant `NFD_WONDER_BLOCKS_VERSION` has been updated to the intended release version on line 18 of the file `/bootstrap.php`. This PHP constant dictates the expected location of build files for the module. For example:

```
define( 'NFD_WONDER_BLOCKS_VERSION', '0.1.16' );
```

2. JavaScript release version aligns with the desired release by checking line 3 in the `package.json` file. For example:

```
"version": "0.1.16",
```

### Build

1. Run `npm run lint:js` to ensure JavaScript code quality.

2. Execute `npm run build` to build the most recent set of build files.

3. Run `composer clean` to ensure that PHP code standards are met.

4. Delete the old build files from the `/build` directory.

Ensure that these files are committed to the repository, as they are essential components to be incorporated into the upcoming release.

### Final Steps

1. Commit all changes and push them to the repository.

2. Create a Pull Request (PR) to the main branch for peer approval. Teammates can check out this branch to verify everything is in order.

3. After approval, merge the PR into the main branch.

### Create a Release on GitHub

1. Go to [New Release](https://github.com/newfold-labs/wp-module-patterns/releases/new).

2. Ensure the tag number matches the updated version.

3. Set the title as `Version <new_version>`.

4. Generate release notes and publish the release.

5. Confirm that `<new_version>` exists on both [GitHub Tags](https://github.com/newfold-labs/wp-module-patterns/tags) and [Satis](https://newfold-labs.github.io/satis/#patterns).

## More on Newfold WordPress Modules

- <a href="https://github.com/newfold-labs/wp-module-loader#endurance-wordpress-modules">What are modules?</a>
- <a href="https://github.com/newfold-labs/wp-module-loader#creating--registering-a-module">Creating/registering
  modules</a>
- <a href="https://github.com/newfold-labs/wp-module-loader#installing-from-our-satis">Installing from our
  Satis</a>
- <a href="https://github.com/newfold-labs/wp-module-loader#local-development">Local development notes</a>
- <a href="https://github.com/newfold-labs/wp-module-loader#understanding-the-module-lifecycle">Understanding the
  module lifecycle</a>
