import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import {
  ArrowRight, BookOpen, Calendar, ChevronRight, Code, Cpu, Database,
  Filter, Gamepad2, Search, Server, Star, Zap,
} from "lucide-react"
import GlobalFooter from "../components/sections/GlobalFooter"

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable ERP Systems with Modern Architecture",
    excerpt:
      "How I approached designing a modular ERP system that can scale with business needs while maintaining performance.",
    date: "March 15, 2024",
    category: "ERP Systems",
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
    readTime: "8 min read",
    tags: ["Architecture", "Performance", "Scalability"],
  },
  {
    id: 2,
    title: "DevOps Pipeline Optimization: Lessons Learned",
    excerpt: "Key insights from optimizing CI/CD pipelines for faster deployments and more reliable testing.",
    date: "February 28, 2024",
    category: "DevOps",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
    readTime: "6 min read",
    tags: ["CI/CD", "Testing", "Automation"],
  },
  {
    id: 3,
    title: "Implementing AI-Powered Recommendations in Legacy Systems",
    excerpt: "A case study on integrating modern AI capabilities into existing enterprise software.",
    date: "February 10, 2024",
    category: "AI",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
    readTime: "10 min read",
    tags: ["Machine Learning", "Integration", "Legacy Systems"],
  },
  {
    id: 4,
    title: "Database Performance Tuning for High-Traffic Applications",
    excerpt: "Techniques I used to optimize database performance under heavy load conditions.",
    date: "January 22, 2024",
    category: "Databases",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
    readTime: "7 min read",
    tags: ["SQL", "Optimization", "Performance"],
  },
  {
    id: 5,
    title: "Creating Interactive Data Visualizations with D3.js",
    excerpt: "How to build engaging and informative data visualizations for complex datasets.",
    date: "January 5, 2024",
    category: "Frontend",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
    readTime: "9 min read",
    tags: ["JavaScript", "Data Visualization", "UX"],
  },
  {
    id: 6,
    title: "Microservices vs. Monoliths: Real-world Trade-offs",
    excerpt: "An honest look at when to choose microservices and when a monolith makes more sense.",
    date: "December 12, 2023",
    category: "Architecture",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
    readTime: "11 min read",
    tags: ["Microservices", "System Design", "Trade-offs"],
  },
]

const categories = ["All", ...new Set(blogPosts.map((post) => post.category))]

