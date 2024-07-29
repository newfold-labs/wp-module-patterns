/**
 * Internal dependencies
 */
import About from "./Views/About";
import Info from "./Views/Info";
import Library from "./Views/Library";

const Content = ({ view }) => {
	return (
		<div className="nfd-wba-flex nfd-wba-grow nfd-wba-flex-col sm:nfd-wba-overflow-y-auto md:nfd-wba-min-w-[400px]">
			<div className="nfd-wba-relative nfd-wba-flex nfd-wba-min-h-[50vh] nfd-wba-grow nfd-wba-flex-col nfd-wba-gap-y-10">
				{view === "library" && <Library />}
				{view === "info" && <Info />}
				{view === "about" && <About />}
			</div>
		</div>
	);
};
export default Content;
