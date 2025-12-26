import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Users, Star, GitFork, Loader2, ArrowRight } from "lucide-react";

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

      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      const reposData = await reposRes.json();
      const totalStars = Array.isArray(reposData)
        ? reposData.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0)
        : 0;

      return {
        username: userData.login,
        avatar: userData.avatar_url,
        name: userData.name || userData.login,
        bio: userData.bio || "Building cool stuff",
        publicRepos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        totalStars,
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
      setError(visitorData ? "Could not fetch host profile" : "Username not found");
      setLoading(false);
      return;
    }

    setMyStats(myData);
    setVisitorStats(visitorData);
    setHasCompared(true);
    setLoading(false);
  };

  const StatRow = ({
    label,
    icon: Icon,
    myValue,
    theirValue,
  }: {
    label: string;
    icon: any;
    myValue: number;
    theirValue: number;
  }) => {
    const total = myValue + theirValue || 1;
    const myPercent = (myValue / total) * 100;

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-2"
      >
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-sm">
            <span className="text-foreground font-medium">{myValue.toLocaleString()}</span>
            <span className="text-muted-foreground/50">—</span>
            <span className="text-foreground font-medium">{theirValue.toLocaleString()}</span>
          </div>
        </div>
        {/* Comparison Bar */}
        <div className="relative h-1.5 bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${myPercent}%` }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute left-0 top-0 h-full bg-foreground rounded-full"
          />
        </div>
      </motion.div>
    );
  };

  return (
    <section id="github-compare" className="py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">
            Just for fun
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            GitHub Buddy Compare
          </h2>
          <p className="mt-4 text-muted-foreground font-light max-w-md mx-auto">
            Drop your username and let's see how we're both doing. No competition — just celebrating different paths.
          </p>
        </div>

        {/* Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-16"
        >
          <div className="relative flex-1">
            <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Your GitHub username"
              value={visitorUsername}
              onChange={(e) => setVisitorUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCompare()}
              className="w-full pl-11 pr-4 py-3 bg-secondary/50 border border-border rounded-full text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            />
          </div>
          <button
            onClick={handleCompare}
            disabled={loading}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium hover-lift flex items-center justify-center gap-2 disabled:opacity-50"
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Profile Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { stats: myStats, isHost: true },
                  { stats: visitorStats, isHost: false },
                ].map(({ stats, isHost }, idx) => (
                  <motion.div
                    key={stats.username}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover-lift"
                  >
                    {/* Gradient accent */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{
                        background: isHost
                          ? "linear-gradient(90deg, #667eea, #764ba2)"
                          : "linear-gradient(90deg, #4facfe, #00f2fe)",
                      }}
                    />

                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={stats.avatar}
                          alt={stats.name}
                          className="w-16 h-16 rounded-full border-2 border-border"
                        />
                        {isHost && (
                          <span className="absolute -bottom-1 -right-1 text-xs bg-foreground text-background px-1.5 py-0.5 rounded-full font-medium">
                            Host
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold tracking-tight truncate">
                          {stats.name}
                        </h3>
                        <a
                          href={`https://github.com/${stats.username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          @{stats.username}
                        </a>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 font-light">
                          {stats.bio}
                        </p>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-border">
                      {[
                        { label: "Repos", value: stats.publicRepos },
                        { label: "Stars", value: stats.totalStars },
                        { label: "Followers", value: stats.followers },
                      ].map((stat) => (
                        <div key={stat.label} className="text-center">
                          <p className="text-xl font-semibold tracking-tight">
                            {stat.value.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Comparison Bars */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl border border-border bg-card p-6 space-y-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium tracking-tight">Stats Breakdown</h3>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-foreground" />
                      {myStats.name}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-secondary" />
                      {visitorStats.name}
                    </span>
                  </div>
                </div>

                <StatRow
                  label="Repositories"
                  icon={GitFork}
                  myValue={myStats.publicRepos}
                  theirValue={visitorStats.publicRepos}
                />
                <StatRow
                  label="Stars Earned"
                  icon={Star}
                  myValue={myStats.totalStars}
                  theirValue={visitorStats.totalStars}
                />
                <StatRow
                  label="Followers"
                  icon={Users}
                  myValue={myStats.followers}
                  theirValue={visitorStats.followers}
                />
              </motion.div>

              {/* Wholesome Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <p className="text-sm text-muted-foreground font-light">
                  Both grinding, different paths ✨
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!hasCompared && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/50 mb-6">
              <Github className="w-10 h-10 text-muted-foreground/40" />
            </div>
            <p className="text-muted-foreground font-light">
              Enter your username above to see the comparison
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default GitHubCompare;
