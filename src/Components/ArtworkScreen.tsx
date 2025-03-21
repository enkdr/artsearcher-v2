import { Link, useLocation, useParams } from "react-router-dom";
import { baseUrl } from "../config";
import { Artwork } from "../types";

const ArtworkScreen: React.FC = () => {

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
                    {artwork.galleryTitle}
                </div>
            </div>
        </div>
    );
};

export default ArtworkScreen;
