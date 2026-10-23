// Photo files for the PhotoBox slots (P-01 … P-10). These are Unsplash TEST stand-ins:
// replace them with the client's photos before launch (see README, "Test photos — replace before launch").
export type Photo = { src: string; width: number; height: number };

export const photos = {
  hero: { src: "/images/test-p01-hero.webp", width: 1600, height: 1067 },
  rooms: [
    { src: "/images/test-p02-double-room.webp", width: 1000, height: 667 },
    { src: "/images/test-p03-triple-room.webp", width: 1000, height: 1500 },
    { src: "/images/test-p04-quadruple-room.webp", width: 1000, height: 1500 },
    { src: "/images/test-p05-apartment.webp", width: 1000, height: 1333 },
    { src: "/images/test-p06-villa.webp", width: 1000, height: 1250 },
  ],
  restaurant: [
    { src: "/images/test-p07-restaurant.webp", width: 1000, height: 1500 },
    { src: "/images/test-p08-verandas.webp", width: 1000, height: 667 },
    { src: "/images/test-p09-dishes.webp", width: 1000, height: 1268 },
  ],
  setting: { src: "/images/test-p10-surroundings.webp", width: 1000, height: 1500 },
} satisfies Record<string, Photo | Photo[]>;
