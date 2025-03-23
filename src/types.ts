import { apiUrl } from "./config";

type EntityType = "artists" | "artworks" | "galleries" | "countries";


type EntityApiPaths = {
    artists: "artists"
    | `artist_artworks/${string}` // artistId
    | `artist_detail/${string}`; // artistId
    artworks: "artworks_all"
    | "artworks_highlights"
    | "artworks_random"
    | `artworks_nearby/${number}/${number}/${number}`
    | `artwork/${string}`; // artworkId
    galleries: "galleries"
    | `gallery_artworks/${string}`
    | `galleries_nearby/${number}/${number}/${number}`; // lat, long, limit
    countries: "countries"
    | `country_artworks/${string}`; // countryId
};

export interface EndPoint<T extends EntityType> {
    req: "GET";
    url: `${typeof apiUrl}/${EntityApiPaths[T]}`;
}

export function createApiUrl<T extends EntityType>(
    _entity: T,
    path: EntityApiPaths[T]
): `${typeof apiUrl}/${EntityApiPaths[T]}` {
    return `${apiUrl}/${path}`;
}

// Example Usage
// const url1 = createApiUrl("artists", "artists");
// const url2 = createApiUrl("artworks", `artworks-nearby/40.7128/-74.0060/10`);

// we can get clever nesting these types however 
// it's helpful to have artwork contain everything  
export interface Artwork {
    artworkId: string;
    artworkTitle: string;
    artworkYear: string;
    artworkMedium: string;
    artworkStyle: string;
    artworkDimensions: string;
    artworkGalleryLink: string;
    imageUrl: string;
    artistImageUrl: string;
    artistId: string; // This links to an artist
    artistTitle: string;
    artistFirstname: string;
    artistLastname: string;
    galleryId: string;
    galleryTitle: string;
    galleryAddress: string;
    galleryLink: string;
    galleryLat: number;
    galleryLon: number;
    countryId: string;
    countryTitle: string;
}

export interface Artist {
    artistId: string;
    artistTitle: string;
    artistFirstname: string;
    artistLastname: string;
    artistImageUrl: string;
    artistNationality: string;
    artistShortBio: string;
    artistBio: string;
    artistBorn: string;
    artistDied: string;
}

export interface Gallery {
    galleryId: string;
    galleryTitle: string;
    galleryAddress: string;
    galleryLink: string;
    galleryLat: number;
    galleryLon: number;
    countryId: string;
    countryTitle: string;
}

export interface Country {
    countryId: string;
    countryTitle: string;
}

export interface GPSLocation {
    lat: number;
    lon: number;
    radius?: number;
}
