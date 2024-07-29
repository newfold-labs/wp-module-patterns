/**
 * Internal dependencies
 */
import { NFD_WONDER_BLOCKS_VERSION } from "../../../../constants";

const About = () => {
	const moduleVersion = NFD_WONDER_BLOCKS_VERSION;
	const hostLabel = "Bluehost";
	const host = "HostPlugin";
	const settingsPageUrl = "/wp-admin/admin.php?page=wonderblocks-settings";

	return (
		<div className="nfd-wba-inset-0 nfd-wba-flex nfd-wba-grow nfd-wba-px-4 nfd-wba-py-8 sm:nfd-wba-px-6 nfd-wba-items-start nfd-wba-justify-center">
			<div className="nfd-wba-max-w-prose">
				<div className="nfd-wba-flex nfd-wba-row nfd-wba-gap-4 nfd-wba-items-center">
					<h1>WonderBlocks</h1>
					<p className="nfd-wba-bg-grey nfd-wba-rounded-full nfd-wba-py-1 nfd-wba-px-2 nfd-wba-text-[15px] nfd-wba-text-dark-lighter">
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
					WonderBlocks is a feature of your {hostLabel} hosting plan and is powered by the {host}{" "}
					Plugin. You can update your WonderBlocks settings{" "}
					<a href={settingsPageUrl} className="nfd-wba-text-blue-500 hover:nfd-wba-underline">
						here
					</a>
					.
				</p>
			</div>
		</div>
	);
};

export default About;
