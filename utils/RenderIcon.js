import dynamic from 'next/dynamic';

const iconCache = {};

export const IconComponent = ({ key, icon, href, customClassName }) => {
    if (!iconCache[icon]) {
        iconCache[icon] = dynamic(() => import('@/lib/reactIcons').then(mod => mod[icon]), {
            loading: () => <span>Loading...</span>, // Disable server-side rendering for icons if not needed
        });
    }

    const DynamicIconComponent = iconCache[icon];

    if (undefined === DynamicIconComponent) {
        return null;
    }

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
        <DynamicIconComponent key={icon} className={customClassName} />
    );
};