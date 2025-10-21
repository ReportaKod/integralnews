"use client";

import { useState, useEffect } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  WhatsappIcon,
  EmailIcon,
} from "next-share";
import { MessageCircle } from "lucide-react";

const buttonMap = {
  facebook: FacebookShareButton,
  twitter: TwitterShareButton,
  linkedin: LinkedinShareButton,
  pinterest: PinterestShareButton,
  reddit: RedditShareButton,
  telegram: TelegramShareButton,
  whatsapp: WhatsappShareButton,
  email: EmailShareButton,
  bluesky: null, // Custom component
  discord: null, // Custom component
};

const iconMap = {
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  linkedin: LinkedinIcon,
  pinterest: PinterestIcon,
  reddit: RedditIcon,
  telegram: TelegramIcon,
  whatsapp: WhatsappIcon,
  email: EmailIcon,
  bluesky: () => (
    <svg viewBox="0 0 640 640" width="24" height="24" className="text-[#0085ff]">
      <path d="M439.8 358.7C436.5 358.3 433.1 357.9 429.8 357.4C433.2 357.8 436.5 358.3 439.8 358.7zM320 291.1C293.9 240.4 222.9 145.9 156.9 99.3C93.6 54.6 69.5 62.3 53.6 69.5C35.3 77.8 32 105.9 32 122.4C32 138.9 41.1 258 47 277.9C66.5 343.6 136.1 365.8 200.2 358.6C203.5 358.1 206.8 357.7 210.2 357.2C206.9 357.7 203.6 358.2 200.2 358.6C106.3 372.6 22.9 406.8 132.3 528.5C252.6 653.1 297.1 501.8 320 425.1C342.9 501.8 369.2 647.6 505.6 528.5C608 425.1 533.7 372.5 439.8 358.6C436.5 358.2 433.1 357.8 429.8 357.3C433.2 357.7 436.5 358.2 439.8 358.6C503.9 365.7 573.4 343.5 593 277.9C598.9 258 608 139 608 122.4C608 105.8 604.7 77.7 586.4 69.5C570.6 62.4 546.4 54.6 483.2 99.3C417.1 145.9 346.1 240.4 320 291.1z" fill="currentColor"/>
    </svg>
  ), // Custom SVG icon
  discord: () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="text-[#5865F2]">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" fill="currentColor"/>
    </svg>
  ), // Custom Discord SVG icon
};

type ShareType = keyof typeof buttonMap;

interface ShareItem {
  type: ShareType;
  label?: string; // For full style with text
}

export interface SocialShareProps {
  shares: ShareItem[];
  url?: string;
  title?: string;
  description?: string;
  hashtags?: string[];
  media?: string;
  variant?: "icon" | "full"; // "icon" = small icon buttons, "full" = large buttons with text
}

