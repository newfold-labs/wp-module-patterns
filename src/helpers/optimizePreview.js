/**
 * Optimize block pattern preview image size.
 *
 * @param {string} html Block HTML.
 * @return {string} Optimized block HTML.
 */
export const optimizePreview = (html) => {
	return html.replace(
		/https?:\/\/\S*w=(\d+)(?:\S*h=(\d+))?\S*q=(\d+)\S*/g,
		(url, width, height, quality) => {
			// Reduce width by half.
			const reducedWidth = Math.floor(Number(width) / 2);
			let reducedUrl = url.replace(`w=${width}`, `w=${reducedWidth}`);

			// Reduce height by half if it exists.
			if (height) {
				const reducedHeight = Math.floor(Number(height) / 2);
				reducedUrl = reducedUrl.replace(
					`h=${height}`,
					`h=${reducedHeight}`
				);
			}

			// Set quality to 50.
			reducedUrl = reducedUrl.replace(`q=${quality}`, 'q=50');

			return reducedUrl;
		}
	);
};
