export const environment = {};
export const SpotifyAuthorization = {
    authEndpoint: 'https://accounts.spotify.com/authorize',
    clientId: '3108e5d2317244bbaf4a4d6dfc3670b8',
    clientSecret: '13109872cecc47de83502ab6f2ae905e',
    redirectUrl: 'http://localhost:4200/login/',
    // redirectUrl: '/login/',
    scopes: [
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "user-modify-playback-state",
        "user-library-read",
        "playlist-read-private",
        "playlist-read-collaborative",
    ]
}