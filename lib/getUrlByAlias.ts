"use server";

import getCollection, { URLS_COLLECTION } from "@/db";
import { ShortUrlDoc } from "@/types";

export default async function getUrlByAlias(
    alias: string,
): Promise<string | null> {
    const urlsCollection = await getCollection(URLS_COLLECTION);

    // look up by alias
    const data = (await urlsCollection.findOne({ alias })) as ShortUrlDoc | null;

    if (data === null) {
        return null;
    }

    return data.url;
}
