"use client";
import createShortUrl from "@/lib/createShortUrl";
import { ShortUrlDoc } from "@/types";
import { Button, FormHelperText, TextField } from "@mui/material";
import { useState, useEffect } from "react";



export default function ShortenForm() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [shortUrl, setShortUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [origin, setOrigin] = useState(""); // this is for the base url display, when on vercel it shows the url for vercel

    useEffect(() => {
        if (typeof window !== "undefined") {
            setOrigin(window.location.origin);
        }
    }, []);

    return (
        <form
            className="w-full rounded-2xl p-5 bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm"
            onSubmit={(event) => {
                event.preventDefault();
                setShortUrl(null); // reset previous result each submit
                setError(null);    // reset previous error for the same reason

                createShortUrl(url, alias)
                    .then((doc: ShortUrlDoc) => {
                        // use the current origin (localhost in dev, Vercel in prod)
                        const base = origin || (typeof window !== "undefined" ? window.location.origin : "");
                        setShortUrl(`${base}/${doc.alias}`);
                    })
                    .catch((err) => {
                        console.error(err);
                        if (err instanceof Error) {
                            setError(err.message);
                        } else {
                            setError("Something went wrong :(");
                        }
                    });
            }}
        >
            <TextField
                variant="filled"
                sx={{
                    backgroundColor: "white",
                    width: "100%",
                }}
                label="Long URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />

            <div className="mt-4">
                <p className="text-xs text-slate-600 mb-1">Custom Alias</p>
                <div className="flex items-center gap-1">
                <span className="text-xs text-slate-600 font-mono">
                    {origin ? `${origin}/` : "/"}
                </span>
                    <TextField
                        variant="filled"
                        sx={{ backgroundColor: "white" }}
                        placeholder="my-alias"
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                    />
                </div>
            </div>

            <FormHelperText className="text-slate-500"> {/* slate for softer modern gray */}
                Enter the long URL and pick an alias you can remember.
            </FormHelperText>

            {error && (
                <FormHelperText error sx={{ marginTop: 0 }}>
                    {error}
                </FormHelperText>
            )}

            <div className="w-full flex justify-center mt-4">
                <Button
                    sx={{width: "100px", textTransform: "none", backgroundColor: "#3b82f6", ":hover": { backgroundColor: "#2563eb" },}}
                    variant="contained"
                    type="submit"
                    disabled={url === "" || alias === ""}
                >
                    Shorten
                </Button>
            </div>

            <div className="mt-4">
                <p className="text-xs text-slate-600 mb-1">Custom Alias</p>
                <div className="flex items-center gap-1">
          <span className="text-xs text-slate-600 font-mono">
            {origin ? `${origin}/` : "/"}
          </span>
                </div>
            </div>

            {shortUrl && (
                <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <p className="text-sm text-slate-700 mb-1">Your short URL:</p>
                    {/*make the link clickable*/}
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="font-mono break-all flex-1 text-slate-700 underline">
                        {shortUrl}
                    </a>

                    <p className="text-xs text-slate-500 mt-1">
                        Click the link above or copy it into your browser.
                    </p>
                </div>
            )}

        </form>
    );
}
