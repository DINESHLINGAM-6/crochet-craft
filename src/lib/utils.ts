import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleDriveImageError = (e: any, name: string) => {
  const img = e.currentTarget as HTMLImageElement;
  const src = img.src;
  
  // Prevent infinite loops
  const failedCount = parseInt(img.getAttribute('data-failed-count') || "0");
  if (failedCount > 5) {
    console.error(`G-Drive: Permanent failure for ${name}`);
    img.style.opacity = "0.5"; // Dim broken images
    return;
  }
  img.setAttribute('data-failed-count', (failedCount + 1).toString());

  let id = "";
  // Extract ID from any Google Drive URL format
  const idMatch = src.match(/[-\w]{25,}/); 
  id = idMatch ? idMatch[0] : "";
  
  if (!id) return;

  const fallbacks = [
    `https://lh3.googleusercontent.com/d/${id}`,
    `https://drive.google.com/thumbnail?id=${id}&sz=w1000`, 
    `https://drive.google.com/thumbnail?id=${id}&sz=w800`,
    `https://drive.google.com/uc?export=view&id=${id}`,
    `https://docs.google.com/uc?id=${id}`
  ];

  // Find current index and try next
  let nextUrl = "";
  for (let i = 0; i < fallbacks.length; i++) {
    if (src.includes(fallbacks[i].split('?')[0])) {
      if (i + 1 < fallbacks.length) {
        nextUrl = fallbacks[i + 1];
        break;
      }
    }
  }

  // If no match found or reached end, start from beginning (but loop-guarded above)
  if (!nextUrl) nextUrl = fallbacks[0];

  console.log(`G-Drive: Fallback for ${name} (${failedCount + 1}/5) -> ${nextUrl}`);
  img.src = nextUrl;
};
