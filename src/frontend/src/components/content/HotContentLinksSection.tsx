import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, TrendingUp } from "lucide-react";
import { SiFacebook, SiInstagram, SiTiktok, SiX } from "react-icons/si";
import { hotContentLinks } from "../../config/hotContentLinks";

export default function HotContentLinksSection() {
  const links = [
    {
      name: "TikTok",
      url: hotContentLinks.tiktok,
      icon: SiTiktok,
      description:
        "Discover trending land ownership stories and property insights",
      color: "text-[#000000] dark:text-[#ffffff]",
    },
    {
      name: "Instagram",
      url: hotContentLinks.instagram,
      icon: SiInstagram,
      description: "Explore visual content about Kenya land and property",
      color: "text-[#E4405F]",
    },
    {
      name: "X (Twitter)",
      url: hotContentLinks.x,
      icon: SiX,
      description:
        "Follow real-time discussions on land disputes and ownership",
      color: "text-[#000000] dark:text-[#ffffff]",
    },
    {
      name: "Facebook",
      url: hotContentLinks.facebook,
      icon: SiFacebook,
      description: "Join communities discussing Kenya land issues",
      color: "text-[#1877F2]",
    },
  ];

  return (
    <Card className="glass-surface">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <CardTitle>Hot Content & Discussions</CardTitle>
        </div>
        <CardDescription>
          Explore trending content about Kenya land ownership, disputes, and
          property rights across social media
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="flex items-start gap-3 rounded-lg border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md">
                <div className={`mt-1 ${link.color}`}>
                  <link.icon className="h-6 w-6" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{link.name}</h3>
                    <ExternalLink className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {link.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
