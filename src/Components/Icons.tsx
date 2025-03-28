import React from 'react'

interface IconProps {
    icon: keyof typeof iconPaths;
    onClick?: (e: any) => void;
    size?: number;
    className?: string;
}

export const Icon: React.FC<IconProps> = ({ icon, onClick, size = 24, className }) => {

    const paths = iconPaths[icon];

    if (!paths) {
        console.warn(`No icon found for ${icon}`);
        return null;
    }

    return (
        <svg
            className={className}
            onClick={onClick}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            width={size}
            height={size}
            strokeWidth="1"
            strokeLinejoin="round"
            strokeLinecap="round"
            stroke="currentColor"
        >
            {paths.map((path, i) => (
                <path key={i} d={path}></path>
            ))}
        </svg>
    );
}

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="1">
    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
    <path d="M21 21l-6 -6"></path>
</svg>

const iconPaths = {
    search: [
        'M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0',
        'M21 21l-6 -6'
    ],
    location: [
        'M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0',
        'M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0',
        'M12 2l0 2',
        'M12 20l0 2',
        'M20 12l2 0',
        'M2 12l2 0'
    ],
    artist: [
        'M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0',
        'M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2'
    ],
    artwork: [
        'M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z',
        'M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5',
        'M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3'
    ],
    gallery: [
        'M5 3h1a1 1 0 0 1 1 1v2h3v-2a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2h3v-2a1 1 0 0 1 1 -1h1a1 1 0 0 1 1 1v4.394a2 2 0 0 1 -.336 1.11l-1.328 1.992a2 2 0 0 0 -.336 1.11v7.394a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1v-7.394a2 2 0 0 0 -.336 -1.11l-1.328 -1.992a2 2 0 0 1 -.336 -1.11v-4.394a1 1 0 0 1 1 -1z',
        'M10 21v-5a2 2 0 1 1 4 0v5'
    ],
    map: [
        'M3 7l6 -3l6 3l6 -3v13l-6 3l-6 -3l-6 3v-13',
        'M9 4v13',
        'M15 7v13'
    ],
    home: [
        'M5 12l-2 0l9 -9l9 9l-2 0',
        'M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7',
        'M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6'
    ],
    close: [
        'M18 6l-12 12',
        'M6 6l12 12'
    ],
    arrowLeft: [
        'M13 15l-3 -3l3 -3',
        'M21 12a9 9 0 1 0 -18 0a9 9 0 0 0 18 0z'
    ],
    arrowRight: [
        'M11 9l3 3l-3 3',
        'M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0z'
    ]
}


export const defaultProfileImage = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="48" height="48" strokeWidth="0.75">
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
        <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
        <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
    </svg>
);

export const defaultArtworkImage = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="48" height="48" strokeWidth="0.75">
        <path d="M15 8h.01"></path>
        <path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z"></path>
        <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5"></path>
        <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3"></path>
    </svg>
)