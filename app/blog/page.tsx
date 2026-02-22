"use client";

import SectionHeading from "@/app/components/SectionHeading";
import portfolioData from "@/app/data/portfolio-data.json";

interface BlogPost { id: string; title: string; excerpt: string; content: string; tags: string[]; status: "Published" | "Draft"; readTime: string; createdAt: string; }

export default function BlogPage() {
  const publishedPosts: BlogPost[] = portfolioData.blogPosts
    .filter(p => p.status === "Published")
    .map((p, i) => ({
      id: p.id || `blog-${i}`,
      title: p.title,
      excerpt: p.excerpt || "",
      content: p.content || "",
      tags: p.tags || [],
      status: p.status as "Published" | "Draft",
      readTime: p.readTime || "5 min read",
      createdAt: p.createdAt,
    }));

  return (
    <div className="section">
      <div className="section-glow section-glow-violet" style={{ top: "5%", left: "-10%" }} />
      <div className="container" style={{ maxWidth: "900px" }}>
        <SectionHeading title="Blog" subtitle="Thoughts, tutorials, and stories from my coding journey" />
        {publishedPosts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-muted)" }}>
            <span style={{ fontSize: "3rem" }}>✍️</span>
            <p style={{ marginTop: "1rem" }}>Blog posts coming soon!</p>
          </div>
        ) : (
          <div className="blog-grid">
            {publishedPosts.map((post: BlogPost, i: number) => (
              <article key={post.id} className="blog-card glass-card-glow animate-fade-in-up" style={{ animationDelay: `${i * 0.12}s` }}>
                <div className="blog-meta">
                  <span className="blog-date">{new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  <span className="blog-dot">•</span>
                  <span className="blog-read-time">{post.readTime}</span>
                </div>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-tags">{post.tags.map((tag: string) => (<span key={tag} className="badge">{tag}</span>))}</div>
                <div className="blog-read-more"><span className="read-more-link">Read More →</span></div>
              </article>
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        .blog-grid { display: flex; flex-direction: column; gap: 1.5rem; }
        .blog-card { padding: 1.75rem; display: flex; flex-direction: column; gap: 0.6rem; cursor: pointer; }
        .blog-meta { display: flex; align-items: center; gap: 0.5rem; font-size: 0.82rem; color: var(--text-muted); }
        .blog-dot { font-size: 0.6rem; }
        .blog-title { font-size: 1.2rem; font-weight: 700; color: var(--text-primary); line-height: 1.3; }
        .blog-excerpt { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; }
        .blog-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.25rem; }
        .blog-read-more { margin-top: 0.5rem; }
        .read-more-link { font-size: 0.88rem; font-weight: 600; color: var(--cyan); transition: opacity var(--transition-fast); }
        .blog-card:hover .read-more-link { opacity: 0.8; }
      `}</style>
    </div>
  );
}
