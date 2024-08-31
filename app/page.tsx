"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";

export default function AIImage() {
  const [prompt, setPrompt] = useState<string>("");
  const [width, setWidth] = useState<number>(1280);
  const [height, setHeight] = useState<number>(720);
  const [customSize, setCustomSize] = useState<boolean>(true); // Toggle between custom and predefined sizes
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const seed = Math.floor(Math.random() * 100000000); // Generate a random seed

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
    } finally {
      setLoading(false);
    }
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomSize(value === "custom");

    // Set predefined dimensions based on selection
    switch (value) {
      case "tiktok":
        setWidth(1080);
        setHeight(1920);
        break;
      case "instagram":
        setWidth(1080);
        setHeight(1080);
        break;
      case "youtube":
        setWidth(1280);
        setHeight(720);
        break;
      case "shorts":
        setWidth(1080);
        setHeight(1920);
        break;
      case "reels":
        setWidth(1080);
        setHeight(1920);
        break;
      case "stories":
        setWidth(1080);
        setHeight(1920);
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen h-full overflow-y-scroll bg-gray-900 p-4">
      <h1 className="text-white text-4xl mb-8 text-center">
        ✨ AI Image Generator ✨
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="🖋️ Enter your image prompt"
          className="w-full p-3 mb-4 text-xl text-white bg-gray-900 border-none rounded-lg"
          required
        />
        <div className="flex flex-col w-full mb-4 text-white">
          {[
            { value: "tiktok", label: "TikTok (1080x1920)" },
            { value: "instagram", label: "Instagram (1080x1080)" },
            { value: "youtube", label: "YouTube (1280x720)" },
            { value: "shorts", label: "Shorts (1080x1920)" },
            { value: "reels", label: "Reels (1080x1920)" },
            { value: "stories", label: "Stories (1080x1920)" },
            { value: "portrait", label: "Portrait (720x1280)" },
            { value: "landscape", label: "Landscape (1280x720)" },
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
              className="w-full p-3 text-xl text-white bg-gray-900 border-none rounded-lg"
              min="100"
              required
            />
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              placeholder="📏 Height"
              className="w-full p-3 text-xl text-white bg-gray-900 border-none rounded-lg"
              min="100"
              required
            />
          </div>
        )}
        <button
          type="submit"
          className={`w-full p-3 text-xl rounded-lg ${
            loading ? "bg-gray-500" : "bg-green-500"
          } text-white transition-colors`}
          disabled={loading}
        >
          {loading ? "⏳ Generating..." : "🎨 Generate Image"}
        </button>
      </form>
      {imageUrl && (
        <div className="mt-8 flex flex-col items-center w-full max-w-lg">
          {/* @ts-ignore */}
          <Image
            src={imageUrl}
            alt="AI Generated"
            width={width}
            height={height}
            className="rounded-lg shadow-lg"
          />
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p className="text-white text-center text-xl mt-4">
            🖼️ {`Here's your AI-generated image!`}
          </p>
        </div>
      )}
    </div>
  );
}
