import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { baseUrl } from "../config";
import { Artwork } from "../types";
import ASMap from "../Components/ASMap";

const ArtworkScreen: React.FC = () => {
    const location = useLocation();
    const artwork: Artwork | undefined = location.state?.artwork;

    const [isModalOpen, setModalOpen] = useState(false);

    if (!artwork) return <div className="error">Artwork not found</div>;

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div className="container artwork-screen">
            <div className="top-container">
                <div className="as-artwork-detail">
                    <img
                        src={`${baseUrl}${artwork.imageUrl}`}
                        alt={artwork.artworkTitle}
                        onClick={openModal}
                        style={{ cursor: 'pointer' }}
                    />
                    <h4>{artwork.artworkTitle} - {artwork.artistTitle}</h4>
                </div>
            </div>
            <div className="bottom-container">
                <div className="as-artist-detail">
                    <Link to={`/artist/${artwork.artistId}`}>
                        <div className="as-artwork-card">
                            <img src={`${baseUrl}${artwork.artistImageUrl}`} alt={artwork.artistTitle} />
                            <div className="as-artwork-card-content">
                                <h4>{artwork.artistTitle}</h4>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="as-gallery-detail">
                    <Link key={artwork.galleryId} to={`/gallery/${artwork.galleryId}`}>
                        <ASMap artworks={[artwork]} />
                    </Link>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeModal}>&times;</button>
                        <img
                            src={`${baseUrl}${artwork.imageUrl}`}
                            alt={artwork.artworkTitle}
                            className="modal-image"
                        />
                        <h4>{artwork.artworkTitle}</h4>
                        <p>{artwork.artistTitle}</p>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ArtworkScreen;
