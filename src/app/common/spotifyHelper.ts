import { addMilliseconds, format } from "date-fns";
import { Artists } from "../interfaces/artist";
import { Playlist } from "../interfaces/playlist";
import { Songs } from "../interfaces/songs";
import { User } from "../interfaces/user";
import { newPlaylist, newTrack } from "./factories";


export function SpotifyUserProfileResponce(user: SpotifyApi.CurrentUsersProfileResponse): User {
    return {
        id: user.id,
        name: user.display_name!,
        imgUrl: user.images?.pop()?.url
    }
}
export function SpotifySinglePlaylist(playlist: SpotifyApi.SinglePlaylistResponse): Playlist {
    if (!playlist)
        return newPlaylist()

    return {
        id: playlist.id,
        name: playlist.name,
        imgUrl: playlist.images?.shift()?.url,
        song: []
    }
}
export function SpotifyPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): Playlist {
    return {
        id: playlist.id,
        name: playlist.name,
        imgUrl: playlist.images?.pop()?.url
    }
}
export function SpotifyArtists(artist: SpotifyApi.ArtistObjectFull): Artists {
    return {
        id: artist.id,
        name: artist.name,
        imgUrl: artist.images.sort((a, b) => a.width! - b.width!).pop()?.url
    }
}
export function SpotifyTracks(track: SpotifyApi.TrackObjectFull): Songs {

    if (!track)
        return newTrack()

    const songDuration = (ms: number) => {
        const data = addMilliseconds(new Date(0), ms)
        return format(data, 'mm:ss')
    }

    return {
        id: track.uri,
        title: track.name,
        artists: track.artists.map(x => ({
            id: x.id,
            name: x.name
        })),
        album: {
            id: track.album.id,
            name: track.album.name,
            imgUrl: track.album.images.shift()?.url,
        },
        tempo: songDuration(track.duration_ms)
    }
}