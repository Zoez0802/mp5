import getUrlByAlias from "@/lib/getUrlByAlias";
import { redirect } from "next/navigation";

export default async function RedirectPage({
                                               params,
                                           }: {
    params: Promise<{ alias: string }>;
}) {
    const { alias } = await params;

    try {
        const targetUrl = await getUrlByAlias(alias);

        if (targetUrl === null) {
            return redirect("/");
        }

        return redirect(targetUrl);
    } catch (err) {
        console.error(err);
        return redirect("/");
    }
}
