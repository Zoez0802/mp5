"use client";
import createShortUrl from "@/lib/createShortUrl";
import { ShortUrlDoc } from "@/types";
import { Button, FormHelperText, TextField } from "@mui/material";
import { useState } from "react";

const BASE_URL = "https://cs391-url-shortener.vercel.app";

export default function ShortenForm() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [shortUrl, setShortUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);


    return (
        <form
            className="w-full rounded-2xl p-5 bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm"
            onSubmit={async (event) => {
                event.preventDefault();
                setShortUrl(null); // reset previous result each submit
                setError(null);    // reset previous error for the same reason

                createShortUrl(url, alias)
                    .then((doc: ShortUrlDoc) => {setShortUrl(`${BASE_URL}/${doc.alias}`);})
                    .catch((err) => {console.error(err);
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
                    backgroundColor: "white", width: "100%",}}
                label="Long URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />

            <div className="mt-4">
                <p className="text-xs text-slate-600 mb-1">Custom Alias</p>
                <div className="flex items-center gap-1">
                    <span className="text-xs text-slate-600 font-mono">
                        {BASE_URL}/
                    </span>
                    <TextField
                        variant="filled"
                        sx={{backgroundColor: "white"}}
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

            {shortUrl && (
                <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-3">
                    {/* show the resulting link */}
                    <p className="text-sm text-slate-700 mb-1">Your short URL:</p>

                    <p className="font-mono break-all flex-1 text-slate-700">
                        {shortUrl}
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                        Select the link above to copy.
                    </p>
                </div>
            )}
        </form>
    );
}
