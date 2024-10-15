import React from "react";
import Image from "next/image";
import { Dialog, DialogClose, DialogContent } from "../ui/dialog";

interface GeneratedImageDialogProps {
  imageUrl: string | null;
  size: { width: number; height: number };
  handleDownload: () => void;
  close: boolean;
  setClose: (value: boolean) => void;
}

export const ImageModal: React.FC<GeneratedImageDialogProps> = ({
  imageUrl,
  size,
  handleDownload,
  close,
  setClose,
}) => {
  return (
    <>
      {imageUrl && (
        <Dialog
          open={!close}
          onOpenChange={(isOpen: boolean) => setClose(!isOpen)}
        >
          <DialogContent className="fixed backdrop-blur-md w-full md:w-auto rounded-lg shadow-lg bg-transparent border-none">
            <div className="relative">
              <DialogClose asChild>
                <p
                  className="absolute top-14 right-2 text-red-700 cursor-pointer p-2 rounded-md text-base bg-white ml-auto"
                  onClick={() => setClose(true)}
                >
                  Close
                </p>
              </DialogClose>

              {/* Pink download button */}
              <button
                onClick={handleDownload}
                className="absolute top-2 right-2 bg-pink-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-pink-600 transition-all duration-200"
              >
                Download
              </button>

              <Image
                src={imageUrl}
                alt="AI Generated"
                width={size.width}
                height={size.height}
                className="rounded-lg shadow-lg"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
