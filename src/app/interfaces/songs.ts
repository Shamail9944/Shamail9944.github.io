export interface Songs {
    id: string,
    title: string,
    artists: {
        id: string,
        name: string,
    }[],
    album: {
        id: string,
        name: string,
        imgUrl: string | undefined,
    },
    tempo: string
}
