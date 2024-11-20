/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

import {
	ImagesIcon,
	NewspaperIcon,
	MegaphoneIcon,
	CircleHelpIcon,
	LayoutListIcon,
	MailsIcon,
	BookTypeIcon,
	BookImageIcon,
	ReceiptIcon,
	BookOpenTextIcon,
	UsersIcon,
	MessageSquareMoreIcon,
	BookTextIcon,
	PanelTopDashedIcon,
	PanelBottomDashedIcon,
	GiftIcon,
	HeartIcon,
} from "lucide-react";

export const variations = [
	{
		name: "gallery",
		icon: {
			foreground: "var(--nfd-wba-color-brand)",
			src: <ImagesIcon style={{ maxWidth: "20px", fill: "transparent" }} />,
		},
		category: "nfd-wonder-blocks",
		attributes: { category: "gallery" },
		title: __("Gallery Patterns", "nfd-wonder-blocks"),
		description: __("Add Gallery patterns.", "nfd-wonder-blocks"),
		keywords: [
			__("images", "nfd-wonder-blocks"),
			__("photos", "nfd-wonder-blocks"),
			__("photography", "nfd-wonder-blocks"),
		],
		example: {
			attributes: {
				preview: "https://hiive.cloud/workers/wonderblocks-assets/previews/gallery.webp",
			},
		},
	},
	{
		name: "blog",
		icon: {
			foreground: "var(--nfd-wba-color-brand)",
			src: <NewspaperIcon style={{ maxWidth: "20px", fill: "transparent" }} />,
		},
		category: "nfd-wonder-blocks",
		attributes: { category: "blog" },
		title: __("Blog Patterns", "nfd-wonder-blocks"),
		description: __("Add Blog patterns.", "nfd-wonder-blocks"),
		keywords: [
			__("articles", "nfd-wonder-blocks"),
			__("posts", "nfd-wonder-blocks"),
			__("news", "nfd-wonder-blocks"),
		],
		example: {
			attributes: {
				preview: "https://hiive.cloud/workers/wonderblocks-assets/previews/blog.webp",
			},
		},
	},
	{
		name: "call-to-action",
		icon: {
			foreground: "var(--nfd-wba-color-brand)",
			src: <MegaphoneIcon style={{ maxWidth: "20px", fill: "transparent" }} />,
		},
		category: "nfd-wonder-blocks",
		attributes: { category: "call-to-action" },
		title: __("Call to Action Patterns", "nfd-wonder-blocks"),
		description: __("Add Call to Action patterns.", "nfd-wonder-blocks"),
		keywords: [
			__("cta", "nfd-wonder-blocks"),
			__("conversion", "nfd-wonder-blocks"),
			__("button", "nfd-wonder-blocks"),
			__("announcement", "nfd-wonder-blocks"),
		],
		example: {
			attributes: {
				preview: "https://hiive.cloud/workers/wonderblocks-assets/previews/cta.webp",
			},
		},
	},
	{
		name: "faq",
		icon: {
			foreground: "var(--nfd-wba-color-brand)",
			src: <CircleHelpIcon style={{ maxWidth: "20px", fill: "transparent" }} />,
		},
		category: "nfd-wonder-blocks",
		attributes: { category: "faq" },
		title: __("FAQ Patterns", "nfd-wonder-blocks"),
		description: __("Add FAQ patterns.", "nfd-wonder-blocks"),
		keywords: [__("frequently asked questions", "nfd-wonder-blocks")],
		example: {
			attributes: {
				preview: "https://hiive.cloud/workers/wonderblocks-assets/previews/faq.webp",
			},
		},
	},
	{
		name: "features",
		icon: {
			foreground: "var(--nfd-wba-color-brand)",
			src: <LayoutListIcon style={{ maxWidth: "20px", fill: "transparent" }} />,
		},
		category: "nfd-wonder-blocks",
		attributes: { category: "features" },
		title: __("Features Patterns", "nfd-wonder-blocks"),
		description: __("Add Features patterns.", "nfd-wonder-blocks"),
		keywords: [__("columns", "nfd-wonder-blocks"), __("about", "nfd-wonder-blocks")],
		example: {
			attributes: {
				preview: "https://hiive.cloud/workers/wonderblocks-assets/previews/features.webp",
			},
		},
	},
	{
		name: "forms",
		icon: {
			foreground: "var(--nfd-wba-color-brand)",
			src: <MailsIcon style={{ maxWidth: "20px", fill: "transparent" }} />,
		},
		category: "nfd-wonder-blocks",
		attributes: { category: "forms" },
		title: __("Form Patterns", "nfd-wonder-blocks"),
		description: __("Add Form patterns.", "nfd-wonder-blocks"),
		keywords: [
			__("form", "nfd-wonder-blocks"),
			__("email", "nfd-wonder-blocks"),
			__("CRM", "nfd-wonder-blocks"),
			__("contact", "nfd-wonder-blocks"),
		],
		example: {
			attributes: {
				preview: "https://hiive.cloud/workers/wonderblocks-assets/previews/forms.webp",
			},
		},
	},
	{
		name: "headings",
		icon: {
			foreground: "var(--nfd-wba-color-brand)",
			src: <BookTypeIcon style={{ maxWidth: "20px", fill: "transparent" }} />,
		},
		category: "nfd-wonder-blocks",
		attributes: { category: "headings" },
		title: __("Heading Patterns", "nfd-wonder-blocks"),
		description: __("Add Heading patterns.", "nfd-wonder-blocks"),
		keywords: [
			__("title", "nfd-wonder-blocks"),
			__("headline", "nfd-wonder-blocks"),
			__("tagline", "nfd-wonder-blocks"),
			__("text", "nfd-wonder-blocks"),
		],
		example: {
			attributes: {
				preview: "https://hiive.cloud/workers/wonderblocks-assets/previews/headings.webp",
			},
		},
	},
	{
		name: "hero",
		icon: {
			foreground: "var(--nfd-wba-color-brand)",
			src: <BookImageIcon style={{ maxWidth: "20px", fill: "transparent" }} />,
		},
		category: "nfd-wonder-blocks",
		attributes: { category: "hero" },
		title: __("Hero Patterns", "nfd-wonder-blocks"),
		description: __("Add Hero patterns.", "nfd-wonder-blocks"),
		keywords: [
			__("banner", "nfd-wonder-blocks"),
			__("image slider", "nfd-wonder-blocks"),
			__("homepage", "nfd-wonder-blocks"),
		],
		example: {
			attributes: {
				preview: "https://hiive.cloud/workers/wonderblocks-assets/previews/hero.webp",
			},
		},
	},
	{
		name: "pricing",
		icon: {
			foreground: "var(--nfd-wba-color-brand)",
			src: <ReceiptIcon style={{ maxWidth: "20px", fill: "transparent" }} />,
		},
		category: "nfd-wonder-blocks",
		attributes: { category: "pricing-table" },
		title: __("Pricing Table Patterns", "nfd-wonder-blocks"),
		description: __("Add Pricing Table patterns.", "nfd-wonder-blocks"),
		keywords: [
			__("plans", "nfd-wonder-blocks"),
			__("comparison", "nfd-wonder-blocks"),
			__("packages", "nfd-wonder-blocks"),
		],
		example: {
			attributes: {
				preview: "https://hiive.cloud/workers/wonderblocks-assets/previews/pricing-table.webp",
			},
		},
	},
	{
		name: "menu",
		icon: {
			foreground: "var(--nfd-wba-color-brand)",
			src: <BookOpenTextIcon style={{ maxWidth: "20px", fill: "transparent" }} />,
		},
		category: "nfd-wonder-blocks",
		attributes: { category: "menu" },
		title: __("Menu Patterns", "nfd-wonder-blocks"),
		description: __("Add Menu patterns.", "nfd-wonder-blocks"),
		keywords: [
			__("restaurant", "nfd-wonder-blocks"),
			__("cafe", "nfd-wonder-blocks"),
			__("coffee", "nfd-wonder-blocks"),
			__("catering", "nfd-wonder-blocks"),
			__("food", "nfd-wonder-blocks"),
			__("recipe", "nfd-wonder-blocks"),
		],
		example: {
			attributes: {
				preview: "https://hiive.cloud/workers/wonderblocks-assets/previews/menu.webp",
			},
		},
	},
	{
		name: "team",
		icon: {
			foreground: "var(--nfd-wba-color-brand)",
			src: <UsersIcon style={{ maxWidth: "20px", fill: "transparent" }} />,
		},
		category: "nfd-wonder-blocks",
		attributes: { category: "team" },
		title: __("Team Patterns", "nfd-wonder-blocks"),
		description: __("Add Team patterns.", "nfd-wonder-blocks"),
		keywords: [
			__("employees", "nfd-wonder-blocks"),
			__("members", "nfd-wonder-blocks"),
			__("profiles", "nfd-wonder-blocks"),
		],
		example: {
			attributes: {
				preview: "https://hiive.cloud/workers/wonderblocks-assets/previews/team.webp",
			},
		},
	},
	{
		name: "testimonials",
		icon: {
			foreground: "var(--nfd-wba-color-brand)",
			src: <MessageSquareMoreIcon style={{ maxWidth: "20px", fill: "transparent" }} />,
		},
		category: "nfd-wonder-blocks",
		attributes: { category: "testimonials" },
		title: __("Testimonial Patterns", "nfd-wonder-blocks"),
		description: __("Add Testimonial patterns.", "nfd-wonder-blocks"),
		keywords: [
			__("reviews", "nfd-wonder-blocks"),
			__("feedback", "nfd-wonder-blocks"),
			__("ratings", "nfd-wonder-blocks"),
		],
		example: {
			attributes: {
				preview: "https://hiive.cloud/workers/wonderblocks-assets/previews/testimonials.webp",
			},
		},
	},
	{
		name: "text",
		icon: {
			foreground: "var(--nfd-wba-color-brand)",
			src: <BookTextIcon style={{ maxWidth: "20px", fill: "transparent" }} />,
		},
		category: "nfd-wonder-blocks",
		attributes: { category: "text" },
		title: __("Text Patterns", "nfd-wonder-blocks"),
		description: __("Add Text patterns.", "nfd-wonder-blocks"),
		keywords: [
			__("highlight", "nfd-wonder-blocks"),
			__("write", "nfd-wonder-blocks"),
			__("format", "nfd-wonder-blocks"),
			__("recipe", "nfd-wonder-blocks"),
			__("rating", "nfd-wonder-blocks"),
		],
		example: {
			attributes: {
				preview: "https://hiive.cloud/workers/wonderblocks-assets/previews/text.webp",
			},
		},
	},
	{
		name: "header",
		icon: {
			foreground: "var(--nfd-wba-color-brand)",
			src: <PanelTopDashedIcon style={{ maxWidth: "20px", fill: "transparent" }} />,
		},
		category: "nfd-wonder-blocks",
		attributes: { category: "header" },
		title: __("Header Patterns", "nfd-wonder-blocks"),
		description: __("Add Header patterns.", "nfd-wonder-blocks"),
		keywords: [__("navigation", "nfd-wonder-blocks")],
		example: {
			attributes: {
				preview: "https://hiive.cloud/workers/wonderblocks-assets/previews/header.webp",
			},
		},
	},
	{
		name: "footer",
		icon: {
			foreground: "var(--nfd-wba-color-brand)",
			src: <PanelBottomDashedIcon style={{ maxWidth: "20px", fill: "transparent" }} />,
		},
		category: "nfd-wonder-blocks",
		attributes: { category: "footer" },
		title: __("Footer Patterns", "nfd-wonder-blocks"),
		description: __("Add Footer patterns.", "nfd-wonder-blocks"),
		example: {
			attributes: {
				preview: "https://hiive.cloud/workers/wonderblocks-assets/previews/footer.webp",
			},
		},
	},
	{
		name: "products",
		icon: {
			foreground: "var(--nfd-wba-color-brand)",
			src: <GiftIcon style={{ maxWidth: "20px", fill: "transparent" }} />,
		},
		category: "nfd-wonder-blocks",
		attributes: { category: "products" },
		title: __("Product Patterns", "nfd-wonder-blocks"),
		description: __("Add Product patterns.", "nfd-wonder-blocks"),
		keywords: [__("woocommerce", "nfd-wonder-blocks")],
		example: {
			attributes: {
				preview: "https://hiive.cloud/workers/wonderblocks-assets/previews/products.webp",
			},
		},
	},
	{
		name: "favorites",
		icon: {
			foreground: "var(--nfd-wba-color-brand)",
			src: <HeartIcon style={{ maxWidth: "20px", fill: "transparent" }} />,
		},
		category: "nfd-wonder-blocks",
		attributes: { category: "favorites" },
		title: __("My Favorite Patterns", "nfd-wonder-blocks"),
		description: __("A collection of patterns you've selected.", "nfd-wonder-blocks"),
		keywords: [
			__("liked", "nfd-wonder-blocks"),
			__("saved", "nfd-wonder-blocks"),
			__("bookmarked", "nfd-wonder-blocks"),
			__("starred", "nfd-wonder-blocks"),
		],
	},
];
