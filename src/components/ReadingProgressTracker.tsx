import React, { useState } from "react";
import { BookOpen, Clock, TrendingUp, Calendar, BarChart3 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

interface ReadingProgressTrackerProps {
  className?: string;
}

const ReadingProgressTracker = ({ className = "" }: ReadingProgressTrackerProps) => {
  const [currentlyReading] = useState([
    {
      id: 1,
      title: "My Life Turned Around After Being Cheated on and Falsely Accused",
      currentChapter: 2,
      totalChapters: 3,
      lastRead: "2 hours ago",
      progress: 67,
      coverImage: "/src/components/images/front/1.webp"
    },
    {
      id: 2,
      title: "Attack on Titan",
      currentChapter: 45,
      totalChapters: 139,
      lastRead: "1 day ago",
      progress: 32,
      coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80"
    },
    {
      id: 3,
      title: "One Piece",
      currentChapter: 1095,
      totalChapters: 1100,
      lastRead: "3 days ago",
      progress: 99,
      coverImage: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&q=80"
    }
  ]);

  const [readingStats] = useState({
    totalMangasRead: 47,
    chaptersThisWeek: 23,
    readingStreak: 12,
    averageReadingTime: "45 min"
  });

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Reading Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="rounded-none border">
          <CardContent className="p-4 text-center">
            <BookOpen className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <div className="text-2xl font-bold">{readingStats.totalMangasRead}</div>
            <div className="text-xs text-muted-foreground">Total Read</div>
          </CardContent>
        </Card>
        
        <Card className="rounded-none border">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <div className="text-2xl font-bold">{readingStats.chaptersThisWeek}</div>
            <div className="text-xs text-muted-foreground">This Week</div>
          </CardContent>
        </Card>
        
        <Card className="rounded-none border">
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <div className="text-2xl font-bold">{readingStats.readingStreak}</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>
        
        <Card className="rounded-none border">
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <div className="text-2xl font-bold">{readingStats.averageReadingTime}</div>
            <div className="text-xs text-muted-foreground">Avg/Day</div>
          </CardContent>
        </Card>
      </div>

      {/* Currently Reading */}
      <Card className="rounded-none border">
        <CardHeader className="border-b border-border/30 pb-4">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Continue Reading
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            {currentlyReading.map((manga) => (
              <div key={manga.id} className="flex items-center gap-4 p-3 border border-border/30 bg-muted/10 hover:bg-muted/20 transition-colors">
                <img
                  src={manga.coverImage}
                  alt={manga.title}
                  className="w-12 h-16 object-cover border border-border/30"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{manga.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span>Ch. {manga.currentChapter}/{manga.totalChapters}</span>
                    <span>•</span>
                    <span>{manga.lastRead}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Progress value={manga.progress} className="flex-1 h-2" />
                    <span className="text-xs text-muted-foreground w-12">{manga.progress}%</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="rounded-none border bg-foreground text-background hover:bg-foreground/90"
                >
                  Continue
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reading Goals */}
      <Card className="rounded-none border">
        <CardHeader className="border-b border-border/30 pb-4">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Weekly Goal
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Chapters Read</span>
              <Badge variant="outline" className="rounded-none">23/30</Badge>
            </div>
            <Progress value={77} className="h-3" />
            <p className="text-xs text-muted-foreground">
              7 more chapters to reach your weekly goal! 🎯
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReadingProgressTracker;