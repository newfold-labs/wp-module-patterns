/**
 * WordPress dependencies
 */
import {
	button,
	category,
	columns,
	footer,
	gallery,
	header,
	heading,
	help,
	inbox,
	info,
	layout,
	link,
	list,
	media,
	megaphone,
	people,
	postContent,
	postFeaturedImage,
	postList,
	postTerms,
	quote,
	starFilled,
	store,
	typography,
} from "@wordpress/icons";

/**
 * Mapping of category names to their corresponding icons.
 *
 * This object maps specific category names to their respective icons imported from the
 * @wordpress/icons package. The keys in this object are the category names used in the application,
 * and the values are the corresponding icon components.
 *
 * @type {Object.<string, React.Component>}
 */
const iconMapping = {
	"patterns-categories-gallery": gallery,
	"patterns-categories-blog": postList,
	"patterns-categories-call-to-action": button,
	"patterns-categories-faq": help,
	"patterns-categories-features": category,
	"patterns-categories-forms": inbox,
	"patterns-categories-headings": heading,
	"patterns-categories-hero": postFeaturedImage,
	"patterns-categories-pricing-table": columns,
	"patterns-categories-menu": list,
	"patterns-categories-team": people,
	"patterns-categories-testimonials": quote,
	"patterns-categories-text": typography,
	"patterns-categories-header": header,
	"patterns-categories-footer": footer,
	"patterns-categories-products": postTerms,
	"patterns-categories-media-embeds": media,
	"patterns-categories-featured": starFilled,
	"patterns-usage_tags-layout": layout,
	"patterns-usage_tags-content": postContent,
	"patterns-usage_tags-info": info,
	"patterns-usage_tags-commerce": store,
	"patterns-usage_tags-marketing": megaphone,
	"patterns-usage_tags-interactive": link,
};

export default iconMapping;
