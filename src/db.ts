import { Artist, Artwork, Country, createApiUrl, EndPoint, Gallery } from './types';

// artworks-nearby: "/api/artworks_nearby/:lat/:long/:limit"
// artist-artworks: "/api/artist_artworks/:artistid"
// artists: "/api/artists"
// artworks-all: "/api/artworks_all"
// artworks-highlights: "/api/artworks_highlights"
// artworks-random: "/api/artworks_random"
// countries: "/api/countries"
// country-artworks: "/api/country_artworks/:countryId"
// galleries-nearby: "/api/galleries_nearby/:lat/:long/:limit"
// galleries: "/api/galleries"
// gallery-artworks: "/api/gallery_artworks/:galleryId"


// Example Usage
// const url1 = createApiUrl("artists", "artists");
// const url2 = createApiUrl("artworks", `artworks-nearby/40.7128/-74.0060/10`);

export const getArtworksNearby = () => {
    const url = createApiUrl("artworks", `artworks_nearby/40.7128/-74.0060/10`);
    return fetch(url)
        .then(res => res.json())
        .then(data => data as Artwork[]);
};
