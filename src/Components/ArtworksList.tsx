import { Artwork } from '../types';


interface ArtworkListProps {
    artworks: Artwork[];
}

export default function ArtworksList({ artworks }: ArtworkListProps) {
    console.log(artworks);
    return (
        <>
            <div className="as-artwork-list">
                <div>art 1</div>
                <div>art 1</div>

            </div>
        </>
    )
}