"use client";

import { useState, FormEvent, useCallback, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import Logo from "./android-chrome-512x512.png";

export default function AIImage(): React.ReactNode {
  const [prompt, setPrompt] = useState<string>("");
  const [width, setWidth] = useState<number>(1280);
  const [height, setHeight] = useState<number>(720);
  const [customSize, setCustomSize] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [close, setClose] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const queryParam = new URLSearchParams(window.location.search).get("q");
    if (queryParam) {
      setPrompt(queryParam);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setImageUrl(null);
    setClose(false);
    const seed = Math.floor(Math.random() * 100000000); // Generate a random seed
    if (prompt) {
      router.push(`?q=${encodeURIComponent(prompt)}`);
    }
    const endpoint = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      prompt
    )}?nologo=1&seed=${seed}&height=${height}&width=${width}`;

    try {
      const response = await fetch(endpoint, {
        next: { revalidate: 86400 }, // Cache the fetched image for 24 hours
      });

      if (response.ok) {
        setImageUrl(response.url);
      } else {
        console.error("Failed to fetch the image from the API");
      }
    } catch (error) {
      console.error("Error fetching the AI image:", error);
      setImageUrl(null);
      setClose(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomSize(value === "tiktok");

    switch (value) {
      case "tiktok":
        setWidth(1080);
        setHeight(1920);
        break;
      case "youtube":
        setWidth(1280);
        setHeight(720);
        break;
      case "instagram":
        setWidth(1080);
        setHeight(1080);
        break;
      case "portrait":
        setWidth(720);
        setHeight(1280);
        break;
      case "landscape":
        setWidth(1280);
        setHeight(720);
        break;
      default:
        setWidth(1280);
        setHeight(720);
        break;
    }
  };

  const download = (filename: any, content: any) => {
    var element = document.createElement("a");
    element.setAttribute("href", content);
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  const handleDownload = useCallback(async () => {
    try {
      // @ts-ignore
      const result = await fetch(imageUrl, {
        method: "GET",
        headers: {},
      });
      const blob = await result.blob();
      const url = URL.createObjectURL(blob);
      const fileName = uuidv4();
      download(fileName, url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  }, [imageUrl]);

  return (
    <div className="relative bg-none md:bg-[url('/brand_banner.webp')] bg-center md:bg-contain bg-cover bg-no-repeat bg-slate-800 w-full">
      <h1 className="text-white md:text-4xl text-xl rounded-md mb-8 text-center bg-purple-800 p-3 sticky top-0">
        ✨ Free AI Image Generator Unlimited - Developed by Mahesh Mutttinti ✨
      </h1>
      <div className="relative w-full flex flex-col items-center justify-center md:min-h-screen h-full overflow-y-scroll p-4">
        {/* @ts-ignore */}
        <Image
          height={100}
          src={Logo}
          className="md:hidden mx-auto "
          alt="website logo"
        />
        <form
          onSubmit={handleSubmit}
          className="relative container md:max-w-lg flex flex-col items-center w-full bg-violet-900 p-6 rounded-lg shadow-lg"
        >
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="🖋️ Enter your image prompt"
            className="w-full p-3 mb-4 text-xl text-black bg-red-100 border-none rounded-lg"
            required
          />
          <div className="flex flex-col w-full mb-4 text-white">
            {[
              { value: "tiktok", label: "TikTok (1080x1920)" },
              { value: "youtube", label: "YouTube (1280x720)" },
              { value: "instagram", label: "Instagram (1080x1080)" },
              { value: "portrait", label: "Portrait (720x1280)" },
              { value: "custom", label: "Custom" },
            ].map(({ value, label }) => (
              <label key={value} className="flex items-center mb-2">
                <input
                  type="radio"
                  name="size"
                  value={value}
                  checked={
                    !customSize &&
                    (width === 1080 && height === 1920
                      ? value === "tiktok"
                      : width === 1280 && height === 720
                      ? value === "youtube"
                      : width === 1080 && height === 1080
                      ? value === "instagram"
                      : width === 720 && height === 1280
                      ? value === "portrait"
                      : width === 1280 && height === 720
                      ? value === "landscape"
                      : false)
                  }
                  onChange={handleSizeChange}
                  className="mr-2"
                />
                {label}
              </label>
            ))}
          </div>
          {customSize && (
            <div className="flex flex-col md:flex-row gap-4 mb-4 w-full">
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                placeholder="📏 Width"
                className="w-full p-3 text-xl text-black bg-red-100 border-none rounded-lg"
                min="100"
                required
              />
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                placeholder="📏 Height"
                className="w-full p-3 text-xl text-black bg-red-100 border-none rounded-lg"
                min="100"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className={`w-full p-3 text-xl rounded-lg ${
              loading ? "bg-gray-500" : "bg-purple-700"
            } text-white transition-colors`}
            disabled={loading}
          >
            {loading ? "⏳ Generating..." : "🎨 Generate Image"}
          </button>
        </form>
        {imageUrl ? (
          close ? (
            <p
              className="text-white cursor-pointer p-3 bg-pink-900 rounded-md md:w-max w-full mt-3 text-center text-xl"
              onClick={() => setClose(false)}
            >
              Show Generated Image
            </p>
          ) : (
            <div className="pt-4 px-3 flex flex-col items-center w-full container fixed top-[50%] translate-y-[-50%] z-10 backdrop-blur-md min-w-screen min-h-screen m-auto">
              <div className="relative">
                <p
                  className="absolute top-14 right-2 text-red-700 cursor-pointer p-2 rounded-md text-base bg-white ml-auto"
                  onClick={() => setClose(true)}
                >
                  Close
                </p>
                {/* Pink download button */}
                <button
                  onClick={handleDownload}
                  className="absolute top-2 right-2 bg-pink-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-pink-600 transition-all duration-200"
                >
                  Download
                </button>

                {/* @ts-ignore */}
                <Image
                  src={imageUrl}
                  alt="AI Generated"
                  width={width}
                  height={height}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}
