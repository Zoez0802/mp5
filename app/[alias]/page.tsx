import getUrlByAlias from "@/lib/getUrlByAlias";
import { redirect } from "next/navigation";

export default async function RedirectPage(props: {
    params: Promise<{ alias: string }>;
}) {
    const { alias } = await props.params;

    const targetUrl = await getUrlByAlias(alias);

    if (!targetUrl) {
        redirect("/");   // alias not found
    }

    redirect(targetUrl);  // go to the long URL
}
