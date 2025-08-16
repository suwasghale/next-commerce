import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ['images.unsplash.com', 'i.imgur.com', 'placehold.co', 'via.placeholder.com', 'placeimg.com', 'img.freepik.com', 'cdn.pixabay.com', 'picsum.photos', 'loremflickr.com', 'source.unsplash.com', 'images-porsche.imgix.net'],
    unoptimized: true,
  },
}

module.exports = nextConfig;

