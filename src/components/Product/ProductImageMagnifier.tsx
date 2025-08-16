'use client';
import Image from "next/image";
import { useRef, useState, MouseEvent } from "react";

interface ProductImageMagnifierProps {
  src: string;
  zoom?: number;
  width?: number;
  height?: number;
}

export default function ProductImageMagnifier({
  src,
  width,
  height,
  zoom = 2,
}: ProductImageMagnifierProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const lensRef = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);
  const [bgPos, setBgPos] = useState("0px 0px");

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const img = imgRef.current;
    const lens = lensRef.current;
    if (!img || !lens) return;

    const rect = img.getBoundingClientRect();
    const lensSize = lens.offsetWidth / 2;

    let x = e.clientX - rect.left - lensSize;
    let y = e.clientY - rect.top - lensSize;

    if (x > img.width - lens.offsetWidth) x = img.width - lens.offsetWidth;
    if (x < 0) x = 0;
    if (y > img.height - lens.offsetHeight) y = img.height - lens.offsetHeight;
    if (y < 0) y = 0;

    lens.style.left = `${x}px`;
    lens.style.top = `${y}px`;

    const cx = (img.naturalWidth * zoom) / img.width;
    const cy = (img.naturalHeight * zoom) / img.height;
    setBgPos(`-${x * cx}px -${y * cy}px`);
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div
        style={{ position: "relative" }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          ref={imgRef}
          src={src}
          alt="product"
          width= {width}
          height = {height}
          className="w-full h-auto object-cover block"
            />
        {show && (
          <div
            ref={lensRef}
            // className="absolute inset-0 1px so"
            style={{
              position: "absolute",
              border: "1px solid #ccc",
              width: "100px",
              height: "100px",
              backgroundColor: "rgba(255,255,255,0.4)",
              pointerEvents: "none",
            }}
          ></div>
        )}
      </div>

      {show && (
        <div
          style={{
            width: "400px",
            height: "400px",
            border: "1px solid #ccc",
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: bgPos,
            backgroundSize: `${400 * zoom}px auto`,
          }}
        ></div>
      )}
    </div>
  );
}
