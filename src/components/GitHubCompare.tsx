import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Users,
  Star,
  GitFork,
  Loader2,
  ArrowRight,
  Zap,
  HandHelping,
} from "lucide-react";

interface GitHubStats {
  username: string;
  avatar: string;
  name: string;
  bio: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalCommits: number;
}

const MY_USERNAME = "sachinxcode313";

const floatingSymbols = [
  { symbol: "git", x: "8%", y: "20%", delay: 0 },
  { symbol: "→", x: "92%", y: "25%", delay: 1 },
  { symbol: "★", x: "85%", y: "75%", delay: 2 },
  { symbol: "⌘", x: "12%", y: "80%", delay: 3 },
];

const GitHubCompare = () => {
  const [visitorUsername, setVisitorUsername] = useState("");
  const [myStats, setMyStats] = useState<GitHubStats | null>(null);
  const [visitorStats, setVisitorStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasCompared, setHasCompared] = useState(false);

  const fetchGitHubStats = async (
    username: string
  ): Promise<GitHubStats | null> => {
    try {
      // Extract username if full URL is provided
      let cleanUsername = username;
      if (username.includes("github.com/")) {
        cleanUsername =
          username.split("github.com/").pop()?.split("/")[0] || username;
      }

      const userRes = await fetch(
        `https://api.github.com/users/${cleanUsername}`
      );
      if (!userRes.ok) throw new Error("User not found");
      const userData = await userRes.json();

      const reposRes = await fetch(
        `https://api.github.com/users/${cleanUsername}/repos?per_page=100`
      );
      const reposData = await reposRes.json();
      const totalStars = Array.isArray(reposData)
        ? reposData.reduce(
            (acc: number, repo: any) => acc + (repo.stargazers_count || 0),
            0
          )
        : 0;
      const totalCommitsRes = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${cleanUsername}`
      );
      const totalCommitsData = await totalCommitsRes.json();
      console.log(totalCommitsData);
      const totalCommits = Object.values(totalCommitsData.total as Record<string, number>).reduce(
        (sum: number, commits: number) => sum + commits,
        0
      );


      // const totalCommits = Array.isArray(totalCommitsData)
      //   ? totalCommitsData.filter((event: any) => event.type === "PushEvent")
      //       .length
      //   : 0;

      return {
        username: userData.login,
        avatar: userData.avatar_url,
        name: userData.name || userData.login,
        bio: userData.bio || "Building cool stuff",
        publicRepos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        totalStars,
        totalCommits
      };
    } catch {
      return null;
    }
  };

  const handleCompare = async () => {
    if (!visitorUsername.trim()) {
      setError("Enter your GitHub username");
      return;
    }

    setLoading(true);
    setError("");

    const [myData, visitorData] = await Promise.all([
      fetchGitHubStats(MY_USERNAME),
      fetchGitHubStats(visitorUsername.trim()),
    ]);

    if (!myData || !visitorData) {
      setError(
        visitorData ? "Could not fetch host profile" : "Username not found"
      );
      setLoading(false);
      return;
    }

    setMyStats(myData);
    setVisitorStats(visitorData);
    setHasCompared(true);
    setLoading(false);
  };

  const StatCard = ({
    label,
    icon: Icon,
    myValue,
    theirValue,
    delay,
  }: {
    label: string;
    icon: any;
    myValue: number;
    theirValue: number;
    delay: number;
  }) => {
    const total = myValue + theirValue || 1;
    const myPercent = Math.round((myValue / total) * 100);
    const theirPercent = 100 - myPercent;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="group"
      >
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 hover-lift">
          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <Icon className="w-5 h-5 text-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">
                {label}
              </span>
            </div>

            {/* Values */}
            <div className="flex items-end justify-between mb-4">
              <div className="text-center">
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: delay + 0.2, type: "spring" }}
                  className="text-3xl font-semibold tracking-tight"
                >
                  {myValue.toLocaleString()}
                </motion.p>
                <p className="text-xs text-muted-foreground mt-1">Host</p>
              </div>
              <div className="text-2xl text-muted-foreground/30 font-light">
                vs
              </div>
              <div className="text-center">
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: delay + 0.3, type: "spring" }}
                  className="text-3xl font-semibold tracking-tight"
                >
                  {theirValue.toLocaleString()}
                </motion.p>
                <p className="text-xs text-muted-foreground mt-1">You</p>
              </div>
            </div>

            {/* Comparison Bar */}
            <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${myPercent}%` }}
                transition={{
                  delay: delay + 0.4,
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="absolute left-0 top-0 h-full bg-foreground rounded-full"
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>{myPercent}%</span>
              <span>{theirPercent}%</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section
      id="buddy"
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Grid Background like Hero */}
      {/* <div className="absolute inset-0 grid-background opacity-80" /> */}

      {/* Floating Symbols */}
      {floatingSymbols.map((item, index) => (
        <motion.span
          key={index}
          className="absolute font-mono text-2xl text-foreground/10 select-none pointer-events-none hidden md:block"
          style={{ left: item.x, top: item.y }}
          animate={{
            opacity: [0.05, 0.12, 0.05],
            y: [0, -15, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 6 + index,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.symbol}
        </motion.span>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4"
          >
            Just for fun
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-semibold tracking-tight"
          >
            GitHub Buddy
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-muted-foreground font-light max-w-md mx-auto"
          >
            Drop your username and let's celebrate our different paths together.
          </motion.p>
        </div>

        {/* Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-16"
        >
          <div className="relative flex-1">
            <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Your GitHub username"
              value={visitorUsername}
              onChange={(e) => setVisitorUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCompare()}
              className="w-full pl-11 pr-4 py-4 bg-card border border-border rounded-full text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            />
          </div>
          <button
            onClick={handleCompare}
            disabled={loading}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-full text-sm font-medium hover-lift flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Compare
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </motion.div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-destructive text-sm mb-8"
          >
            {error}
          </motion.p>
        )}

        {/* Results */}
        <AnimatePresence mode="wait">
          {hasCompared && myStats && visitorStats && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Profile Cards - Side by Side */}
              <div className="grid md:grid-cols-2 gap-24 md:gap-6 mt-28">
                {[
                  {
                    stats: myStats,
                    isHost: true,
                    gradient:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  },
                  {
                    stats: visitorStats,
                    isHost: false,
                    gradient:
                      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                  },
                ].map(({ stats, isHost, gradient }, idx) => (
                  <motion.div
                    key={stats.username}
                    initial={{ opacity: 0, x: isHost ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.15, duration: 0.5 }}
                    className="group relative"
                  >
                    <div className="relative rounded-2xl border border-border bg-card hover-lift">
                      {/* Top gradient bar */}
                      {/* <div
                        className="h-14 w-full"
                        style={{ background: gradient }}
                      /> */}

                      {/* Avatar overlapping the gradient */}
                      <div className="absolute -top-20 left-1/2 -translate-x-1/2">
                        <div className="relative">
                          <motion.div
                            animate={{
                              y: [0, -10, 0],
                              rotate: [0, 5, 0, -5, 0],
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                          >
                            {/* <Github className="w-12 h-12 text-muted-foreground/30" /> */}
                            <img
                              src={stats.avatar}
                              alt={stats.name}
                              className="w-[9rem] rounded-full border-2 border-[#fefefe] shadow-lg "
                            />
                          </motion.div>

                          {isHost && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.3, type: "spring" }}
                              className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1"
                            >
                              <Zap className="w-3 h-3" />
                              Host
                            </motion.span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="pt-16 pb-6 px-6 text-center">
                        <h3 className="text-xl font-semibold tracking-tight">
                          {stats.name}
                        </h3>
                        <a
                          href={`https://github.com/${stats.username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mt-1"
                        >
                          <Github className="w-3 h-3" />@{stats.username}
                        </a>
                        <p className="mt-3 text-sm text-muted-foreground line-clamp-2 font-light">
                          {stats.bio}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* VS Divider */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-4"
              >
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase">
                  Stats Showdown
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              </motion.div>

              {/* Stats Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  label="Contributions"
                  icon={HandHelping}
                  myValue={myStats.totalCommits}
                  theirValue={visitorStats.totalCommits}
                  delay={0.5}
                />
                <StatCard
                  label="Repositories"
                  icon={GitFork}
                  myValue={myStats.publicRepos}
                  theirValue={visitorStats.publicRepos}
                  delay={0.5}
                />
                <StatCard
                  label="Stars Earned"
                  icon={Star}
                  myValue={myStats.totalStars}
                  theirValue={visitorStats.totalStars}
                  delay={0.6}
                />
                <StatCard
                  label="Followers"
                  icon={Users}
                  myValue={myStats.followers}
                  theirValue={visitorStats.followers}
                  delay={0.7}
                />
              </div>

              {/* Wholesome Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-center pt-8"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-card">
                  <span className="text-lg">🌱</span>
                  <span className="text-sm text-muted-foreground font-light">
                    Both grinding, different paths ✨
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!hasCompared && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full border-2 border-dashed border-border mb-6"
            >
              <Github className="w-12 h-12 text-muted-foreground/30" />
            </motion.div>
            <p className="text-muted-foreground font-light">
              Enter your username to start the comparison
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default GitHubCompare;
