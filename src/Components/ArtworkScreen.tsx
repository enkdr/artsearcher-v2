import { Link, useLocation } from "react-router-dom";
import { baseUrl } from "../config";
import { Artwork } from "../types";
import ASMap from "./ASMap";

const ArtworkScreen: React.FC = () => {

    const location = useLocation();
    const artwork: Artwork | undefined = location.state?.artwork;

    if (!artwork) return <div className="error">Artwork not found</div>;

    return (
        <div className="container artwork-screen">
            <div className="top-container">
                <div className="as-artwork-detail">
                    <img src={`${baseUrl}${artwork.imageUrl}`} alt={artwork.artworkTitle} />
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
                    <ASMap artworks={[artwork]} />
                </div>
            </div>
        </div>
    );
};

export default ArtworkScreen;
