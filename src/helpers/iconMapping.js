import {
	StarIcon,
	ImagesIcon,
	BookImageIcon,
	LayoutListIcon,
	MailsIcon,
	GiftIcon,
	MegaphoneIcon,
	BookTypeIcon,
	BookTextIcon,
	MessageSquareMoreIcon,
	CircleHelpIcon,
	UsersIcon,
	ReceiptIcon,
	BookOpenTextIcon,
	NewspaperIcon,
	TvMinimalPlayIcon,
	LayoutPanelLeftIcon,
	LibraryBigIcon,
	BadgeInfoIcon,
	ShoppingCartIcon,
	RadioTowerIcon,
	KeyboardIcon,
	HomeIcon,
	SquareUserRoundIcon,
	SendIcon,
	WarehouseIcon,
	BlindsIcon,
	PanelTopDashedIcon,
	PanelBottomDashedIcon,
} from "lucide-react";

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
	"patterns-categories-gallery": <ImagesIcon size={20} />,
	"patterns-categories-blog": <NewspaperIcon size={20} />,
	"patterns-categories-call-to-action": <MegaphoneIcon size={20} />,
	"patterns-categories-faq": <CircleHelpIcon size={20} />,
	"patterns-categories-features": <LayoutListIcon size={20} />,
	"patterns-categories-forms": <MailsIcon size={20} />,
	"patterns-categories-headings": <BookTypeIcon size={20} />,
	"patterns-categories-hero": <BookImageIcon size={20} />,
	"patterns-categories-pricing-table": <ReceiptIcon size={20} />,
	"patterns-categories-menu": <BookOpenTextIcon size={20} />,
	"patterns-categories-team": <UsersIcon size={20} />,
	"patterns-categories-testimonials": <MessageSquareMoreIcon size={20} />,
	"patterns-categories-text": <BookTextIcon size={20} />,
	"patterns-categories-header": <PanelTopDashedIcon size={20} />,
	"patterns-categories-footer": <PanelBottomDashedIcon size={20} />,
	"patterns-categories-products": <GiftIcon size={20} />,
	"patterns-categories-media-embeds": <TvMinimalPlayIcon size={20} />,
	"patterns-categories-featured": <StarIcon size={20} />,
	"patterns-usage_tags-layout": <LayoutPanelLeftIcon size={20} />,
	"patterns-usage_tags-content": <LibraryBigIcon size={20} />,
	"patterns-usage_tags-info": <BadgeInfoIcon size={20} />,
	"patterns-usage_tags-commerce": <ShoppingCartIcon size={20} />,
	"patterns-usage_tags-marketing": <RadioTowerIcon size={20} />,
	"patterns-usage_tags-interactive": <KeyboardIcon size={20} />,
	"templates-featured": <StarIcon size={20} />,
	"templates-home": <HomeIcon size={20} />,
	"templates-about": <SquareUserRoundIcon size={20} />,
	"templates-blog": <NewspaperIcon size={20} />,
	"templates-shop": <ShoppingCartIcon size={20} />,
	"templates-contact": <SendIcon size={20} />,
	"templates-frequently-asked-questions": <CircleHelpIcon size={20} />,
	"templates-testimonials": <MessageSquareMoreIcon size={20} />,
	"templates-link-in-bio": <WarehouseIcon size={20} />,
	"templates-coming-soon": <BlindsIcon size={20} />,
};

export default iconMapping;
