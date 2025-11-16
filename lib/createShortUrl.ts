"use server";
import getCollection, { URLS_COLLECTION } from "@/db";
import { ShortUrlDoc } from "@/types";

export default async function createShortUrl(
    url: string,
    alias: string,
): Promise<ShortUrlDoc> {

    if (!(url.startsWith("http://") || url.startsWith("https://"))) {
        throw new Error("URL must start with http:// or https://");
    }
    //add for validation:piazza post
    if (encodeURIComponent(alias) !== alias) {
        throw new Error("Invalid alias: You may only use valid URL characters.");
    }

    const urlsCollection = await getCollection(URLS_COLLECTION);
//made a extra duplication check for URI uniqueness
    const existing = await urlsCollection.findOne({ alias });
    if (existing !== null) {
        throw new Error("That alias is already taken");
    }

    const doc: ShortUrlDoc = {alias, url};

    const res = await urlsCollection.insertOne(doc);

    if (!res.acknowledged) {
        throw new Error("DB insert failed");
    }

    return doc;
}
