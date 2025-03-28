import { Artist, Artwork, Country, createApiUrl, Gallery } from './types';

// artworks-nearby: "/api/artworks_nearby/:lat/:long/:limit"
// artist-artworks: "/api/artist_artworks/:artistid"
// artists: "/api/artists"
// artist-details: "/api/artist_detail/:artistId"
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


export const getArtists = () => {
    const url = createApiUrl("artists", `artists`);
    return fetch(url)
        .then(res => res.json())
        .then(data => data as Artist[]);
};

export const getArtworks = () => {
    const url = createApiUrl("artworks", `artworks_all`);
    return fetch(url)
        .then(res => res.json())
        .then(data => data as Artwork[]);
};

export const getGalleries = () => {
    const url = createApiUrl("galleries", `galleries`);
    return fetch(url)
        .then(res => res.json())
        .then(data => data as Gallery[]);
};

export const getCountries = () => {
    const url = createApiUrl("countries", `countries`);
    return fetch(url)
        .then(res => res.json())
        .then(data => data as Country[]);
};


export const getArtworksNearby = (lat: number, lon: number, radius: number = 100) => {
    const url = createApiUrl("artworks", `artworks_nearby/${lat}/${lon}/${radius}`);
    return fetch(url)
        .then(res => res.json())
        .then(data => data as Artwork[]);
};

export const getHighlights = () => {
    const url = createApiUrl("artworks", `artworks_highlights`);
    return fetch(url)
        .then(res => res.json())
        .then(data => data as Artwork[]);
};

export const getArtistArtworks = (artistId: string) => {
    const url = createApiUrl("artists", `artist_artworks/${artistId}`);
    return fetch(url)
        .then(res => res.json())
        .then(data => data as Artwork[]);
};

export const getArtistDetails = (artistId: string) => {
    const url = createApiUrl("artists", `artist_detail/${artistId}`);
    return fetch(url)
        .then(res => res.json())
        .then(data => data as Artist);
};