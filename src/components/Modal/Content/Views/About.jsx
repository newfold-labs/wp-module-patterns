/**
 * WordPress dependencies
 */
import apiFetch from "@wordpress/api-fetch";
import { Warning } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import { useDispatch } from "@wordpress/data";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import { MoveLeftIcon } from "lucide-react";
import {
	DEFAULT_PATTERNS_CATEGORY,
	NFD_REST_URL,
	NFD_WONDER_BLOCKS_VERSION,
} from "../../../../constants";
import { useCategories } from "../../../../hooks";
import useSetCurrentView from "../../../../hooks/useSetCurrentView";
import { store as nfdPatternsStore } from "../../../../store";

const About = () => {
	const moduleVersion = NFD_WONDER_BLOCKS_VERSION;
	const hostLabel = window.nfdWonderBlocks.brand.name;
	const hostPlugin = window.nfdWonderBlocks.brand.plugin;
	const settingsPageUrl = window.nfdWonderBlocks.brand.pluginDashboardPage;

	const [syncing, setSyncing] = useState(false);
	const { mutate: mutatePatternCategories } = useCategories();
	const { mutate: mutateTemplateCategories } = useCategories("templates");
	const setCurrentView = useSetCurrentView();

	const { setActivePatternsCategory } = useDispatch(nfdPatternsStore);

	const handleSync = async () => {
		try {
			setSyncing(true);

			const response = await apiFetch({
				url: `${NFD_REST_URL}/clear-cache`,
				method: "POST",
				headers: {
					"x-nfd-wonder-blocks": "nfd_wonder_blocks",
				},
			});

			mutatePatternCategories();
			mutateTemplateCategories();

			setSyncing(false);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="nfd-wba-inset-0 nfd-wba-flex nfd-wba-grow nfd-wba-px-4 nfd-wba-py-8 sm:nfd-wba-px-6 nfd-wba-items-start nfd-wba-justify-center">
			<div className="nfd-wba-max-w-prose">
				<Button
					variant="link"
					onClick={() => {
						setActivePatternsCategory(DEFAULT_PATTERNS_CATEGORY);
						setCurrentView("library");
					}}
				>
					<MoveLeftIcon size={16} className="nfd-wba-mr-1" />
					{__("Back to Patterns", "nfd-wonder-blocks")}
				</Button>
				<div className="nfd-wba-flex nfd-wba-row nfd-wba-gap-4 nfd-wba-items-center">
					<h1>WonderBlocks</h1>
					<p className="nfd-wba-bg-gray-100 nfd-wba-border-gray-200 nfd-wba-border-solid nfd-wba-border-[1px] nfd-wba-rounded-full nfd-wba-py-1 nfd-wba-px-2 nfd-wba-text-[15px] nfd-wba-text-dark-lighter">
						v{moduleVersion}
					</p>
				</div>

				<p className="nfd-wba-text-[15px]">
					WonderBlocks lets you customize premade page templates and section design patterns using
					the built-in Blocks in WordPress – but made wonderful. Take the stress out of going from
					blank canvas to beautiful creation with professionally-designed Patterns for common
					website needs.
				</p>
				<p className="nfd-wba-text-[15px]">
					WonderBlocks is a feature of your {hostLabel} hosting plan and is powered by
					{" " + hostPlugin}. You can update your WonderBlocks settings{" "}
					<a href={settingsPageUrl} className="nfd-wba-text-blue-500 hover:nfd-wba-underline">
						here
					</a>
					.
				</p>

				<Warning
					className="nfd-wba-mt-10 !nfd-wba-px-6 nfd-wba-rounded-[4px] nfd-wba-border-gray-200 nfd-wba-bg-gray-100"
					actions={[
						<Button
							variant="primary"
							className="hover:!nfd-wba-bg-brand-darker hover:nfd-wba-text-white focus-visible:nfd-wba-text-white active:nfd-wba-bg-brand-darker-10 active:!nfd-wba-text-white"
							disabled={syncing}
							onClick={handleSync}
						>
							{syncing
								? __("Syncing...", "nfd-wonder-blocks")
								: __("Sync Now", "nfd-wonder-blocks")}
						</Button>,
					]}
				>
					<p className="nfd-wba-text-dark-lighter nfd-wba-mt-0.5 nfd-wba-text-[15px]">
						{__(
							"Pattern & Template library automatically syncs once a day. If you want to manually refresh the library, you can do so by pressing the button to get the most recent designs.",
							"nfd-wonder-blocks"
						)}
					</p>
				</Warning>
			</div>
		</div>
	);
};

export default About;
