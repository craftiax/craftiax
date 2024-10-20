import React from "react";
import Image from "next/image";

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, alt, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={src} alt={alt} fill style={{ objectFit: "contain" }} />
        <button
          className="absolute top-4 right-4 text-white text-xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
