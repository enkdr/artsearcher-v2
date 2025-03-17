import ASMap from './ASMap';
import ArtworksList from './ArtworksList';

export default function Home() {
    return (
        <div className="container">
            <div className="map-container">
                <ASMap />
            </div>
            <div className="artwork-container">
                <ArtworksList />
            </div>
        </div>
    );
}