const PlaceholderBadge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center rounded-md border border-slate-600 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
    {children}
  </span>
);

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "All" || post.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const featuredPost = blogPosts.find((post) => post.featured)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "ERP Systems": return <Database className="h-5 w-5" />
      case "DevOps": return <Server className="h-5 w-5" />
      case "AI": return <Cpu className="h-5 w-5" />
      case "Databases": return <Database className="h-5 w-5" />
      case "Frontend": return <Code className="h-5 w-5" />
      case "Architecture": return <Zap className="h-5 w-5" />
      default: return <BookOpen className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <div id="main-content" className="container mx-auto px-6 py-16 max-w-6xl flex-grow relative z-10">
        <div className="mb-8 flex items-center">
          <Link
            to="/experience"
            className="group flex items-center text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
            <span className="font-medium">Back to Experience</span>
          </Link>
        </div>

        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center mb-4">
            <Gamepad2 className="h-8 w-8 text-yellow-400 mr-3" />
            <h1 className="text-5xl font-bold text-center relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
                Player Two Area
              </span>
            </h1>
          </div>
          <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-full mb-6"></div>
          <p className="text-xl text-slate-300 max-w-2xl text-center">
            Welcome to the special zone for recruiters and collaborators. Dive into technical insights, project
            breakdowns, and interactive demos.
          </p>
        </div>

        {featuredPost && (
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <Star className="text-yellow-400 h-5 w-5 mr-2" />
              <h2 className="text-2xl font-bold">Featured Article</h2>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:shadow-xl hover:shadow-yellow-900/5 transition-all duration-300">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-full">
                  <img
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent opacity-60"></div>
                  <PlaceholderBadge className="absolute top-4 left-4 bg-yellow-400 text-black hover:bg-yellow-300">
                    {featuredPost.category}
                  </PlaceholderBadge>
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{featuredPost.title}</h3>
                    <p className="text-slate-300 mb-4">{featuredPost.excerpt}</p>
                    <div className="flex items-center text-sm text-slate-400 mb-6">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{featuredPost.date}</span>
                      <span className="mx-2">•</span>
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {featuredPost.tags.map((tag, index) => (
                        <PlaceholderBadge key={index} className="border-slate-600 text-slate-300">
                          {tag}
                        </PlaceholderBadge>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full sm:w-auto group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-medium">
                    <span className="relative z-10 flex items-center">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className="pl-10 w-full h-10 px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-sm focus:outline-none focus:border-yellow-400"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-400">Filter by:</span>
              <div className="flex space-x-1 p-1 bg-slate-800 border border-slate-700 rounded-md">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      activeCategory === category
                        ? 'bg-yellow-400 text-black'
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredPosts
            .filter((post) => !post.featured)
            .map((post) => (
              <div
                key={post.id}
                className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-yellow-900/5 hover:border-slate-600 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="object-cover w-full h-full" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent opacity-70"></div>
                  <div className="absolute bottom-4 left-4 flex items-center">
                    <div className="h-8 w-8 rounded-full bg-yellow-400/20 flex items-center justify-center mr-2 flex-shrink-0">
                      {getCategoryIcon(post.category)}
                    </div>
                    <PlaceholderBadge className="bg-slate-800/80 text-slate-200 hover:bg-slate-700/80">{post.category}</PlaceholderBadge>
                  </div>
                </div>
                <div className="p-4 pb-2 flex-grow">
                  <h4 className="font-bold text-lg line-clamp-2 mb-1">{post.title}</h4>
                  <div className="flex items-center text-xs text-slate-400 mb-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <p className="text-slate-300 text-sm line-clamp-3">{post.excerpt}</p>
                </div>
                <div className="p-4 pt-0 mt-auto">
                  <Button
                    variant="ghost"
                    className="w-full justify-between hover:bg-slate-700 hover:text-yellow-400 group text-sm py-2"
                  >
                    <span>Read More</span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            ))}
        </div>

        <div className="mb-16">
          <div className="flex items-center mb-6">
            <Code className="text-yellow-400 h-5 w-5 mr-2" />
            <h2 className="text-2xl font-bold">Interactive Demos</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:shadow-lg hover:border-slate-600 transition-all duration-300 flex flex-col">
              <div className="relative h-48 bg-gradient-to-br from-purple-900 to-blue-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl font-bold text-white/20">Demo 1</div>
                </div>
                <PlaceholderBadge className="absolute top-4 left-4 bg-purple-500 text-white border-purple-400/50 hover:bg-purple-400">React</PlaceholderBadge>
              </div>
              <div className="p-4 flex-grow">
                <h4 className="font-bold text-lg mb-1">Interactive Data Dashboard</h4>
                <p className="text-xs text-slate-400 mb-2">A real-time dashboard built with React and D3.js</p>
                <p className="text-slate-300 text-sm">
                  Explore how I built a responsive dashboard that visualizes complex data sets with interactive
                  filtering and real-time updates.
                </p>
              </div>
              <div className="p-4 pt-0 mt-auto">
                <Button className="w-full bg-slate-700 hover:bg-slate-600 hover:text-yellow-400">Coming Soon</Button>
              </div>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:shadow-lg hover:border-slate-600 transition-all duration-300 flex flex-col">
              <div className="relative h-48 bg-gradient-to-br from-emerald-900 to-teal-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl font-bold text-white/20">Demo 2</div>
                </div>
                <PlaceholderBadge className="absolute top-4 left-4 bg-emerald-500 text-white border-emerald-400/50 hover:bg-emerald-400">Node.js</PlaceholderBadge>
              </div>
              <div className="p-4 flex-grow">
                <h4 className="font-bold text-lg mb-1">API Performance Simulator</h4>
                <p className="text-xs text-slate-400 mb-2">Test and optimize API performance under load</p>
                <p className="text-slate-300 text-sm">
                  A tool that simulates various load conditions on APIs and visualizes performance metrics to identify
                  bottlenecks.
                </p>
              </div>
              <div className="p-4 pt-0 mt-auto">
                <Button className="w-full bg-slate-700 hover:bg-slate-600 hover:text-yellow-400">Coming Soon</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay in the Loop</h3>
              <p className="text-slate-300">Subscribe to get notified when new articles and demos are published.</p>
            </div>
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-slate-700 border border-slate-600 rounded-md focus:border-yellow-400 px-3 py-2 h-10 min-w-[250px] text-sm"
              />
              <Button className="bg-yellow-400 text-black hover:bg-yellow-300">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      <GlobalFooter />
    </div>
  )
} 