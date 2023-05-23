import { Songs } from "./songs";

export interface Playlist {
    id: string,
    name: string | undefined,
    imgUrl: string | undefined,
    song?: Songs[]
}
