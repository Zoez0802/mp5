import getCollection, { URLS_COLLECTION } from "@/db";

export default async function getUrlByAlias(
    shortcut: string,
): Promise<string | null> {
    const urlsCollection = await getCollection(URLS_COLLECTION);
    const data = await urlsCollection.findOne({ shortcut });

    if (data === null) {
        return null;
    }

    return data.url;
}
