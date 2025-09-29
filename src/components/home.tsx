import React, { useState } from "react";
import {
  Library,
  TrendingUp,
  Calendar,
  Clock,
  BarChart3,
  Shield,
} from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import FeaturedCarousel from "./FeaturedCarousel";
import cover01 from "./images/front/1.webp";
import TrendingGrid from "./TrendingGrid";
import SearchSection from "./SearchSection";
import LibrarySection from "./LibrarySection";
import TranslationSuggestionDialog from "./TranslationSuggestionDialog";
import BackgroundEffects from "./BackgroundEffects";
import { getMangaList, convertToFrontendFormat } from "@/lib/upload";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const navigate = useNavigate();

  // Get uploaded manga and convert to frontend format
  const uploadedManga = getMangaList().map(convertToFrontendFormat);

  // Mock data for different time periods - now includes uploaded manga
  const getMangaByPeriod = (period: string) => {
    const baseMangas = [
      // Include uploaded manga first
      ...uploadedManga,
      // Then mock data
      {
        id: "2",
        title: "Demon Slayer",
        author: "Koyoharu Gotouge",
        coverImage:
          "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80",
        rating: 4.7,
        genres: ["Action", "Supernatural", "Historical", "Shounen"],
      },
      {
        id: "3",
        title: "Jujutsu Kaisen",
        author: "Gege Akutami",
        coverImage:
          "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=400&q=80",
        rating: 4.9,
        genres: ["Action", "Horror", "Supernatural", "School", "Shounen"],
      },
      {
        id: "4",
        title: "My Hero Academia",
        author: "Kohei Horikoshi",
        coverImage:
          "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&q=80",
        rating: 4.6,
        genres: ["Superhero", "School", "Action", "Comedy", "Shounen"],
      },
      {
        id: "5",
        title: "Attack on Titan",
        author: "Hajime Isayama",
        coverImage:
          "https://images.unsplash.com/photo-1612036782180-6f0822045d55?w=400&q=80",
        rating: 4.9,
        genres: ["Dark Fantasy", "Post-Apocalyptic", "Action", "Drama", "Military"],
      },
      {
        id: "6",
        title: "Chainsaw Man",
        author: "Tatsuki Fujimoto",
        coverImage:
          "https://images.unsplash.com/photo-1558679908-541bcf1249ff?w=400&q=80",
        rating: 4.8,
        genres: ["Action", "Horror", "Supernatural", "Comedy", "Seinen"],
      },
      {
        id: "7",
        title: "Spy x Family",
        author: "Tatsuya Endo",
        coverImage:
          "https://images.unsplash.com/photo-1541562232579-512a21360020?w=400&q=80",
        rating: 4.7,
        genres: ["Comedy", "Action", "Family", "Slice of Life", "Shounen"],
      },
      {
        id: "8",
        title: "Tokyo Revengers",
        author: "Ken Wakui",
        coverImage:
          "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&q=80",
        rating: 4.5,
        genres: ["Action", "Drama", "Time Travel", "Delinquents", "Shounen"],
      },
      {
        id: "9",
        title: "Naruto",
        author: "Masashi Kishimoto",
        coverImage:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
        rating: 4.6,
        genres: ["Action", "Adventure", "Martial Arts", "Ninja", "Shounen"],
      },
      {
        id: "10",
        title: "Dragon Ball",
        author: "Akira Toriyama",
        coverImage:
          "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80",
        rating: 4.8,
        genres: ["Action", "Adventure", "Martial Arts", "Comedy", "Shounen"],
      },
    ];

    // Simulate different popular manga for different periods
    switch (period) {
      case "7d":
        return baseMangas.slice(1, 7);
      case "30d":
        return baseMangas.slice(1, 8);
      case "90d":
        return baseMangas.slice(1, 8);
      case "all":
        return baseMangas;
      default:
        return baseMangas.slice(1, 8);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark relative">
      {/* Background Effects */}
      <BackgroundEffects />
      
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              <span className="text-2xl font-bold">
                MangaVerse
              </span>
            </div>

            {/* Navigation Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-medium rounded-none border border-transparent hover:border-border hover:bg-muted/50 transition-all duration-300"
                onClick={() => setActiveTab("trending")}
              >
                Home
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-medium rounded-none border border-transparent hover:border-border hover:bg-muted/50 transition-all duration-300"
                onClick={() => {
                  // Navigate to bookmarked section
                  const bookmarkedSection =
                    document.getElementById("library-section");
                  bookmarkedSection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Bookmarked
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-medium rounded-none border border-transparent hover:border-border hover:bg-muted/50 transition-all duration-300"
                onClick={() => {
                  // Navigate to currently reading section
                  const librarySection =
                    document.getElementById("library-section");
                  librarySection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Currently Reading
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-medium rounded-none border border-transparent hover:border-border hover:bg-muted/50 transition-all duration-300"
                onClick={() => setActiveTab("all")}
              >
                All Mangas
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Admin Login Button */}
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 rounded-none border border-border hover:bg-muted/50 transition-all duration-300"
              onClick={() => navigate("/admin/login")}
            >
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Admin</span>
            </Button>
            
            {/* Translation Suggestion Button */}
            <TranslationSuggestionDialog />
          </div>
        </div>
      </header>
      
      <main className="container py-6 space-y-8 relative z-10">
        {/* Search Section */}
        <div className="transform hover:scale-[1.01] transition-transform duration-300 border border-border/30 bg-muted/10 p-4">
          <SearchSection />
        </div>

        {/* Manga Lists with Tabs */}
        <section className="transform hover:scale-[1.002] transition-transform duration-300 border border-border/30 bg-muted/10 p-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex items-center justify-between mb-8 border-b border-border/30 pb-4">
              <h2 className="text-3xl font-bold">
                Discover Manga
              </h2>
              <TabsList className="grid w-full max-w-2xl grid-cols-6 bg-background/50 backdrop-blur-sm rounded-none border">
                <TabsTrigger
                  value="trending"
                  className="flex items-center gap-1 rounded-none data-[state=active]:bg-muted data-[state=active]:text-foreground transition-all duration-300"
                >
                  <TrendingUp className="h-4 w-4" />
                  <span className="hidden sm:inline">Trending</span>
                </TabsTrigger>
                <TabsTrigger
                  value="today"
                  className="flex items-center gap-1 rounded-none data-[state=active]:bg-muted data-[state=active]:text-foreground transition-all duration-300"
                >
                  <Clock className="h-4 w-4" />
                  <span className="hidden sm:inline">Today</span>
                </TabsTrigger>
                <TabsTrigger
                  value="7d"
                  className="flex items-center gap-1 rounded-none data-[state=active]:bg-muted data-[state=active]:text-foreground transition-all duration-300"
                >
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">7d</span>
                </TabsTrigger>
                <TabsTrigger
                  value="30d"
                  className="rounded-none data-[state=active]:bg-muted data-[state=active]:text-foreground transition-all duration-300"
                >
                  30d
                </TabsTrigger>
                <TabsTrigger
                  value="90d"
                  className="rounded-none data-[state=active]:bg-muted data-[state=active]:text-foreground transition-all duration-300"
                >
                  90d
                </TabsTrigger>
                <TabsTrigger
                  value="all"
                  className="flex items-center gap-1 rounded-none data-[state=active]:bg-muted data-[state=active]:text-foreground transition-all duration-300"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">All</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="trending">
              <TrendingGrid
                title="Trending Now"
                items={getMangaByPeriod("trending")}
                showLoadMore={true}
              />
            </TabsContent>

            <TabsContent value="today">
              <TrendingGrid
                title="Popular Today"
                items={getMangaByPeriod("today")}
                showLoadMore={false}
              />
            </TabsContent>

            <TabsContent value="7d">
              <TrendingGrid
                title="Popular This Week"
                items={getMangaByPeriod("7d")}
                showLoadMore={false}
              />
            </TabsContent>

            <TabsContent value="30d">
              <TrendingGrid
                title="Popular This Month"
                items={getMangaByPeriod("30d")}
                showLoadMore={true}
              />
            </TabsContent>

            <TabsContent value="90d">
              <TrendingGrid
                title="Popular Last 90 Days"
                items={getMangaByPeriod("90d")}
                showLoadMore={true}
              />
            </TabsContent>

            <TabsContent value="all">
              <TrendingGrid
                title="All Time Popular"
                items={getMangaByPeriod("all")}
                showLoadMore={true}
              />
            </TabsContent>
          </Tabs>
        </section>

        {/* Library Section */}
        <section id="library-section" className="transform hover:scale-[1.002] transition-transform duration-300 border border-border/30 bg-muted/10 p-4">
          <LibrarySection />
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border bg-background/80 backdrop-blur-sm py-6 md:py-0 relative z-10">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm leading-loose text-muted-foreground">
              © 2024 MangaVerse. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Your manga library is stored locally and privately.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="rounded-none border border-transparent hover:border-border hover:bg-muted/50 transition-all duration-300">
              Terms
            </Button>
            <Button variant="ghost" size="sm" className="rounded-none border border-transparent hover:border-border hover:bg-muted/50 transition-all duration-300">
              Privacy
            </Button>
            <Button variant="ghost" size="sm" className="rounded-none border border-transparent hover:border-border hover:bg-muted/50 transition-all duration-300">
              Contact
            </Button>
            <Badge variant="outline" className="ml-2 rounded-none border">
              No Login Required
            </Badge>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;