import { nanoid } from "nanoid";

export function genNanoId(len = 10) {
    return nanoid(len)
}