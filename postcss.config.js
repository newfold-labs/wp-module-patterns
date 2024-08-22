const tailwind = require("./tailwind.config");
const { resolve } = require("path");

module.exports = (ctx) => ({
	ident: "postcss",
	sourceMap: ctx.env !== "production",
	plugins: [
		require("tailwindcss")({
			...tailwind,
			config: resolve(__dirname, "tailwind.config.js"),
		}),
		(css) => {
			css.walkRules((rule) => {
				// Remove global rules like * and ::backdrop.
				if (rule.selector.startsWith("*") || rule.selector.startsWith("::backdrop")) {
					rule.remove();
				}
			});
		},
		require("autoprefixer")({ grid: true }),
		ctx.env === "production" &&
			require("cssnano")({
				preset: [
					"default",
					{
						discardComments: {
							removeAll: true,
						},
					},
				],
			}),
	],
});
