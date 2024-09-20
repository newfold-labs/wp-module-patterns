/**
 * Internal dependencies
 */
import { fetcher } from "./fetcher";
import { restURL } from "./utils";

export async function activatePlugins(plugins) {
	await fetcher({
		url: restURL("plugins/activate"),
		method: "POST",
		data: {
			plugins,
		},
	});
}
