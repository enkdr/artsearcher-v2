import { Gallery } from "../types";
import { baseUrl } from "../config";


interface GalleriesListProps {
    galleries: Gallery[];
}

interface GalleryItemProps {
    gallery: Gallery;
}

const GalleriesList: React.FC<GalleriesListProps> = ({ galleries }) => {
    return (
        <>
            <input className="as-search-input" type="text" placeholder="Search Galleries" />
            <div className="as-artist-list">
                {galleries.map((gallery: Gallery, i) => (
                    <GalleryItem key={i} gallery={gallery} />
                ))}
            </div>
        </>
    );
};

const GalleryItem: React.FC<GalleryItemProps> = ({ gallery }) => {
    return (
        <div className="as-artist-card">
            <img loading="lazy" src="https://placehold.co/600x400/000000/FFF" alt={gallery.galleryTitle} />
            <div className="as-artist-card-content">
                <h4>{gallery.galleryTitle}</h4>
                <p className="as-artists-card-nationality">{gallery.galleryAddress}</p>
            </div>
        </div>
    );
}

export default GalleriesList;
