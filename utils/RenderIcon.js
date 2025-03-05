// @/utils/RenderIcon.js
import dynamic from "next/dynamic";

const iconCache = {};

export const IconComponent = ({ key, icon, href, customClassName }) => {
	if (!iconCache[icon]) {
		iconCache[icon] = dynamic(
			() =>
				import("@/lib/reactIcons").then((mod) => {
					// Check if the icon exists in the module
					if (mod[icon]) {
						return mod[icon];
					} else {
						console.error(`Icon "${icon}" not found in reactIcons.js`);
						return () => <span>Icon Not Found</span>; // Return a fallback component
					}
				}),
			{
				loading: () => <span></span>,
			}
		);
	}

	const DynamicIconComponent = iconCache[icon];

	// No need to check for undefined here anymore, we handle it in the dynamic import
	// if (undefined === DynamicIconComponent) {
	//     return null;
	// }

	return href ? (
		<a
			key={key}
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Click to visit the socials for our staff."
		>
			<DynamicIconComponent className={customClassName} />
		</a>
	) : (
		<DynamicIconComponent
			key={icon}
			className={customClassName}
		/>
	);
};
