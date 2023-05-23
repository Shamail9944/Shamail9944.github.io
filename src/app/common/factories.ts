import { Artists } from "../interfaces/artist";
import { Playlist } from "../interfaces/playlist";
import { Songs } from "../interfaces/songs";

export function newArtist(): Artists {
    return {
        id: '',
        imgUrl: '',
        name: '',
        song: []
    }
}

export function newTrack(): Songs {
    return {
        id: '',
        title: '',
        artists: [],
        album: {
            id: '',
            name: '',
            imgUrl: '',
        },
        tempo: ''
    }
}

export function newPlaylist(): Playlist {
    return {
        id: '',
        imgUrl: '',
        name: '',
        song: []
    }
}