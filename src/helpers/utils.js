import { NFD_REST_URL } from "../constants";

/* To format the version to have semver MAJOR.MINOR.PATCH. Adding '0', if the MINOR or PATCH are missing  */
export function formatVersion(version) {
	const hasMinorAndPatch = /^\d+\.\d+\.\d+/.test(version);

	if (hasMinorAndPatch) {
		return version;
	}
	/* For a version that looks like 1.2.3-RC1, numericVersion = "1.2.3" rcSuffix = "RC1" */
	const [numericVersion, rcSuffix] = version.split(/-(.+)/);
	const versionParts = numericVersion.split(".");

	while (versionParts.length < 3) {
		versionParts.push("0");
	}

	const formattedVersion = rcSuffix
		? `${versionParts.join(".")}-${rcSuffix}`
		: versionParts.join(".");

	return formattedVersion;
}

/* To replace the theme classes from the content with the new block style classes */
export function replaceThemeClasses(content) {
	// Regular expression to match "nfd-bg-surface nfd-theme-*"
	const themeClassRegex = /nfd-bg-surface nfd-theme-([^\s]+)/g;

	// Replace with "is-style-nfd-theme-*"
	return content.replace(themeClassRegex, "is-style-nfd-theme-$1");
}

export function restURL(endpoint) {
	let url = null;
	let restUrl = "";

	// Check if NFD_REST_URL starts with http or https.
	if (typeof NFD_REST_URL === "string" && NFD_REST_URL.startsWith("http")) {
		restUrl = NFD_REST_URL;
	} else {
		// if not, assume it's a relative path.
		restUrl = window.location.origin + NFD_REST_URL;
	}

	url = new URL(`${restUrl}/${endpoint}`);

	return url.href;
}
