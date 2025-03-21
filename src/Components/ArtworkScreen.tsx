import { useLocation, useParams } from "react-router-dom";
import { baseUrl } from "../config";
import { Artwork } from "../types";

const ArtworkScreen: React.FC = () => {

    const { artworkId } = useParams<{ artworkId: string }>();
    const location = useLocation();
    const artwork: Artwork | undefined = location.state?.artwork;

    if (!artwork) return <p>Artwork not found</p>;


    return (
        <div className="container artwork-screen">
            <div className="top-container">
                <div className="as-artwork-detail">
                    <img src={`${baseUrl}${artwork.imageUrl}`} alt={artwork.artworkTitle} />
                    <h4>{artwork.artworkTitle} - {artwork.artistTitle}</h4>
                </div>
            </div>
            <div className="bottom-container">
                <div className="as-gallery-detail">
                    gallery: {artwork.galleryTitle}
                </div>
                <div className="as-artist-detail">
                    artist: {artwork.artistTitle}
                </div>
            </div>
        </div>
    );
};

export default ArtworkScreen;
