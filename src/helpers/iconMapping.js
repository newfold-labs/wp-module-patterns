/**
 * WordPress dependencies
 */
import {
	button,
	category,
	columns,
	gallery,
	heading,
	help,
	people,
	postFeaturedImage,
	postList,
	quote,
	header,
	footer,
	typography,
	inbox,
	list,
	postTerms,
	media,
	starFilled,
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
	"patterns-gallery": gallery,
	"patterns-blog": postList,
	"patterns-call-to-action": button,
	"patterns-faq": help,
	"patterns-features": category,
	"patterns-forms": inbox,
	"patterns-headings": heading,
	"patterns-hero": postFeaturedImage,
	"patterns-pricing-table": columns,
	"patterns-menu": list,
	"patterns-team": people,
	"patterns-testimonials": quote,
	"patterns-text": typography,
	"patterns-header": header,
	"patterns-footer": footer,
	"patterns-products": postTerms,
	"patterns-media-embeds": media,
	"patterns-featured": starFilled,
};

export default iconMapping;
