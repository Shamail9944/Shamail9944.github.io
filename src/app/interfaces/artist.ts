import { Songs } from "./songs";

export interface Artists {
    id: string,
    name: string | undefined,
    imgUrl: string | undefined,
    song?: Songs[]
}
