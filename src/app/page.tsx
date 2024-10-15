"use client";

import { useState, FormEvent, useCallback, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import Logo from "./android-chrome-512x512.png";
import { AIPromptForm } from "@/components/local-ui/ai-prompt-form";
import { ImageModal } from "@/components/local-ui/image-modal";
import { Button } from "@/components/ui/button";

interface DefaultSize {
  width: number;
  height: number;
}

interface DefaultSizes {
  tiktok: DefaultSize;
  youtube: DefaultSize;
  instagram: DefaultSize;
  portrait: DefaultSize;
}

const defaultSizes: DefaultSizes = {
  tiktok: { width: 1080, height: 1920 },
  youtube: { width: 1280, height: 720 },
  instagram: { width: 1080, height: 1080 },
  portrait: { width: 720, height: 1280 },
};

export default function AIImage(): React.ReactNode {
  const [prompt, setPrompt] = useState<string>("");
  const [size, setSize] = useState<DefaultSize>(() => defaultSizes.tiktok);
  const [customSize, setCustomSize] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [close, setClose] = useState<boolean>(false);

  useEffect(() => {
    setSize(defaultSizes.tiktok);
  }, []);

  const router = useRouter();

  useEffect(() => {
    const queryParam = new URLSearchParams(window.location.search).get("q");
    if (queryParam) {
      setPrompt(queryParam);
    }
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setImageUrl(null);
      const seed = Math.floor(Math.random() * 100000000);
      let query = "?q=";

      if (prompt) {
        query += encodeURIComponent(`${prompt}`);
      }
      if (size.height) {
        query += "&h=" + encodeURIComponent(`${size.height}`);
      }
      if (size.width) {
        query += "&w=" + encodeURIComponent(`${size.width}`);
      }
      console.log("🚀 ~ handleSubmit ~ query:", query);
      if (query.length) {
        router.push(query);
      }

      const endpoint = `https://image.pollinations.ai/prompt/${encodeURIComponent(
        prompt
      )}?nologo=1&seed=${seed}&height=${size.height}&width=${size.width}`;

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
      } finally {
        setLoading(false);
      }
    },
    [prompt, size.height, size.width]
  );

  const handleSizeChange = (
    value: string | React.ChangeEvent<HTMLInputElement>
  ) => {
    if (value === "custom") {
      setCustomSize(true);
    } else {
      setSize(defaultSizes[value as keyof DefaultSizes]);
      setCustomSize(false);
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
    <>
      <div className="relative bg-no-repeat bg-slate-800 w-full flex justify-center flex-wrap">
        <div className="flex gap-2 w-full justify-center flex-wrap">
          {/* @ts-ignore */}
          <Image
            width={100}
            src={Logo}
            className="object-contain"
            alt="website logo"
          />
          <div className="bg-gradient-to-tl from-pink-500 to-yellow-400 flex flex-row justify-center items-center bg-no-repeat">
            <h1 className="text-white md:text-3xl text-xl rounded-md mb-8 text-center p-3 h-inherit">
              ✨ Free AI Image Generator Unlimited - Developed by Mahesh
              Mutttinti ✨
            </h1>
          </div>
        </div>
        <div className="relative container flex flex-col items-center justify-center p-4">
          <AIPromptForm
            prompt={prompt}
            setPrompt={setPrompt}
            customSize={customSize}
            size={size}
            setSize={setSize}
            loading={loading}
            handleSizeChange={handleSizeChange}
            handleSubmit={handleSubmit}
          />
          {imageUrl ? (
            <Button
              onClick={() => setClose(false)}
              className="text-white cursor-pointer p-3 bg-pink-900 rounded-md md:w-max w-full my-3 text-center text-xl"
            >
              Show Generated Image
            </Button>
          ) : null}
        </div>
      </div>

      <ImageModal
        close={close}
        setClose={setClose}
        imageUrl={imageUrl}
        size={size}
        handleDownload={handleDownload}
      />
    </>
  );
}
