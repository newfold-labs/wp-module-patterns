/**
 * Optimize block pattern preview image size.
 *
 * @param {string} html Block HTML.
 * @return {string} Optimized block HTML.
 */
export const optimizePreview = (html) => {
	return html.replace(
		/https?:\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-;]*)?/g,
		(url) => {
			const width = url.match(/w=(\d+)/);
			const height = url.match(/h=(\d+)/);
			const quality = url.match(/q=(\d+)/);

			let reducedUrl = url;

			// Reduce width by half.
			if (width) {
				const reducedWidth = Math.floor(Number(width[1]) / 2);
				reducedUrl = url.replace(`w=${width[1]}`, `w=${reducedWidth}`);
			}

			// Reduce height by half.
			if (height) {
				const reducedHeight = Math.floor(Number(height[1]) / 2);

				reducedUrl = reducedUrl.replace(`h=${height[1]}`, `h=${reducedHeight}`);
			}

			// Set quality to 50.
			if (quality) {
				reducedUrl = reducedUrl.replace(`${quality[0]}`, "q=50");
			}

			return reducedUrl;
		}
	);
};
