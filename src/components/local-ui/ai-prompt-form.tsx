import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SizeSelector } from "./size-selector";

export function AIPromptForm({
  prompt,
  setPrompt,
  customSize,
  size,
  setSize,
  loading,
  handleSizeChange,
  handleSubmit,
}: any) {
  return (
    <form
      onSubmit={handleSubmit}
      className="relative container md:max-w-lg flex flex-col items-center w-full p-6 rounded-lg shadow-lg"
    >
      <Input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="🖋️ Enter your image prompt"
        className="w-full p-3 mb-4 text-xl text-white rounded-lg"
        required
      />

      <SizeSelector
        width={size.width}
        height={size.height}
        customSize={customSize}
        handleSizeChange={handleSizeChange}
      />
      {customSize && (
        <div className="mt-4">
          <label className="block mb-2 text-white">
            Custom Width:
            <Input
              type="number"
              value={size.width}
              onChange={(e) =>
                setSize({ ...size, width: Number(e.target.value) })
              }
              className="ml-2 border p-1 text-white"
            />
          </label>
          <label className="block mb-2 text-white">
            Custom Height:
            <Input
              type="number"
              value={size.height}
              onChange={(e) =>
                setSize({ ...size, height: Number(e.target.value) })
              }
              className="ml-2 border p-1 text-white"
            />
          </label>
        </div>
      )}

      <Button
        type="submit"
        className={`w-full p-3 text-xl rounded-lg ${
          loading ? "bg-gray-500" : "bg-purple-700"
        } text-white transition-colors`}
        disabled={loading}
      >
        {loading ? "⏳ Generating..." : "🎨 Generate Image"}
      </Button>
    </form>
  );
}
