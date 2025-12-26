import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Github, Users, Star, GitFork, Flame, Loader2, Sparkles, Heart } from "lucide-react";

interface GitHubStats {
  username: string;
  avatar: string;
  name: string;
  bio: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
}

const MY_USERNAME = "sachinxcode313";

const GitHubCompare = () => {
  const [visitorUsername, setVisitorUsername] = useState("");
  const [myStats, setMyStats] = useState<GitHubStats | null>(null);
  const [visitorStats, setVisitorStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasCompared, setHasCompared] = useState(false);

  const fetchGitHubStats = async (username: string): Promise<GitHubStats | null> => {
    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) throw new Error("User not found");
      const userData = await userRes.json();

      // Fetch repos to calculate total stars
      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      const reposData = await reposRes.json();
      const totalStars = Array.isArray(reposData) 
        ? reposData.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0)
        : 0;

      return {
        username: userData.login,
        avatar: userData.avatar_url,
        name: userData.name || userData.login,
        bio: userData.bio || "No bio available",
        publicRepos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        totalStars,
      };
    } catch (err) {
      return null;
    }
  };

  const handleCompare = async () => {
    if (!visitorUsername.trim()) {
      setError("Please enter your GitHub username");
      return;
    }

    setLoading(true);
    setError("");

    const [myData, visitorData] = await Promise.all([
      fetchGitHubStats(MY_USERNAME),
      fetchGitHubStats(visitorUsername.trim()),
    ]);

    if (!myData) {
      setError("Could not fetch my profile");
      setLoading(false);
      return;
    }

    if (!visitorData) {
      setError("Could not find that GitHub user. Check the username!");
      setLoading(false);
      return;
    }

    setMyStats(myData);
    setVisitorStats(visitorData);
    setHasCompared(true);
    setLoading(false);
  };

  const StatBadge = ({ 
    icon: Icon, 
    label, 
    myValue, 
    theirValue,
    color 
  }: { 
    icon: any; 
    label: string; 
    myValue: number; 
    theirValue: number;
    color: string;
  }) => {
    const myWins = myValue > theirValue;
    const tie = myValue === theirValue;
    
    return (
      <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-secondary/50 border border-border/50">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${color}`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-foreground">{label}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className={`text-lg font-bold ${myWins && !tie ? 'text-emerald-500' : 'text-muted-foreground'}`}>
            {myValue.toLocaleString()}
          </span>
          <span className="text-muted-foreground">vs</span>
          <span className={`text-lg font-bold ${!myWins && !tie ? 'text-emerald-500' : 'text-muted-foreground'}`}>
            {theirValue.toLocaleString()}
          </span>
        </div>
      </div>
    );
  };

  const ProfileCard = ({ stats, isMe }: { stats: GitHubStats; isMe: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: isMe ? 0 : 0.1 }}
    >
      <Card className="overflow-hidden border-2 border-border/50 bg-card/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <img
                src={stats.avatar}
                alt={stats.name}
                className="w-24 h-24 rounded-full border-4 border-background shadow-lg"
              />
              {isMe && (
                <span className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                  Host
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-foreground">{stats.name}</h3>
            <a
              href={`https://github.com/${stats.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Github className="w-3 h-3" />
              @{stats.username}
            </a>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{stats.bio}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <section id="github-compare" className="py-24 px-4 bg-gradient-to-b from-secondary/20 to-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-700 dark:text-amber-300 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Just for fun 💛
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight"
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              GitHub Buddy Compare
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-muted-foreground max-w-lg mx-auto"
          >
            Drop your GitHub username and see how we stack up! No competition here — just celebrating different journeys ✨
          </motion.p>
        </div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-12"
        >
          <div className="relative flex-1">
            <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Your GitHub username"
              value={visitorUsername}
              onChange={(e) => setVisitorUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCompare()}
              className="pl-10 h-12 bg-background border-border/50"
            />
          </div>
          <Button
            onClick={handleCompare}
            disabled={loading}
            className="h-12 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Compare
              </>
            )}
          </Button>
        </motion.div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-destructive mb-8"
          >
            {error}
          </motion.p>
        )}

        {/* Results */}
        <AnimatePresence mode="wait">
          {hasCompared && myStats && visitorStats && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Profile Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                <ProfileCard stats={myStats} isMe={true} />
                <ProfileCard stats={visitorStats} isMe={false} />
              </div>

              {/* Stats Comparison */}
              <Card className="border-2 border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <h3 className="text-lg font-semibold text-foreground">Stats Showdown</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <StatBadge
                      icon={GitFork}
                      label="Public Repos"
                      myValue={myStats.publicRepos}
                      theirValue={visitorStats.publicRepos}
                      color="bg-blue-500"
                    />
                    <StatBadge
                      icon={Star}
                      label="Total Stars"
                      myValue={myStats.totalStars}
                      theirValue={visitorStats.totalStars}
                      color="bg-amber-500"
                    />
                    <StatBadge
                      icon={Users}
                      label="Followers"
                      myValue={myStats.followers}
                      theirValue={visitorStats.followers}
                      color="bg-purple-500"
                    />
                    <StatBadge
                      icon={Heart}
                      label="Following"
                      myValue={myStats.following}
                      theirValue={visitorStats.following}
                      color="bg-pink-500"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Wholesome Message */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300">
                  <span className="text-lg">🌱</span>
                  <span className="font-medium">Both grinding, different paths ✨</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pre-compare state hint */}
        {!hasCompared && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-muted-foreground"
          >
            <Github className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p>Enter your username above to see the comparison!</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default GitHubCompare;