export default function SocialShare({
  shares,
  url = "https://example.com",
  title = "Check out this awesome content!",
  description = "I found this amazing content and thought you might like it too.",
  hashtags = ["nextjs", "react", "webdev"],
  media = "https://example.com/image.jpg",
  variant = "icon",
}: SocialShareProps) {
  const [currentUrl, setCurrentUrl] = useState(url);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      {shares.map((share, index) => {
        const ButtonComponent = buttonMap[share.type];
        const IconComponent = iconMap[share.type];

        // Skip null components except for custom Bluesky and Discord
        if (!ButtonComponent && share.type !== "bluesky" && share.type !== "discord") return null;
        if (!IconComponent) return null;

        const props: any = { url: currentUrl, title, hashtags, description, media };

        const shareLabels = {
          facebook: "Partager sur Facebook",
          twitter: "Partager sur Twitter", 
          linkedin: "Partager sur LinkedIn",
          whatsapp: "Partager sur WhatsApp",
          email: "Partager par email",
          reddit: "Partager sur Reddit",
          telegram: "Partager sur Telegram",
          pinterest: "Partager sur Pinterest",
          bluesky: "Partager sur Bluesky",
          discord: "Partager sur Discord"
        };

        // Custom Bluesky sharing logic
        if (share.type === "bluesky") {
          const handleBlueskyShare = () => {
            // Bluesky has a 300 character limit, so we need to be concise
            const maxLength = 250; // Leave some room for the URL
            let text = title;
            
            // Add description if there's room
            if (description && (text.length + description.length + 3) < maxLength) {
              text += ` - ${description}`;
            }
            
            // Add the URL to the text
            text += ` ${currentUrl}`;
            
            // Truncate if still too long (but keep the URL)
            if (text.length > 300) {
              const urlLength = currentUrl.length + 1; // +1 for the space
              const availableForContent = 300 - urlLength;
              const contentOnly = text.replace(` ${currentUrl}`, '');
              text = contentOnly.substring(0, availableForContent - 3) + '...' + ` ${currentUrl}`;
            }
            
            // Note: Bluesky doesn't support image upload via URL parameters
            // The user will need to manually add the cover image in the Bluesky compose window
            const blueskyUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(text)}`;
            window.open(blueskyUrl, '_blank', 'noopener,noreferrer');
          };

          return (
            <button
              key={index}
              onClick={handleBlueskyShare}
              aria-label={shareLabels.bluesky}
              className="flex items-center justify-center w-6 h-6 border-none p-0 font-inherit cursor-pointer outline-none"
            >
              {variant === "icon" ? (
                <svg viewBox="0 0 640 640" width="24" height="24" className="text-[#0085ff] hover:text-[#0066cc] transition-colors">
                  <path d="M439.8 358.7C436.5 358.3 433.1 357.9 429.8 357.4C433.2 357.8 436.5 358.3 439.8 358.7zM320 291.1C293.9 240.4 222.9 145.9 156.9 99.3C93.6 54.6 69.5 62.3 53.6 69.5C35.3 77.8 32 105.9 32 122.4C32 138.9 41.1 258 47 277.9C66.5 343.6 136.1 365.8 200.2 358.6C203.5 358.1 206.8 357.7 210.2 357.2C206.9 357.7 203.6 358.2 200.2 358.6C106.3 372.6 22.9 406.8 132.3 528.5C252.6 653.1 297.1 501.8 320 425.1C342.9 501.8 369.2 647.6 505.6 528.5C608 425.1 533.7 372.5 439.8 358.6C436.5 358.2 433.1 357.8 429.8 357.3C433.2 357.7 436.5 358.2 439.8 358.6C503.9 365.7 573.4 343.5 593 277.9C598.9 258 608 139 608 122.4C608 105.8 604.7 77.7 586.4 69.5C570.6 62.4 546.4 54.6 483.2 99.3C417.1 145.9 346.1 240.4 320 291.1z" fill="currentColor"/>
                </svg>
              ) : (
                <div className="flex items-center gap-3 px-4 py-2 rounded-md text-white w-full transition-all bg-[#0085ff] hover:bg-[#0066cc]">
                  <svg viewBox="0 0 640 640" width="32" height="32" className="text-white">
                    <path d="M439.8 358.7C436.5 358.3 433.1 357.9 429.8 357.4C433.2 357.8 436.5 358.3 439.8 358.7zM320 291.1C293.9 240.4 222.9 145.9 156.9 99.3C93.6 54.6 69.5 62.3 53.6 69.5C35.3 77.8 32 105.9 32 122.4C32 138.9 41.1 258 47 277.9C66.5 343.6 136.1 365.8 200.2 358.6C203.5 358.1 206.8 357.7 210.2 357.2C206.9 357.7 203.6 358.2 200.2 358.6C106.3 372.6 22.9 406.8 132.3 528.5C252.6 653.1 297.1 501.8 320 425.1C342.9 501.8 369.2 647.6 505.6 528.5C608 425.1 533.7 372.5 439.8 358.6C436.5 358.2 433.1 357.8 429.8 357.3C433.2 357.7 436.5 358.2 439.8 358.6C503.9 365.7 573.4 343.5 593 277.9C598.9 258 608 139 608 122.4C608 105.8 604.7 77.7 586.4 69.5C570.6 62.4 546.4 54.6 483.2 99.3C417.1 145.9 346.1 240.4 320 291.1z" fill="currentColor"/>
                  </svg>
                  <span>Partager sur Bluesky</span>
                </div>
              )}
            </button>
          );
        }

        // Custom Discord sharing logic
        if (share.type === "discord") {
          const handleDiscordShare = () => {
            // Use your own Open Graph service
            // This generates a preview URL that Discord can display with image, title, and description
            const shareUrl = `${window.location.origin}/api/og?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;
            
            // Copy the generated URL to clipboard
            if (navigator.clipboard && window.isSecureContext) {
              navigator.clipboard.writeText(shareUrl).then(() => {
                alert('URL de partage Discord générée ! Collez-la dans Discord pour voir l\'aperçu avec l\'image de couverture.');
              }).catch(() => {
                // Fallback: show the URL in a prompt
                prompt('Copiez cette URL pour partager sur Discord :', shareUrl);
              });
            } else {
              // Fallback for older browsers
              prompt('Copiez cette URL pour partager sur Discord :', shareUrl);
            }
          };

          return (
            <button
              key={index}
              onClick={handleDiscordShare}
              aria-label={shareLabels.discord}
              className="flex items-center justify-center w-6 h-6 border-none p-0 font-inherit cursor-pointer outline-none"
            >
              {variant === "icon" ? (
                <svg viewBox="0 0 24 24" width="24" height="24" className="text-[#5865F2] hover:text-[#4752C4] transition-colors">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" fill="currentColor"/>
                </svg>
              ) : (
                <div className="flex items-center gap-3 px-4 py-2 rounded-md text-white w-full transition-all bg-[#5865F2] hover:bg-[#4752C4]">
                  <svg viewBox="0 0 24 24" width="32" height="32" className="text-white">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" fill="currentColor"/>
                  </svg>
                  <span>Partager sur Discord</span>
                </div>
              )}
            </button>
          );
        }

        // Only render if ButtonComponent exists (not for Bluesky)
        if (!ButtonComponent) return null;

        return (
          <ButtonComponent key={index} {...props} aria-label={shareLabels[share.type] || `Partager sur ${share.type}`}>
            {variant === "icon" ? (
              <IconComponent size={24} round />
            ) : (
              <div className={`flex items-center gap-3 px-4 py-2 rounded-md text-white w-full transition-all
                ${share.type === "facebook" ? "bg-[#3b5998]" : ""}
                ${share.type === "twitter" ? "bg-[#1DA1F2]" : ""}
                ${share.type === "linkedin" ? "bg-[#0077b5]" : ""}
                ${share.type === "whatsapp" ? "bg-[#25D366]" : ""}
                ${share.type === "email" ? "bg-gray-600" : ""}
                ${share.type === "reddit" ? "bg-[#FF4500]" : ""}
                ${share.type === "telegram" ? "bg-[#0088cc]" : ""}
                ${share.type === "pinterest" ? "bg-[#E60023]" : ""}
              `}>
                <IconComponent size={32} round />
                <span>Share on {share.label || share.type}</span>
              </div>
            )}
          </ButtonComponent>
        );
      })}
    </div>
  );
}
