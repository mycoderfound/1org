"use client";
import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Sparkles, Filter, Plus, Search, ChevronDown, Zap, Globe, Shield, DollarSign, Palette, BarChart3, Users, ShoppingCart, X, Minus, Trash2, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// ---------------------------------------------
// CART INTERFACE & TYPES
// ---------------------------------------------
interface CartItem {
  id: string;
  title: string;
  painPoint: string;
  solution: string;
  category: string;
  level: number;
  model: "starter" | "pro";
  billingType: "oneTime" | "monthly";
  deliverables: string[];
  price: { min: number; max: number };
  quantity: number;
  selectedPrice: number;
}

// ---------------------------------------------
// BAND OBJECT & PRICING TYPES
// ---------------------------------------------
const BAND = {
  starter: {
    level1: [799, 1799],
    level2: [799, 1799],
    level3: [2499, 5999],
  },
  pro: {
    level1: [799, 1799],
    level2: [799, 1799],
    level3: [2499, 5999],
  },
} as const;

type Band = typeof BAND;
type ModelKey = keyof Band;
type LevelKey<M extends ModelKey> = keyof Band[M];

// Price range function (no export)
function priceRange(
  { model, level }: { model: ModelKey; level: string }
): { min: number; max: number } {
  // Convert level string to LevelKey type
  const levelKey = `level${level}` as LevelKey<ModelKey>;
  
  const tuple = BAND[model]?.[levelKey];
  if (!tuple) {
    // Helpful message in dev, silent fallback in prod
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[pricing] Missing BAND entry for model="${model}" level="${level}". Falling back to 0–0.`);
    }
    return { min: 0, max: 0 };
  }
  const [min, max] = tuple;
  return { min, max };
}

// ---------------------------------------------
// PAIN POINTS & SOLUTIONS DATA
// ---------------------------------------------
const CATEGORIES = [
  "Operations & Workflow",
  "Digital Presence", 
  "Marketing & Engagement",
  "Security & Online Safety",
  "Financial & Biz Mgmt",
  "Creativity & Content",
  "Data & Analytics",
  "Education & Workforce",
];

// Affiliate data for each solution
const AFFILIATE_DATA = {
  "ops-automation": [
    { name: "n8n", url: "https://n8n.partnerlinks.io/myCoder", icon: "🔄" },
    { name: "Guidde", url: "https://affiliate.guidde.com/myCoder", icon: "📹" },
    { name: "ManyChat", url: "https://manychat.pxf.io/mycoder", icon: "💬" },
    { name: "Otter.ai", url: "https://otter.ai/referrals/ER2OAOI7", icon: "🎙️" }
  ],
  "ops-task-mgmt": [
    { name: "Guidde", url: "https://affiliate.guidde.com/myCoder", icon: "📹" },
    { name: "Upwork", url: "https://upwork.pxf.io/c/5660929/1062918/13634", icon: "👥" },
    { name: "n8n", url: "https://n8n.partnerlinks.io/myCoder", icon: "🔄" }
  ],
  "ops-crm": [
    { name: "Upwork", url: "https://upwork.pxf.io/c/5660929/1062918/13634", icon: "👥" },
    { name: "Guidde", url: "https://affiliate.guidde.com/myCoder", icon: "📹" },
    { name: "ManyChat", url: "https://manychat.pxf.io/mycoder", icon: "💬" },
    { name: "Otter.ai", url: "https://otter.ai/referrals/ER2OAOI7", icon: "🎙️" }
  ],
  "ops-maint": [
    { name: "Best Buy", url: "https://bestbuy.7tiv.net/c/5660929/614286/10014", icon: "🏪" },
    { name: "NordVPN", url: "https://nordvpn.sjv.io/c/5660929/417838/7452", icon: "🔒" },
    { name: "Aura", url: "https://aurainc.sjv.io/c/5660929/899264/12398", icon: "🛡️" }
  ],
  "web-starter": [
    { name: "Bluehost", url: "https://bluehost.sjv.io/myCoder", icon: "🌐" },
    { name: "Shopify", url: "https://shopify.pxf.io/c/5660929/1061744/13624", icon: "🛒" },
    { name: "Envato", url: "https://1.envato.market/c/5660929/298927/4662", icon: "🎨" },
    { name: "Canva", url: "https://public.canva.site/2024-canvassador-applications", icon: "🎭" }
  ],
  "web-cms": [
    { name: "Shopify", url: "https://shopify.pxf.io/c/5660929/1061744/13624", icon: "🛒" },
    { name: "Envato", url: "https://1.envato.market/c/5660929/298927/4662", icon: "🎨" },
    { name: "Canva", url: "https://public.canva.site/2024-canvassador-applications", icon: "🎭" },
    { name: "Genially", url: "#", icon: "✨" }
  ],
  "web-seo": [
    { name: "Foundr", url: "https://foundr.sjv.io/c/5660929/1775718/20954", icon: "📈" },
    { name: "Shopify", url: "https://shopify.pxf.io/c/5660929/1061744/13624", icon: "🛒" }
  ],
  "shop-ecommerce": [
    { name: "Shopify", url: "https://shopify.pxf.io/c/5660929/1061744/13624", icon: "🛒" },
    { name: "Best Buy", url: "https://bestbuy.7tiv.net/c/5660929/614286/10014", icon: "🏪" },
    { name: "Easyship", url: "https://easyship.ilbqy6.net/c/5660929/666308/10435", icon: "📦" }
  ],
  "site-care": [
    { name: "Bluehost", url: "https://bluehost.sjv.io/myCoder", icon: "🌐" },
    { name: "Aura", url: "https://aurainc.sjv.io/c/5660929/899264/12398", icon: "🛡️" },
    { name: "NordVPN", url: "https://nordvpn.sjv.io/c/5660929/417838/7452", icon: "🔒" }
  ],
  "smm-automation": [
    { name: "Buffer", url: "https://buffer.com/join/607341a6eb1f9a6f200561aab01317d3b909eb13322952955f6716238b35d7f8", icon: "📊" },
    { name: "Tailwind", url: "https://tailwind.sjv.io/c/5660929/1005723/13164", icon: "🎨" },
    { name: "ManyChat", url: "https://manychat.pxf.io/mycoder", icon: "💬" }
  ],
  "marketing-campaigns": [
    { name: "Genially", url: "#", icon: "✨" },
    { name: "ManyChat", url: "https://manychat.pxf.io/mycoder", icon: "💬" },
    { name: "Buffer", url: "https://buffer.com/join/607341a6eb1f9a6f200561aab01317d3b909eb13322952955f6716238b35d7f8", icon: "📊" }
  ],
  "branding": [
    { name: "Envato", url: "https://1.envato.market/c/5660929/298927/4662", icon: "🎨" },
    { name: "Envato Placeit", url: "https://1.envato.market/c/5660929/629767/10168", icon: "🎭" },
    { name: "Canva", url: "https://public.canva.site/2024-canvassador-applications", icon: "🎨" }
  ],
  "email-marketing": [
    { name: "n8n", url: "https://n8n.partnerlinks.io/myCoder", icon: "🔄" },
    { name: "ManyChat", url: "https://manychat.pxf.io/mycoder", icon: "💬" },
    { name: "Buffer", url: "https://buffer.com/join/607341a6eb1f9a6f200561aab01317d3b909eb13322952955f6716238b35d7f8", icon: "📊" }
  ],
  "social-ops": [
    { name: "Buffer", url: "https://buffer.com/join/607341a6eb1f9a6f200561aab01317d3b909eb13322952955f6716238b35d7f8", icon: "📊" },
    { name: "Tailwind", url: "https://tailwind.sjv.io/c/5660929/1005723/13164", icon: "🎨" },
    { name: "Upwork", url: "https://upwork.pxf.io/c/5660929/1062918/13634", icon: "👥" }
  ],
  "sec-2fa": [
    { name: "Aura", url: "https://aurainc.sjv.io/c/5660929/899264/12398", icon: "🛡️" },
    { name: "NordVPN", url: "https://nordvpn.sjv.io/c/5660929/417838/7452", icon: "🔒" }
  ],
  "safety-training": [
    { name: "Aura", url: "https://aurainc.sjv.io/c/5660929/899264/12398", icon: "🛡️" },
    { name: "ChatGPTZero", url: "https://gptzero.me/?via=myCoder", icon: "🤖" }
  ],
  "data-security": [
    { name: "Aura", url: "https://aurainc.sjv.io/c/5660929/899264/12398", icon: "🛡️" },
    { name: "NordVPN", url: "https://nordvpn.sjv.io/c/5660929/417838/7452", icon: "🔒" },
    { name: "Bluehost", url: "https://bluehost.sjv.io/myCoder", icon: "🌐" }
  ],
  "parental-controls": [
    { name: "Aura", url: "https://aurainc.sjv.io/c/5660929/899264/12398", icon: "🛡️" },
    { name: "ChatGPTZero", url: "https://gptzero.me/?via=myCoder", icon: "🤖" },
    { name: "NordVPN", url: "https://nordvpn.sjv.io/c/5660929/417838/7452", icon: "🔒" }
  ],
  "sec-monitoring": [
    { name: "Aura", url: "https://aurainc.sjv.io/c/5660929/899264/12398", icon: "🛡️" },
    { name: "NordVPN", url: "https://nordvpn.sjv.io/c/5660929/417838/7452", icon: "🔒" }
  ],
  "fin-invoicing": [
    { name: "Shopify", url: "https://shopify.pxf.io/c/5660929/1061744/13624", icon: "🛒" },
    { name: "n8n", url: "https://n8n.partnerlinks.io/myCoder", icon: "🔄" }
  ],
  "fin-dashboard": [
    { name: "Easyship", url: "https://easyship.ilbqy6.net/c/5660929/666308/10435", icon: "📦" },
    { name: "Shopify", url: "https://shopify.pxf.io/c/5660929/1061744/13624", icon: "🛒" }
  ],
  "fin-payments": [
    { name: "Shopify", url: "https://shopify.pxf.io/c/5660929/1061744/13624", icon: "🛒" },
    { name: "Mint Mobile", url: "https://mint-mobile.58dp.net/c/5660929/444520/7915", icon: "📱" }
  ],
  "fin-literacy": [
    { name: "Foundr", url: "https://foundr.sjv.io/c/5660929/1775718/20954", icon: "📈" }
  ],
  "fin-ops": [
    { name: "Easyship", url: "https://easyship.ilbqy6.net/c/5660929/666308/10435", icon: "📦" },
    { name: "Shopify", url: "https://shopify.pxf.io/c/5660929/1061744/13624", icon: "🛒" }
  ],
  "ai-creative": [
    { name: "Descript", url: "https://get.descript.com/myCoder", icon: "🎬" },
    { name: "11Labs", url: "https://try.elevenlabs.io/myCoder", icon: "🎙️" },
    { name: "InVideo", url: "https://invideo.sjv.io/c/5660929/883681/12258", icon: "🎥" },
    { name: "HeyGen", url: "https://heygen.com/?via=myCoder", icon: "🤖" }
  ],
  "brand-consistency": [
    { name: "Envato", url: "https://1.envato.market/c/5660929/298927/4662", icon: "🎨" },
    { name: "Envato Placeit", url: "https://1.envato.market/c/5660929/629767/10168", icon: "🎭" },
    { name: "Canva", url: "https://public.canva.site/2024-canvassador-applications", icon: "🎨" }
  ],
  "portfolio": [
    { name: "Canva", url: "https://public.canva.site/2024-canvassador-applications", icon: "🎨" },
    { name: "Envato", url: "https://1.envato.market/c/5660929/298927/4662", icon: "🎨" },
    { name: "Shopify", url: "https://shopify.pxf.io/c/5660929/1061744/13624", icon: "🛒" }
  ],
  "content-quality": [
    { name: "Descript", url: "https://get.descript.com/myCoder", icon: "🎬" },
    { name: "Play.ai", url: "https://playai.com/?via=myCoder", icon: "🎮" },
    { name: "11Labs", url: "https://try.elevenlabs.io/myCoder", icon: "🎙️" },
    { name: "InVideo", url: "https://invideo.sjv.io/c/5660929/883681/12258", icon: "🎥" }
  ],
  "content-studio": [
    { name: "Buffer", url: "https://buffer.com/join/607341a6eb1f9a6f200561aab01317d3b909eb13322952955f6716238b35d7f8", icon: "📊" },
    { name: "Tailwind", url: "https://tailwind.sjv.io/c/5660929/1005723/13164", icon: "🎨" },
    { name: "Upwork", url: "https://upwork.pxf.io/c/5660929/1062918/13634", icon: "👥" }
  ],
  "analytics-dashboard": [
    { name: "Foundr", url: "https://foundr.sjv.io/c/5660929/1775718/20954", icon: "📈" }
  ],
  "data-centralization": [
    { name: "n8n", url: "https://n8n.partnerlinks.io/myCoder", icon: "🔄" }
  ],
  "customer-analytics": [
    { name: "Shopify", url: "https://shopify.pxf.io/c/5660929/1061744/13624", icon: "🛒" },
    { name: "Easyship", url: "https://easyship.ilbqy6.net/c/5660929/666308/10435", icon: "📦" }
  ],
  "reporting-automation": [
    { name: "n8n", url: "https://n8n.partnerlinks.io/myCoder", icon: "🔄" },
    { name: "Guidde", url: "https://affiliate.guidde.com/myCoder", icon: "📹" }
  ],
  "insights-monthly": [
    { name: "Foundr", url: "https://foundr.sjv.io/c/5660929/1775718/20954", icon: "📈" }
  ],
  "youth-digital": [
    { name: "Canva", url: "https://public.canva.site/2024-canvassador-applications", icon: "🎨" },
    { name: "Chicago Urban League", url: "#", icon: "🏛️" },
    { name: "TGS The Gathering Spot", url: "#", icon: "🎯" }
  ],
  "creator-scaling": [
    { name: "Foundr", url: "https://foundr.sjv.io/c/5660929/1775718/20954", icon: "📈" },
    { name: "Shopify", url: "https://shopify.pxf.io/c/5660929/1061744/13624", icon: "🛒" },
    { name: "Buffer", url: "https://buffer.com/join/607341a6eb1f9a6f200561aab01317d3b909eb13322952955f6716238b35d7f8", icon: "📊" }
  ],
  "tech-modernization": [
    { name: "Best Buy", url: "https://bestbuy.7tiv.net/c/5660929/614286/10014", icon: "🏪" },
    { name: "NordVPN", url: "https://nordvpn.sjv.io/c/5660929/417838/7452", icon: "🔒" },
    { name: "Aura", url: "https://aurainc.sjv.io/c/5660929/899264/12398", icon: "🛡️" }
  ],
  "mentorship": [
    { name: "Foundr", url: "https://foundr.sjv.io/c/5660929/1775718/20954", icon: "📈" },
    { name: "Upwork", url: "https://upwork.pxf.io/c/5660929/1062918/13634", icon: "👥" },
    { name: "TGS The Gathering Spot", url: "#", icon: "🎯" }
  ],
  "workforce-training": [
    { name: "Foundr", url: "https://foundr.sjv.io/c/5660929/1775718/20954", icon: "📈" },
    { name: "Canva", url: "https://public.canva.site/2024-canvassador-applications", icon: "🎨" },
    { name: "Chicago Urban League", url: "#", icon: "🏛️" },
    { name: "TGS The Gathering Spot", url: "#", icon: "🎯" }
  ]
};

// Pain points and solutions data
const SOLUTIONS = [
  // Operations & Workflow
  {
    id: "ops-automation",
    title: "Task Automation",
    painPoint: "Manual, repetitive tasks taking too much time",
    solution: "Automation tools for emails, scheduling, and reporting",
    category: "Operations & Workflow",
    level: 2,
    model: "starter",
    billingType: "oneTime",
    deliverables: ["Workflow design", "3-5 automations", "Training & documentation"],
    icon: Zap,
    expandedInfo: {
      overview: "Task automation solutions help businesses eliminate repetitive tasks, reduce human error, and increase productivity. These tools enable seamless integration between various platforms and create automated workflows that save time and resources.",
      keyFeatures: ["Visual workflow builders", "Multi-platform integration", "Custom triggers and actions", "Real-time monitoring", "Scalable automation"],
      benefits: ["Save hours of manual work", "Reduce operational costs", "Improve accuracy and consistency", "Enable 24/7 operations", "Focus on high-value tasks"],
      useCases: ["Lead generation automation", "Customer onboarding", "Data synchronization", "Report generation", "Notification systems"]
    }
  },
  {
    id: "ops-task-mgmt",
    title: "Project Management",
    painPoint: "Poor task management and team coordination",
    solution: "Cloud-based team collaboration platforms",
    category: "Operations & Workflow",
    level: 2,
    model: "starter",
    deliverables: ["System setup", "Team training", "Custom workflows"],
    icon: Users,
    expandedInfo: {
      overview: "Effective project management is crucial for business success. These tools provide comprehensive solutions for planning, executing, and monitoring projects while ensuring team collaboration and resource optimization.",
      keyFeatures: ["Task assignment and tracking", "Timeline visualization", "Resource management", "Team collaboration", "Progress reporting"],
      benefits: ["Improved project visibility", "Better resource allocation", "Enhanced team communication", "Reduced project delays", "Increased success rates"],
      useCases: ["Software development", "Marketing campaigns", "Product launches", "Client projects", "Internal initiatives"]
    }
  },
  {
    id: "ops-crm",
    title: "Client Management",
    painPoint: "Difficulty tracking client interactions and follow-ups",
    solution: "CRM setup & integrations with existing tools",
    category: "Operations & Workflow",
    level: 3,
    model: "pro",
    deliverables: ["CRM implementation", "Data migration", "Automation rules"],
    icon: Users,
    expandedInfo: {
      overview: "Client management solutions help businesses maintain strong relationships with their customers, streamline communication, and provide exceptional service throughout the customer lifecycle.",
      keyFeatures: ["Contact management", "Communication tracking", "Service history", "Feedback collection", "Relationship analytics"],
      benefits: ["Improved customer satisfaction", "Increased retention rates", "Better communication flow", "Enhanced service quality", "Data-driven decisions"],
      useCases: ["Customer support", "Account management", "Service delivery", "Feedback collection", "Relationship building"]
    }
  },
  {
    id: "ops-maint",
    title: "System Maintenance",
    painPoint: "Ongoing system updates and optimization needs",
    solution: "Monthly maintenance and optimization plan",
    category: "Operations & Workflow", 
    level: 2,
    model: "starter",
    billingType: "monthly",
    deliverables: ["Monthly updates", "Performance monitoring", "Priority support"],
    icon: Zap,
    expandedInfo: {
      overview: "System maintenance tools ensure your technology infrastructure remains secure, up-to-date, and performing optimally. These solutions provide comprehensive protection and maintenance capabilities.",
      keyFeatures: ["Automated updates", "Security monitoring", "Performance optimization", "Backup solutions", "Remote management"],
      benefits: ["Enhanced system security", "Improved performance", "Reduced downtime", "Proactive issue prevention", "Cost-effective maintenance"],
      useCases: ["Server management", "Network security", "Software updates", "Data backup", "Performance monitoring"]
    }
  },
  
  // Digital Presence
  {
    id: "web-starter",
    title: "Professional Website",
    painPoint: "No website or outdated website presence",
    solution: "Modern, responsive web design",
    category: "Digital Presence",
    level: 2,
    model: "starter",
    deliverables: ["Custom design", "Mobile responsive", "Basic SEO setup"],
    icon: Globe,
    expandedInfo: {
      overview: "Professional website solutions provide everything needed to create, host, and maintain a powerful online presence. From hosting to design, these tools cover all aspects of web development.",
      keyFeatures: ["Reliable hosting", "Professional templates", "E-commerce integration", "Mobile responsiveness", "SEO optimization"],
      benefits: ["Professional online presence", "Increased credibility", "Better user experience", "Higher conversion rates", "Scalable growth"],
      useCases: ["Business websites", "E-commerce stores", "Portfolio sites", "Blogs", "Landing pages"]
    }
  },
  {
    id: "web-cms",
    title: "Easy Content Updates",
    painPoint: "Hard-to-update sites requiring technical skills",
    solution: "CMS integration (WordPress, Webflow, etc.)",
    category: "Digital Presence",
    level: 2,
    model: "starter",
    deliverables: ["CMS setup", "Content migration", "Training sessions"],
    icon: Globe,
    expandedInfo: {
      overview: "Content management solutions make it easy to create, edit, and publish content across various platforms. These tools empower teams to maintain fresh, engaging content without technical expertise.",
      keyFeatures: ["Drag-and-drop editing", "Template library", "Multi-platform publishing", "Version control", "Collaboration tools"],
      benefits: ["Faster content creation", "Consistent branding", "Reduced technical barriers", "Improved collaboration", "Better content quality"],
      useCases: ["Blog posts", "Social media content", "Website updates", "Marketing materials", "Educational content"]
    }
  },
  {
    id: "web-seo",
    title: "SEO Optimization",
    painPoint: "Limited visibility and search engine ranking",
    solution: "Comprehensive SEO optimization",
    category: "Digital Presence",
    level: 2,
    model: "starter",
    deliverables: ["SEO audit", "Keyword research", "On-page optimization"],
    icon: Globe,
    expandedInfo: {
      overview: "SEO optimization tools help businesses improve their visibility in search engine results, drive organic traffic, and establish authority in their industry through data-driven strategies.",
      keyFeatures: ["Keyword research", "On-page optimization", "Backlink analysis", "Performance tracking", "Competitor analysis"],
      benefits: ["Increased organic traffic", "Better search rankings", "Higher conversion rates", "Improved brand visibility", "Cost-effective marketing"],
      useCases: ["Website optimization", "Content strategy", "Local SEO", "E-commerce SEO", "Technical SEO"]
    }
  },
  {
    id: "shop-ecommerce",
    title: "Online Store",
    painPoint: "No eCommerce capability for selling products/services",
    solution: "Online stores with payment gateways",
    category: "Digital Presence",
    level: 3,
    model: "pro",
    deliverables: ["Store setup", "Payment integration", "Product migration"],
    icon: Globe,
    expandedInfo: {
      overview: "E-commerce solutions provide everything needed to build, manage, and grow an online store. From product management to payment processing and shipping, these tools cover the entire e-commerce ecosystem.",
      keyFeatures: ["Product catalog management", "Shopping cart functionality", "Payment processing", "Shipping integration", "Inventory management"],
      benefits: ["Global market reach", "24/7 sales capability", "Automated processes", "Detailed analytics", "Scalable infrastructure"],
      useCases: ["Retail stores", "Digital products", "Subscription services", "Dropshipping", "Multi-channel sales"]
    }
  },
  {
    id: "site-care",
    title: "Website Care",
    painPoint: "Ongoing website maintenance and security",
    solution: "Monthly website care and security plan",
    category: "Digital Presence",
    level: 2,
    model: "starter",
    billingType: "monthly",
    deliverables: ["Updates & backups", "Security monitoring", "Performance tuning"],
    icon: Globe,
    expandedInfo: {
      overview: "Website care solutions ensure your online presence remains secure, fast, and reliable. These tools provide ongoing maintenance, security monitoring, and performance optimization.",
      keyFeatures: ["Security monitoring", "Performance optimization", "Regular backups", "Update management", "Uptime monitoring"],
      benefits: ["Enhanced security", "Improved performance", "Reduced downtime", "Peace of mind", "Professional maintenance"],
      useCases: ["Business websites", "E-commerce sites", "Blogs", "Portfolio sites", "Web applications"]
    }
  },
  
  // Marketing & Engagement
  {
    id: "smm-automation",
    title: "Social Media Automation",
    painPoint: "Struggling to reach and engage audiences consistently",
    solution: "Social media automation and scheduling tools",
    category: "Marketing & Engagement",
    level: 2,
    model: "starter",
    deliverables: ["Tool setup", "Content calendar", "Automation workflows"],
    icon: Users,
    expandedInfo: {
      overview: "Social media automation tools help businesses maintain consistent engagement across platforms, schedule content in advance, and analyze performance to optimize their social media strategy.",
      keyFeatures: ["Content scheduling", "Multi-platform management", "Analytics and reporting", "Engagement automation", "Content curation"],
      benefits: ["Consistent posting schedule", "Time savings", "Improved engagement", "Better analytics", "Cross-platform consistency"],
      useCases: ["Brand awareness", "Lead generation", "Customer engagement", "Content marketing", "Community building"]
    }
  },
  {
    id: "marketing-campaigns",
    title: "Interactive Campaigns",
    painPoint: "Low engagement and audience interaction",
    solution: "Interactive campaigns (quizzes, polls, giveaways)",
    category: "Marketing & Engagement",
    level: 2,
    model: "starter",
    deliverables: ["Campaign design", "Implementation", "Analytics setup"],
    icon: Users,
    expandedInfo: {
      overview: "Interactive campaign solutions enable businesses to create engaging, participatory marketing experiences that drive higher engagement and conversion rates through interactive elements.",
      keyFeatures: ["Interactive content creation", "Gamification elements", "User engagement tracking", "Multi-channel deployment", "Real-time analytics"],
      benefits: ["Higher engagement rates", "Improved user experience", "Better conversion rates", "Enhanced brand recall", "Valuable user insights"],
      useCases: ["Product launches", "Brand awareness", "Lead generation", "Customer education", "Event promotion"]
    }
  },
  {
    id: "branding",
    title: "Brand Identity",
    painPoint: "No clear branding or inconsistent visual identity",
    solution: "Brand identity design (logos, colors, templates)",
    category: "Marketing & Engagement",
    level: 2,
    model: "starter",
    deliverables: ["Logo design", "Brand guidelines", "Template creation"],
    icon: Palette,
    expandedInfo: {
      overview: "Brand identity tools help businesses create and maintain a consistent visual presence across all touchpoints. These solutions provide professional design capabilities for establishing strong brand recognition.",
      keyFeatures: ["Logo design", "Brand guidelines", "Template library", "Color palette management", "Asset organization"],
      benefits: ["Professional brand appearance", "Consistent branding", "Increased recognition", "Competitive advantage", "Brand loyalty"],
      useCases: ["Logo creation", "Marketing materials", "Social media graphics", "Business cards", "Brand guidelines"]
    }
  },
  {
    id: "email-marketing",
    title: "Email Campaigns",
    painPoint: "Difficult email campaign management and automation",
    solution: "Email marketing automations (Mailchimp, etc.)",
    category: "Marketing & Engagement",
    level: 2,
    model: "starter",
    deliverables: ["System setup", "Template design", "Automation flows"],
    icon: Users,
    expandedInfo: {
      overview: "Email campaign solutions enable businesses to create, automate, and optimize email marketing efforts. These tools provide everything needed for effective email communication with subscribers.",
      keyFeatures: ["Email template builder", "Automation workflows", "Segmentation capabilities", "A/B testing", "Performance analytics"],
      benefits: ["Direct customer communication", "High ROI potential", "Automated nurturing", "Personalized messaging", "Measurable results"],
      useCases: ["Newsletter campaigns", "Promotional emails", "Welcome sequences", "Abandoned cart recovery", "Lead nurturing"]
    }
  },
  {
    id: "social-ops",
    title: "Social Media Management",
    painPoint: "Ongoing social media content creation and management",
    solution: "Monthly social media operations and content creation",
    category: "Marketing & Engagement",
    level: 2,
    model: "starter",
    billingType: "monthly",
    deliverables: ["Content calendar", "Post creation", "Engagement management"],
    icon: Users,
    expandedInfo: {
      overview: "Social media management platforms provide comprehensive tools for planning, creating, scheduling, and analyzing content across multiple social media channels from a single dashboard.",
      keyFeatures: ["Multi-platform posting", "Content calendar", "Analytics dashboard", "Team collaboration", "Engagement tools"],
      benefits: ["Streamlined workflow", "Consistent branding", "Better analytics", "Improved collaboration", "Time efficiency"],
      useCases: ["Content planning", "Brand management", "Community engagement", "Performance tracking", "Team coordination"]
    }
  },
  
  // Security & Online Safety
  {
    id: "sec-2fa",
    title: "Two-Factor Authentication",
    painPoint: "Weak passwords and security vulnerabilities",
    solution: "2FA setup & password best practices implementation",
    category: "Security & Online Safety",
    level: 1,
    model: "starter",
    deliverables: ["2FA deployment", "Password policy", "Security audit"],
    icon: Shield,
    expandedInfo: {
      overview: "Two-factor authentication adds an essential layer of security to protect accounts and sensitive data. These solutions provide secure, user-friendly methods for verifying user identity.",
      keyFeatures: ["Multi-factor authentication", "Biometric verification", "One-time passwords", "Device management", "Security monitoring"],
      benefits: ["Enhanced account security", "Reduced unauthorized access", "Compliance with regulations", "User-friendly experience", "Peace of mind"],
      useCases: ["Employee accounts", "Customer accounts", "Administrative access", "Remote work security", "Compliance requirements"]
    }
  },
  {
    id: "safety-training",
    title: "Online Safety Training",
    painPoint: "Cyberbullying, phishing attacks, and online safety concerns",
    solution: "Online safety training and awareness programs",
    category: "Security & Online Safety",
    level: 1,
    model: "starter",
    deliverables: ["Training sessions", "Policy templates", "Resource materials"],
    icon: Shield,
    expandedInfo: {
      overview: "Online safety training solutions provide comprehensive education on cybersecurity best practices, threat awareness, and safe online behavior for employees and organizations.",
      keyFeatures: ["Interactive training modules", "Threat simulation", "Progress tracking", "Certification programs", "Regular updates"],
      benefits: ["Improved security awareness", "Reduced security incidents", "Compliance with regulations", "Empowered employees", "Risk mitigation"],
      useCases: ["Employee onboarding", "Security awareness", "Compliance training", "Phishing prevention", "Data protection"]
    }
  },
  {
    id: "data-security",
    title: "Data Protection",
    painPoint: "Data at risk and inadequate file sharing security",
    solution: "Encryption & secure file sharing systems",
    category: "Security & Online Safety",
    level: 2,
    model: "starter",
    deliverables: ["Security setup", "Encryption tools", "Access controls"],
    icon: Shield,
    expandedInfo: {
      overview: "Data protection solutions provide comprehensive security measures to safeguard sensitive information, ensure compliance with regulations, and protect against data breaches and cyber threats.",
      keyFeatures: ["Encryption technology", "Access controls", "Backup solutions", "Monitoring systems", "Compliance tools"],
      benefits: ["Enhanced data security", "Regulatory compliance", "Reduced breach risk", "Customer trust", "Business continuity"],
      useCases: ["Customer data protection", "Financial information security", "Intellectual property protection", "Compliance management", "Risk assessment"]
    }
  },
  {
    id: "parental-controls",
    title: "Digital Safety for Youth",
    painPoint: "Lack of parental controls for creators and organizations with youth",
    solution: "Digital literacy workshops and safety controls",
    category: "Security & Online Safety",
    level: 1,
    model: "starter",
    deliverables: ["Control setup", "Safety training", "Monitoring tools"],
    icon: Shield,
    expandedInfo: {
      overview: "Digital safety solutions for youth provide specialized tools and education to protect young users online, promote safe digital habits, and empower parents and educators with monitoring capabilities.",
      keyFeatures: ["Content filtering", "Screen time management", "Activity monitoring", "Educational resources", "Parental controls"],
      benefits: ["Enhanced youth safety", "Age-appropriate content access", "Improved digital literacy", "Peace of mind for parents", "Healthy online habits"],
      useCases: ["Family protection", "Educational institutions", "Youth organizations", "Parental guidance", "Digital citizenship education"]
    }
  },
  {
    id: "sec-monitoring",
    title: "Security Monitoring",
    painPoint: "Ongoing security monitoring and threat detection",
    solution: "Monthly security monitoring and vulnerability assessments",
    category: "Security & Online Safety",
    level: 2,
    model: "starter",
    billingType: "monthly",
    deliverables: ["Continuous monitoring", "Threat detection", "Security reports"],
    icon: Shield,
    expandedInfo: {
      overview: "Security monitoring solutions provide continuous surveillance of systems and networks to detect, prevent, and respond to potential security threats in real-time.",
      keyFeatures: ["Real-time threat detection", "Behavioral analysis", "Alert systems", "Incident response", "Compliance reporting"],
      benefits: ["Proactive threat detection", "Reduced response time", "Improved security posture", "Regulatory compliance", "Risk mitigation"],
      useCases: ["Network security", "Endpoint protection", "Cloud security", "Application security", "Compliance monitoring"]
    }
  },
  
  // Financial & Business Management
  {
    id: "fin-invoicing",
    title: "Automated Billing",
    painPoint: "No invoicing or payment tracking systems",
    solution: "Automated billing systems and payment tracking",
    category: "Financial & Biz Mgmt",
    level: 1,
    model: "starter",
    deliverables: ["System setup", "Template creation", "Integration setup"],
    icon: DollarSign,
    expandedInfo: {
      overview: "Automated billing solutions streamline financial operations by handling invoicing, payment processing, and revenue management with minimal manual intervention.",
      keyFeatures: ["Automated invoicing", "Payment processing", "Subscription management", "Revenue tracking", "Financial reporting"],
      benefits: ["Reduced manual work", "Improved cash flow", "Fewer errors", "Better financial visibility", "Scalable operations"],
      useCases: ["Subscription businesses", "Service providers", "E-commerce", "SaaS companies", "Freelance services"]
    }
  },
  {
    id: "fin-dashboard",
    title: "Financial Visibility",
    painPoint: "Poor budgeting visibility and financial tracking",
    solution: "Data dashboards & financial tracking systems",
    category: "Financial & Biz Mgmt",
    level: 2,
    model: "starter",
    deliverables: ["Dashboard setup", "Data integration", "Custom reports"],
    icon: BarChart3,
    expandedInfo: {
      overview: "Financial visibility tools provide comprehensive insights into business performance, revenue streams, and financial health through advanced analytics and reporting capabilities.",
      keyFeatures: ["Revenue tracking", "Expense monitoring", "Profit analysis", "Financial dashboards", "Custom reporting"],
      benefits: ["Better financial decisions", "Improved profitability", "Enhanced planning", "Investor confidence", "Operational efficiency"],
      useCases: ["Business planning", "Investor reporting", "Performance analysis", "Budget management", "Strategic decision-making"]
    }
  },
  {
    id: "fin-payments",
    title: "Digital Payments",
    painPoint: "Limited digital payment capabilities",
    solution: "Cash App / Stripe / PayPal integrations",
    category: "Financial & Biz Mgmt",
    level: 1,
    model: "starter",
    deliverables: ["Payment setup", "Integration testing", "Training"],
    icon: DollarSign,
    expandedInfo: {
      overview: "Digital payment solutions provide secure, convenient, and efficient methods for processing transactions online, enabling businesses to accept payments from customers worldwide.",
      keyFeatures: ["Multiple payment methods", "Secure processing", "Global acceptance", "Mobile optimization", "Fraud protection"],
      benefits: ["Increased sales", "Better customer experience", "Reduced fraud risk", "Global reach", "Faster transactions"],
      useCases: ["E-commerce stores", "Service businesses", "Subscription services", "Mobile apps", "International sales"]
    }
  },
  {
    id: "fin-literacy",
    title: "Financial Literacy",
    painPoint: "Lack of financial literacy and digital finance knowledge",
    solution: "Workshops on budgeting & digital finance",
    category: "Financial & Biz Mgmt",
    level: 1,
    model: "starter",
    deliverables: ["Training sessions", "Resource materials", "Ongoing support"],
    icon: DollarSign,
    expandedInfo: {
      overview: "Financial literacy resources provide education and tools to help individuals and businesses understand financial concepts, make informed decisions, and build long-term financial health.",
      keyFeatures: ["Educational content", "Interactive tools", "Expert guidance", "Community support", "Progress tracking"],
      benefits: ["Improved financial decisions", "Better money management", "Increased confidence", "Long-term success", "Reduced financial stress"],
      useCases: ["Personal finance", "Business finance", "Investment education", "Debt management", "Financial planning"]
    }
  },
  {
    id: "fin-ops",
    title: "Financial Operations",
    painPoint: "Ongoing financial management and bookkeeping needs",
    solution: "Monthly financial operations and bookkeeping support",
    category: "Financial & Biz Mgmt",
    level: 2,
    model: "starter",
    billingType: "monthly",
    deliverables: ["Bookkeeping", "Financial reporting", "Tax preparation support"],
    icon: DollarSign,
    expandedInfo: {
      overview: "Financial operations solutions streamline and optimize all aspects of financial management, from accounting and payroll to reporting and compliance.",
      keyFeatures: ["Accounting automation", "Payroll management", "Financial reporting", "Compliance tools", "Cash flow management"],
      benefits: ["Operational efficiency", "Reduced errors", "Better compliance", "Improved accuracy", "Time savings"],
      useCases: ["Small business finance", "Enterprise accounting", "Payroll processing", "Tax preparation", "Financial reporting"]
    }
  },
  
  // Creativity & Content Creation
  {
    id: "ai-creative",
    title: "AI Creative Tools",
    painPoint: "Time-consuming design and content creation",
    solution: "AI tools for images, video, and copywriting",
    category: "Creativity & Content",
    level: 2,
    model: "starter",
    deliverables: ["Tool setup", "Training sessions", "Template library"],
    icon: Palette,
    expandedInfo: {
      overview: "AI creative tools leverage artificial intelligence to enhance content creation, from video and audio production to design and writing, making professional creativity accessible to everyone.",
      keyFeatures: ["AI-powered generation", "Voice synthesis", "Video creation", "Content enhancement", "Template library"],
      benefits: ["Faster content creation", "Professional quality", "Cost-effective production", "Creative empowerment", "Scalable output"],
      useCases: ["Video production", "Podcast creation", "Content marketing", "Social media content", "Educational materials"]
    }
  },
  {
    id: "brand-consistency",
    title: "Brand Consistency",
    painPoint: "Struggle with consistent branding across materials",
    solution: "Content calendars & brand templates",
    category: "Creativity & Content",
    level: 2,
    model: "starter",
    deliverables: ["Template creation", "Style guides", "Workflow setup"],
    icon: Palette,
    expandedInfo: {
      overview: "Brand consistency solutions ensure your brand maintains a unified identity across all platforms and touchpoints, building recognition and trust with your audience.",
      keyFeatures: ["Brand asset management", "Template systems", "Guidelines enforcement", "Multi-channel coordination", "Quality control"],
      benefits: ["Strong brand recognition", "Professional appearance", "Customer trust", "Marketing efficiency", "Competitive advantage"],
      useCases: ["Marketing campaigns", "Social media", "Print materials", "Digital assets", "Customer communications"]
    }
  },
  {
    id: "portfolio",
    title: "Digital Portfolio",
    painPoint: "No professional portfolio or showcase platform",
    solution: "Personal profile & portfolio sites",
    category: "Creativity & Content",
    level: 2,
    model: "starter",
    deliverables: ["Portfolio design", "Content organization", "SEO optimization"],
    icon: Palette,
    expandedInfo: {
      overview: "Digital portfolio solutions provide professional platforms for showcasing work, skills, and achievements to potential clients, employers, or collaborators.",
      keyFeatures: ["Professional templates", "Multimedia support", "Customizable layouts", "Integration capabilities", "Analytics tracking"],
      benefits: ["Professional presentation", "Increased visibility", "Better opportunities", "Showcase versatility", "Career advancement"],
      useCases: ["Artist portfolios", "Designer showcases", "Developer projects", "Photographer galleries", "Freelancer profiles"]
    }
  },
  {
    id: "content-quality",
    title: "Content Quality",
    painPoint: "Low-quality content and lack of professional design skills",
    solution: "Training on Canva, ChatGPT, Play.ai, etc.",
    category: "Creativity & Content",
    level: 1,
    model: "starter",
    deliverables: ["Software training", "Design principles", "Content strategy"],
    icon: Palette,
    expandedInfo: {
      overview: "Content quality tools provide professional-grade editing, production, and enhancement capabilities to ensure your content meets the highest standards of quality and engagement.",
      keyFeatures: ["Professional editing", "Audio enhancement", "Video production", "Quality control", "Format optimization"],
      benefits: ["Professional content", "Higher engagement", "Better retention", "Improved credibility", "Competitive advantage"],
      useCases: ["Video production", "Podcast editing", "Content refinement", "Quality assurance", "Multi-format adaptation"]
    }
  },
  {
    id: "content-studio",
    title: "Content Studio",
    painPoint: "Ongoing content creation and brand management",
    solution: "Monthly content creation and brand management services",
    category: "Creativity & Content",
    level: 2,
    model: "starter",
    billingType: "monthly",
    deliverables: ["Content creation", "Brand management", "Performance analytics"],
    icon: Palette,
    expandedInfo: {
      overview: "Content studio solutions provide all-in-one platforms for planning, creating, editing, and distributing content across multiple channels with professional tools and workflows.",
      keyFeatures: ["Content planning", "Creation tools", "Collaboration features", "Distribution management", "Performance analytics"],
      benefits: ["Streamlined workflow", "Consistent quality", "Team collaboration", "Multi-channel publishing", "Data-driven optimization"],
      useCases: ["Content marketing", "Social media management", "Brand content", "Educational materials", "Creative campaigns"]
    }
  },
  
  // Data & Analytics
  {
    id: "analytics-dashboard",
    title: "Impact Measurement",
    painPoint: "No way to measure business impact and ROI",
    solution: "Custom dashboards (Google Data Studio, Looker, etc.)",
    category: "Data & Analytics",
    level: 2,
    model: "starter",
    deliverables: ["Dashboard design", "Data integration", "Custom metrics"],
    icon: BarChart3,
    expandedInfo: {
      overview: "Impact measurement tools provide comprehensive analytics and reporting capabilities to track, measure, and optimize the effectiveness of your business initiatives and marketing efforts.",
      keyFeatures: ["Performance tracking", "ROI analysis", "Custom reporting", "Real-time analytics", "Goal setting"],
      benefits: ["Data-driven decisions", "Improved ROI", "Better resource allocation", "Strategic insights", "Performance optimization"],
      useCases: ["Marketing campaigns", "Business initiatives", "Social impact", "Customer engagement", "Financial performance"]
    }
  },
  {
    id: "data-centralization",
    title: "Data Centralization",
    painPoint: "Scattered spreadsheets and disconnected data sources",
    solution: "Centralized databases and data management",
    category: "Data & Analytics",
    level: 3,
    model: "pro",
    deliverables: ["Database setup", "Data migration", "Integration workflows"],
    icon: BarChart3,
    expandedInfo: {
      overview: "Data centralization solutions bring together information from multiple sources into a unified system, improving data accessibility, consistency, and decision-making capabilities.",
      keyFeatures: ["Data integration", "Unified storage", "Synchronization", "Access control", "Data governance"],
      benefits: ["Improved data quality", "Better accessibility", "Enhanced security", "Streamlined operations", "Informed decisions"],
      useCases: ["Business intelligence", "Data warehousing", "System integration", "Reporting systems", "Analytics platforms"]
    }
  },
  {
    id: "customer-analytics",
    title: "Customer Insights",
    painPoint: "Hard to understand customer behavior and preferences",
    solution: "Data-driven insights and customer analytics",
    category: "Data & Analytics",
    level: 2,
    model: "starter",
    deliverables: ["Analytics setup", "Customer segmentation", "Insight reports"],
    icon: BarChart3,
    expandedInfo: {
      overview: "Customer insights solutions provide deep understanding of customer behavior, preferences, and patterns through advanced analytics and data collection methods.",
      keyFeatures: ["Behavior tracking", "Preference analysis", "Segmentation tools", "Journey mapping", "Predictive analytics"],
      benefits: ["Better customer understanding", "Personalized experiences", "Improved retention", "Targeted marketing", "Enhanced satisfaction"],
      useCases: ["Customer segmentation", "Personalization", "Retention strategies", "Product development", "Marketing optimization"]
    }
  },
  {
    id: "reporting-automation",
    title: "Automated Reporting",
    painPoint: "Manual reporting and lack of automated insights",
    solution: "Automated analytics & visualization tools",
    category: "Data & Analytics",
    level: 2,
    model: "starter",
    deliverables: ["Report automation", "Visualization setup", "Scheduled delivery"],
    icon: BarChart3,
    expandedInfo: {
      overview: "Automated reporting solutions streamline the creation and distribution of reports, saving time and ensuring consistent, accurate information delivery to stakeholders.",
      keyFeatures: ["Automated generation", "Custom templates", "Scheduled delivery", "Data visualization", "Multi-format export"],
      benefits: ["Time savings", "Consistent reporting", "Improved accuracy", "Better decision-making", "Stakeholder satisfaction"],
      useCases: ["Business reports", "Financial statements", "Performance metrics", "Marketing analytics", "Operational reports"]
    }
  },
  {
    id: "insights-monthly",
    title: "Monthly Insights",
    painPoint: "Ongoing data analysis and business intelligence needs",
    solution: "Monthly data analysis and business intelligence reporting",
    category: "Data & Analytics",
    level: 2,
    model: "starter",
    billingType: "monthly",
    deliverables: ["Monthly analysis", "Insight reports", "Strategy recommendations"],
    icon: BarChart3,
    expandedInfo: {
      overview: "Monthly insights solutions provide regular, comprehensive analysis of business performance, market trends, and operational metrics to support strategic decision-making.",
      keyFeatures: ["Monthly analytics", "Trend analysis", "Performance benchmarks", "Strategic recommendations", "Visual dashboards"],
      benefits: ["Strategic planning", "Performance tracking", "Trend identification", "Competitive analysis", "Growth opportunities"],
      useCases: ["Business reviews", "Strategic planning", "Performance monitoring", "Investor reporting", "Market analysis"]
    }
  },
  
  // Education & Workforce
  {
    id: "youth-digital",
    title: "Youth Digital Skills",
    painPoint: "Youth lacking essential digital skills and literacy",
    solution: "Coding camps & digital literacy training",
    category: "Education & Workforce",
    level: 1,
    model: "starter",
    deliverables: ["Training programs", "Skill assessments", "Certification"],
    icon: Users,
    expandedInfo: {
      overview: "Youth digital skills programs provide comprehensive training and education to equip young people with the essential technical and creative skills needed for success in the digital economy.",
      keyFeatures: ["Technical training", "Creative skills", "Career guidance", "Mentorship programs", "Hands-on projects"],
      benefits: ["Career readiness", "Digital literacy", "Employment opportunities", "Confidence building", "Future-ready skills"],
      useCases: ["STEM education", "Digital literacy", "Career preparation", "Creative development", "Technology training"]
    }
  },
  {
    id: "creator-scaling",
    title: "Creator Scaling",
    painPoint: "Creators unsure how to scale their operations and income",
    solution: "Workshops on monetization & automation",
    category: "Education & Workforce",
    level: 2,
    model: "starter",
    deliverables: ["Strategy sessions", "Tool training", "Growth planning"],
    icon: Users,
    expandedInfo: {
      overview: "Creator scaling solutions provide the tools, resources, and strategies needed for content creators to grow their audience, monetize their content, and build sustainable businesses.",
      keyFeatures: ["Audience growth", "Monetization tools", "Content strategy", "Brand partnerships", "Business management"],
      benefits: ["Sustainable income", "Audience expansion", "Professional growth", "Brand development", "Business scalability"],
      useCases: ["Content monetization", "Audience building", "Brand partnerships", "Business development", "Career growth"]
    }
  },
  {
    id: "tech-modernization",
    title: "Tech Modernization",
    painPoint: "Small organizations stuck on outdated tools and systems",
    solution: "Training on modern tech stacks and tools",
    category: "Education & Workforce",
    level: 2,
    model: "starter",
    deliverables: ["Tech assessment", "Tool training", "Migration support"],
    icon: Zap,
    expandedInfo: {
      overview: "Tech modernization solutions help businesses upgrade their technology infrastructure, adopt new innovations, and stay competitive in an increasingly digital marketplace.",
      keyFeatures: ["System upgrades", "Cloud migration", "Security enhancement", "Performance optimization", "Integration capabilities"],
      benefits: ["Competitive advantage", "Improved efficiency", "Enhanced security", "Scalability", "Future readiness"],
      useCases: ["Infrastructure upgrades", "Cloud adoption", "Security modernization", "Digital transformation", "System integration"]
    }
  },
  {
    id: "mentorship",
    title: "Mentorship Programs",
    painPoint: "No mentorship or guidance for career development",
    solution: "myCoder mentor programs and guidance",
    category: "Education & Workforce",
    level: 1,
    model: "starter",
    deliverables: ["Mentor matching", "Program structure", "Ongoing support"],
    icon: Users,
    expandedInfo: {
      overview: "Mentorship programs connect individuals with experienced professionals who provide guidance, support, and knowledge sharing to accelerate personal and professional growth.",
      keyFeatures: ["Expert matching", "Structured programs", "Progress tracking", "Community support", "Resource library"],
      benefits: ["Accelerated learning", "Career guidance", "Network expansion", "Skill development", "Confidence building"],
      useCases: ["Career development", "Entrepreneurship", "Skill building", "Leadership training", "Personal growth"]
    }
  },
  {
    id: "workforce-training",
    title: "Workforce Training",
    painPoint: "Ongoing workforce development and skill enhancement",
    solution: "Monthly workforce training and skill development programs",
    category: "Education & Workforce",
    level: 2,
    model: "starter",
    billingType: "monthly",
    deliverables: ["Training sessions", "Skill assessments", "Progress tracking"],
    icon: Users,
    expandedInfo: {
      overview: "Workforce training solutions provide comprehensive education and skill development programs to enhance employee capabilities, improve productivity, and drive business success.",
      keyFeatures: ["Skill assessment", "Customized training", "Progress tracking", "Certification programs", "Ongoing support"],
      benefits: ["Improved productivity", "Enhanced skills", "Employee retention", "Competitive advantage", "Organizational growth"],
      useCases: ["Onboarding programs", "Skill development", "Leadership training", "Technical education", "Compliance training"]
    }
  },
];

function currency(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function Home() {
  const [q, setQ] = useState("");
  const [activeCats, setActiveCats] = useState(CATEGORIES);
  const [billing, setBilling] = useState<"all" | "oneTime" | "monthly">("all");
  const [selectedSolution, setSelectedSolution] = useState<any>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [recentlyRemoved, setRecentlyRemoved] = useState<string[]>([]);

  // Cart functions
  const addToCart = (solution: any) => {
    const priceRangeData = priceRange({ model: solution.model as ModelKey, level: `${solution.level}` });
    const midPrice = Math.round((priceRangeData.min + priceRangeData.max) / 2);
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === solution.id);
      if (existingItem) {
        setTimeout(() => {
          setRecentlyRemoved(prev => prev.filter(id => id !== solution.id));
        }, 2000);
        setRecentlyRemoved(prev => [...prev, solution.id]);
        return prevCart.filter(item => item.id !== solution.id);
      } else {
        setRecentlyRemoved(prev => prev.filter(id => id !== solution.id));
        return [...prevCart, {
          id: solution.id,
          title: solution.title,
          painPoint: solution.painPoint,
          solution: solution.solution,
          category: solution.category,
          level: solution.level,
          model: solution.model,
          billingType: solution.billingType,
          deliverables: solution.deliverables,
          price: priceRangeData,
          quantity: 1,
          selectedPrice: midPrice
        }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const updatePrice = (id: string, price: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, selectedPrice: price } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.selectedPrice * item.quantity), 0);
  };

  const isInCart = (solutionId: string) => {
    return cart.some(item => item.id === solutionId);
  };

  const getCartItem = (solutionId: string) => {
    return cart.find(item => item.id === solutionId);
  };

  const isRecentlyRemoved = (solutionId: string) => {
    return recentlyRemoved.includes(solutionId);
  };

  const filtered = useMemo(() => {
    return SOLUTIONS.filter((i) =>
      (billing === "all" || (billing === "oneTime" && i.billingType === "oneTime") || (billing === "monthly" && i.billingType === "monthly")) &&
      activeCats.includes(i.category) &&
      (q.trim() === "" || 
        `${i.title} ${i.painPoint} ${i.solution} ${i.category}`.toLowerCase().includes(q.toLowerCase())
      )
    );
  }, [q, activeCats, billing]);

  const toggleCat = (c: string) => {
    setActiveCats((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] overflow-x-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black to-black"></div>
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-[#00BFFF]/30 rounded-lg"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-[#8A2BE2]/30 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-[#9370DB]/20 rotate-45"></div>
      </div>
      
      {/* Header */}
      <header className="relative border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Cart Button */}
          <div className="absolute top-4 right-4 z-50">
            <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="relative border-gray-700 bg-[#0A0A0A] text-[#F5F5F5] hover:bg-gray-800 hover:border-gray-600 transition-all duration-300"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {getTotalItems() > 0 && (
                    <Badge 
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-[#00BFFF] to-[#8A2BE2] text-black text-xs min-w-5 h-5 flex items-center justify-center p-0"
                    >
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border-gray-700 text-[#F5F5F5]">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-white flex items-center justify-between">
                    <span>Shopping Cart</span>
                    {getTotalItems() > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={clearCart}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Clear All
                      </Button>
                    )}
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    {getTotalItems() === 0 
                      ? "Your cart is empty" 
                      : `${getTotalItems()} item${getTotalItems() > 1 ? 's' : ''} in your cart`
                    }
                  </DialogDescription>
                </DialogHeader>
                
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                    <p className="text-gray-400">Your cart is empty</p>
                    <p className="text-sm text-gray-500 mt-2">Add solutions to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h4 className="font-medium text-white">{item.title}</h4>
                            <p className="text-sm text-gray-400">{item.solution}</p>
                            <Badge 
                              className="mt-1 text-xs"
                              style={{
                                backgroundColor: item.billingType === "oneTime" ? "#00BFFF20" : "#8A2BE220",
                                color: item.billingType === "oneTime" ? "#00BFFF" : "#8A2BE2",
                                borderColor: item.billingType === "oneTime" ? "#00BFFF50" : "#8A2BE250",
                              }}
                            >
                              {item.billingType === "oneTime" ? "One-Time" : "Monthly"}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <label className="text-xs text-gray-400 block mb-1">Quantity</label>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="text-white min-w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <div>
                            <label className="text-xs text-gray-400 block mb-1">
                              Price ({currency(item.price.min)} - {currency(item.price.max)})
                            </label>
                            <input
                              type="range"
                              min={item.price.min}
                              max={item.price.max}
                              step="50"
                              value={item.selectedPrice}
                              onChange={(e) => updatePrice(item.id, parseInt(e.target.value))}
                              className="w-full accent-[#00BFFF]"
                            />
                            <div className="text-sm text-white mt-1">
                              {currency(item.selectedPrice)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                          <span className="text-sm text-gray-400">Subtotal</span>
                          <span className="font-medium text-white">
                            {currency(item.selectedPrice * item.quantity)}
                          </span>
                        </div>
                      </div>
                    ))}
                    
                    <div className="border-t border-gray-700 pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-medium text-white">Total</span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-[#00BFFF] to-[#8A2BE2] bg-clip-text text-transparent">
                          {currency(getTotalPrice())}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          className="flex-1 border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700"
                          onClick={() => setIsCartOpen(false)}
                        >
                          Continue Shopping
                        </Button>
                        <Button 
                          className="flex-1 bg-gradient-to-r from-[#00BFFF] to-[#8A2BE2] text-black font-semibold hover:shadow-lg hover:shadow-[#00BFFF]/40"
                        >
                          Checkout
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              <span className="text-white">Technology Pain Points</span>{" "}
              <span className="bg-gradient-to-r from-[#00BFFF] via-[#8A2BE2] to-[#9370DB] bg-clip-text text-transparent">
              <br />myCoder Solutions
              </span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed mb-6">
              Comprehensive technology solutions for small businesses, creators, and organizations.
              <br />
              Each card addresses a specific pain point with clear deliverables and pricing.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-gradient-to-r from-[#00BFFF]/20 to-[#8A2BE2]/20 text-sky-200 ring-1 ring-white/10">
                35+ Solutions
              </Badge>
            </div>
          </div>
          
          {/* Filters */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                placeholder="Search solutions (e.g., automation, website, security)"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-700 bg-[#0A0A0A] text-[#F5F5F5] placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00BFFF] focus:border-transparent"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 p-1 bg-gray-800 rounded-lg">
              {(["all", "oneTime", "monthly"] as const).map((k) => (
                <Button
                  key={k}
                  onClick={() => setBilling(k)}
                  variant={billing === k ? "default" : "ghost"}
                  className={`flex-1 h-auto py-2 text-sm transition-all duration-300 ${
                    billing === k 
                      ? "bg-gradient-to-r from-[#00BFFF] to-[#8A2BE2] text-black font-semibold"
                      : "text-gray-400 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  {k === "all" ? "All Types" : k === "oneTime" ? "One‑Time" : "Monthly"}
                </Button>
              ))}
            </div>
            
            {/* Category Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full justify-between border-gray-700 bg-[#0A0A0A] text-[#F5F5F5] placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00BFFF] focus:border-transparent hover:bg-gray-800 hover:border-gray-600 transition-all duration-300 rounded-lg py-3"
                >
                  <span className="text-sm">
                    {activeCats.length === CATEGORIES.length 
                      ? "All Categories" 
                      : `${activeCats.length} Selected`
                    }
                  </span>
                  <ChevronDown className="w-4 h-4 ml-2 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-56 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border-gray-700 text-[#F5F5F5] rounded-xl shadow-2xl shadow-black/50 backdrop-blur-sm"
                align="end"
                sideOffset={8}
              >
                <div className="p-3 border-b border-gray-700">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveCats(activeCats.length === CATEGORIES.length ? [] : CATEGORIES)}
                    className="w-full justify-start text-xs text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 font-medium"
                  >
                    {activeCats.length === CATEGORIES.length ? "✕ Deselect All" : "✓ Select All"}
                  </Button>
                </div>
                <div className="max-h-100 overflow-y-auto">
                  {CATEGORIES.map((c) => (
                    <DropdownMenuItem
                      key={c}
                      onClick={() => toggleCat(c)}
                      className={`cursor-pointer transition-all duration-200 m-1 rounded-lg ${
                        activeCats.includes(c)
                          ? "bg-gradient-to-r from-[#00BFFF]/20 to-[#8A2BE2]/20 text-white border border-[#00BFFF]/30"
                          : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                      }`}
                    >
                      <div className="flex items-center w-full py-1">
                        <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                          activeCats.includes(c)
                            ? "bg-gradient-to-r from-[#00BFFF] to-[#8A2BE2] border-transparent shadow-sm shadow-[#00BFFF]/30"
                            : "border-gray-600 bg-transparent"
                        }`}>
                          {activeCats.includes(c) && (
                            <Check className="w-3 h-3 text-black" />
                          )}
                        </div>
                        <span className="text-sm">{c}</span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-400">
            Showing <span className="text-white font-medium">{filtered.length}</span> of {SOLUTIONS.length} solutions
          </p>
          <div className="text-sm text-gray-500">
            Level 1 • Starter • Level 2 • Standard • Level 3 • Advanced
          </div>
        </div>
        
        {/* Solution Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filtered.map((i) => {
            const r = priceRange({ model: i.model as ModelKey, level: `${i.level}` });
            const IconComponent = i.icon;
            const borderColor = i.model === "starter" ? "#00BFFF" : "#8A2BE2";
            const affiliates = AFFILIATE_DATA[i.id as keyof typeof AFFILIATE_DATA] || [];
            
            return (
              <Card 
                key={i.id} 
                className="group h-full flex flex-col bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border-gray-800 hover:border-gray-600 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-900/50 overflow-hidden"
                style={{
                  borderColor: activeCats.includes(i.category) ? `${borderColor}40` : undefined,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardHeader className="pb-4 relative z-10">
                  {/* Cart Indicator */}
                  {isInCart(i.id) && (
                    <div className="absolute top-2 right-2 z-20">
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-black text-xs px-2 py-1">
                        In Cart
                      </Badge>
                    </div>
                  )}
                  
                  {/* Recently Removed Indicator */}
                  {isRecentlyRemoved(i.id) && !isInCart(i.id) && (
                    <div className="absolute top-2 right-2 z-20">
                      <Badge className="bg-gradient-to-r from-gray-400 to-gray-500 text-white text-xs px-2 py-1 opacity-80">
                        Removed
                      </Badge>
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-[#00BFFF]" />
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="shrink-0 transition-all duration-300"
                      style={{
                        backgroundColor: i.billingType === "oneTime" ? "#00BFFF20" : "#8A2BE220",
                        color: i.billingType === "oneTime" ? "#00BFFF" : "#8A2BE2",
                        borderColor: i.billingType === "oneTime" ? "#00BFFF50" : "#8A2BE250",
                      }}
                    >
                      {i.billingType === "oneTime" ? "One-Time" : "Monthly"}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight text-white mb-2">
                    {i.title}
                  </CardTitle>
                  <div className="space-y-2">
                    {/* Conditionally hide pain point if item is in cart or recently removed */}
                    {!isInCart(i.id) && !isRecentlyRemoved(i.id) && (
                      <p className="text-sm text-red-400 font-medium">
                        Pain Point: {i.painPoint}
                      </p>
                    )}
                    <p className="text-sm text-gray-400">
                      Solution: {i.solution}
                    </p>
                    {/* Show cart status if item is in cart */}
                    {isInCart(i.id) && (
                      <div className="flex items-center gap-2 text-sm text-green-400">
                        <Check className="w-4 h-4" />
                        <span>Added to cart - Click to remove</span>
                      </div>
                    )}
                    {/* Show recently removed status */}
                    {isRecentlyRemoved(i.id) && !isInCart(i.id) && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <X className="w-4 h-4" />
                        <span>Removed from cart</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col relative z-10">
                  {/* Pricing */}
                  <div className="mb-4">
                    <div className="text-2xl font-bold bg-gradient-to-r from-[#00BFFF] to-[#8A2BE2] bg-clip-text text-transparent">
                      {currency(r.min)} – {currency(r.max)}
                    </div>
                    <p className="text-xs text-gray-500">Level {i.level} • {i.billingType === "oneTime" ? "One-Time" : "Monthly"}</p>
                  </div>
                  
                  {/* Deliverables */}
                  <div className="mb-6 flex-1">
                    <h4 className="text-sm font-medium text-white mb-2">Deliverables:</h4>
                    <ul className="space-y-1">
                      {i.deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-2 text-sm text-gray-400">
                          <Check className="w-4 h-4 text-[#00BFFF] flex-shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2 mt-auto">
                    <Button 
                      className={`flex-1 font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                        isInCart(i.id) 
                          ? "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-red-500/40" 
                          : isRecentlyRemoved(i.id) 
                            ? "bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:shadow-gray-500/40"
                            : "bg-gradient-to-r from-[#00BFFF] to-[#8A2BE2] text-black hover:shadow-[#00BFFF]/40"
                      }`}
                      onClick={() => addToCart(i)}
                    >
                      {isInCart(i.id) ? (
                        <>
                          Remove from Cart
                          <X className="w-4 h-4 ml-2" />
                        </>
                      ) : isRecentlyRemoved(i.id) ? (
                        <>
                          Add Again
                          <Plus className="w-4 h-4 ml-2" />
                        </>
                      ) : (
                        <>
                          Add to Cart
                          <ShoppingCart className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                    
                    {/* Learn More Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="flex-1 border-gray-600 bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white hover:border-gray-500 transition-all duration-300"
                          onClick={() => setSelectedSolution(i as any)}
                        >
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border-gray-700 text-[#F5F5F5]">
                        <DialogHeader>
                          <DialogTitle className="text-2xl text-white">{i.title}</DialogTitle>
                          <DialogDescription className="text-lg text-gray-400">
                            {i.solution}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                          {/* Recommended Tools Section */}
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-semibold text-white">Recommended Tools</h3>
                              <Badge className="bg-gradient-to-r from-[#00BFFF]/20 to-[#8A2BE2]/20 text-sky-200 ring-1 ring-white/10">
                                {affiliates.length} Tools
                              </Badge>
                            </div>
                            
                            <div className="space-y-4">
                              {/* Tool Categories */}
                              <div className="grid grid-cols-1 gap-3">
                                {affiliates.map((affiliate, index) => {
                                  // Determine tool category based on the tool name
                                  const getToolCategory = (name: string) => {
                                    if (['n8n', 'Guidde', 'ManyChat', 'Buffer'].includes(name)) return 'Automation';
                                    if (['Upwork', 'Foundr'].includes(name)) return 'Business';
                                    if (['Bluehost', 'Shopify', 'Envato', 'Canva'].includes(name)) return 'Web & Design';
                                    if (['Best Buy', 'NordVPN', 'Aura'].includes(name)) return 'Security';
                                    if (['Descript', '11Labs', 'InVideo', 'HeyGen', 'Play.ai'].includes(name)) return 'AI & Media';
                                    if (['Easyship'].includes(name)) return 'Shipping';
                                    if (['Mint Mobile'].includes(name)) return 'Telecom';
                                    if (['Otter.ai', 'ChatGPTZero'].includes(name)) return 'AI Tools';
                                    return 'Tools';
                                  };
                                  // Get tool description
                                  const getToolDescription = (name: string) => {
                                    const descriptions: Record<string, string> = {
                                      'n8n': 'Workflow automation platform',
                                      'Guidde': 'Video documentation tool',
                                      'ManyChat': 'Chatbot automation',
                                      'Otter.ai': 'AI transcription service',
                                      'Upwork': 'Freelance talent platform',
                                      'Best Buy': 'Tech products & services',
                                      'NordVPN': 'VPN security service',
                                      'Aura': 'Digital security suite',
                                      'Bluehost': 'Web hosting service',
                                      'Shopify': 'E-commerce platform',
                                      'Envato': 'Digital assets marketplace',
                                      'Canva': 'Graphic design platform',
                                      'Buffer': 'Social media management',
                                      'Tailwind': 'Pinterest scheduling tool',
                                      'Descript': 'Video & audio editing',
                                      '11Labs': 'AI voice synthesis',
                                      'InVideo': 'Video creation platform',
                                      'HeyGen': 'AI video generation',
                                      'Play.ai': 'AI voice cloning',
                                      'Foundr': 'Business education',
                                      'Easyship': 'Shipping management',
                                      'Mint Mobile': 'Mobile phone service',
                                      'ChatGPTZero': 'AI content detection',
                                      'Genially': 'Interactive content',
                                      'Chicago Urban League': 'Community organization',
                                      'TGS The Gathering Spot': 'Community hub'
                                    };
                                    return descriptions[name] || 'Digital solution tool';
                                  };
                                  const category = getToolCategory(affiliate.name);
                                  const description = getToolDescription(affiliate.name);
                                  return (
                                    <a
                                      key={index}
                                      href={affiliate.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="group block"
                                    >
                                      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-gray-700 hover:border-[#00BFFF]/50 hover:shadow-lg hover:shadow-[#00BFFF]/20 transition-all duration-300 hover:scale-[1.02]">
                                        <div className="flex items-start gap-4">
                                          {/* Tool Icon */}
                                          <div className="flex-shrink-0">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                              <div className="text-2xl">{affiliate.icon}</div>
                                            </div>
                                          </div>
                                          
                                          {/* Tool Info */}
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                              <h4 className="font-medium text-white group-hover:text-[#00BFFF] transition-colors">
                                                {affiliate.name}
                                              </h4>
                                              <Badge 
                                                variant="outline" 
                                                className="text-xs border-gray-600 text-gray-400"
                                              >
                                                {category}
                                              </Badge>
                                            </div>
                                            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                              {description}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                              <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-[#00BFFF] transition-colors" />
                                              <span className="text-xs text-gray-500 group-hover:text-[#00BFFF] transition-colors">
                                                Visit tool
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </a>
                                  );
                                })}
                              </div>
                              
                              {/* Tools Summary */}
                              <div className="mt-4 p-3 bg-gray-800/30 rounded-lg border border-gray-700">
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                  <Check className="w-4 h-4 text-green-400" />
                                  <span>All tools are vetted partners with proven integration capabilities</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Expanded Information Section */}
                          <div>
                            <h3 className="text-lg font-semibold mb-4 text-white">Solution Details</h3>
                            
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium text-white mb-2">Overview</h4>
                                <p className="text-gray-400 text-sm">{i.expandedInfo.overview}</p>
                              </div>
                              
                              <div>
                                <h4 className="font-medium text-white mb-2">Key Features</h4>
                                <ul className="space-y-1">
                                  {i.expandedInfo.keyFeatures.map((feature, index) => (
                                    <li key={index} className="text-sm text-gray-400 flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 bg-[#00BFFF] rounded-full"></span>
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div>
                                <h4 className="font-medium text-white mb-2">Benefits</h4>
                                <ul className="space-y-1">
                                  {i.expandedInfo.benefits.map((benefit, index) => (
                                    <li key={index} className="text-sm text-gray-400 flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                      {benefit}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div>
                                <h4 className="font-medium text-white mb-2">Use Cases</h4>
                                <ul className="space-y-1">
                                  {i.expandedInfo.useCases.map((useCase, index) => (
                                    <li key={index} className="text-sm text-gray-400 flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                                      {useCase}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Pain Point and Pricing Info */}
                        <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Conditionally show pain point if item is not in cart and not recently removed */}
                            {!isInCart(i.id) && !isRecentlyRemoved(i.id) ? (
                              <div>
                                <h4 className="font-medium text-red-400 mb-1">Pain Point</h4>
                                <p className="text-sm text-gray-400">{i.painPoint}</p>
                              </div>
                            ) : isInCart(i.id) ? (
                              <div>
                                <h4 className="font-medium text-green-400 mb-1">Cart Status</h4>
                                <div className="flex items-center gap-2 text-sm text-green-400">
                                  <Check className="w-4 h-4" />
                                  <span>In cart - Click to remove</span>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <h4 className="font-medium text-gray-400 mb-1">Cart Status</h4>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                  <X className="w-4 h-4" />
                                  <span>Recently removed</span>
                                </div>
                              </div>
                            )}
                            <div>
                              <h4 className="font-medium text-white mb-1">Investment</h4>
                              <p className="text-lg font-bold bg-gradient-to-r from-[#00BFFF] to-[#8A2BE2] bg-clip-text text-transparent">
                                {currency(r.min)} – {currency(r.max)}
                              </p>
                              <p className="text-xs text-gray-500">Level {i.level} • {i.model === "starter" ? "Starter" : "Pro"}</p>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Solution Bundles */}
<Card className="bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border-gray-800">
  <CardHeader>
    <CardTitle className="text-2xl font-bold">
      Solution Bundles <span className="bg-gradient-to-r from-[#00BFFF] to-[#8A2BE2] bg-clip-text text-transparent">(save 20–30%)</span>
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid sm:grid-cols-2 gap-4">
      {/* Business Starter */}
      <div className="p-4 rounded-lg border border-gray-700 hover:border-[#00BFFF] transition-all duration-300 hover:shadow-lg hover:shadow-[#00BFFF]/20">
        <h4 className="font-medium text-white">Business Starter</h4>

        {/* One-time vs Monthly */}
        <div className="flex flex-wrap items-center gap-2 text-sm mt-1">
          <span className="text-gray-300">Website</span>
          <Badge variant="secondary" className="rounded px-2 py-0.5"
            style={{ backgroundColor:"#00BFFF20", color:"#00BFFF", borderColor:"#00BFFF50" }}>
            One-Time
          </Badge>

          <span className="text-gray-500">+</span>

          <span className="text-gray-300">Automation</span>
          <Badge variant="secondary" className="rounded px-2 py-0.5"
            style={{ backgroundColor:"#00BFFF20", color:"#00BFFF", borderColor:"#00BFFF50" }}>
            One-Time
          </Badge>

          <span className="text-gray-500">+</span>

          <span className="text-gray-300">Basic Security</span>
          <Badge variant="secondary" className="rounded px-2 py-0.5"
            style={{ backgroundColor:"#8A2BE220", color:"#8A2BE2", borderColor:"#8A2BE250" }}>
            Monthly
          </Badge>
        </div>

        <p className="text-sm font-medium bg-gradient-to-r from-[#00BFFF] to-[#8A2BE2] bg-clip-text text-transparent mt-2">
          Typical: {currency(1500)} – {currency(3200)}
        </p>
      </div>

      {/* Marketing Pro */}
      <div className="p-4 rounded-lg border border-gray-700 hover:border-[#8A2BE2] transition-all duration-300 hover:shadow-lg hover:shadow-[#8A2BE2]/20">
        <h4 className="font-medium text-white">Marketing Pro</h4>

        {/* One-time vs Monthly */}
        <div className="flex flex-wrap items-center gap-2 text-sm mt-1">
          <span className="text-gray-300">Branding</span>
          <Badge variant="secondary" className="rounded px-2 py-0.5"
            style={{ backgroundColor:"#00BFFF20", color:"#00BFFF", borderColor:"#00BFFF50" }}>
            One-Time
          </Badge>

          <span className="text-gray-500">+</span>

          <span className="text-gray-300">Social Media</span>
          <Badge variant="secondary" className="rounded px-2 py-0.5"
            style={{ backgroundColor:"#8A2BE220", color:"#8A2BE2", borderColor:"#8A2BE250" }}>
            Monthly
          </Badge>

          <span className="text-gray-500">+</span>

          <span className="text-gray-300">Email Marketing</span>
          <Badge variant="secondary" className="rounded px-2 py-0.5"
            style={{ backgroundColor:"#8A2BE220", color:"#8A2BE2", borderColor:"#8A2BE250" }}>
            Monthly
          </Badge>
        </div>

        <p className="text-sm font-medium bg-gradient-to-r from-[#00BFFF] to-[#8A2BE2] bg-clip-text text-transparent mt-2">
          Typical: {currency(2200)} – {currency(4500)}
        </p>
      </div>

      {/* Data Driven */}
      <div className="p-4 rounded-lg border border-gray-700 hover:border-[#9370DB] transition-all duration-300 hover:shadow-lg hover:shadow-[#9370DB]/20">
        <h4 className="font-medium text-white">Data Driven</h4>

        {/* One-time vs Monthly */}
        <div className="flex flex-wrap items-center gap-2 text-sm mt-1">
          <span className="text-gray-300">Analytics</span>
          <Badge variant="secondary" className="rounded px-2 py-0.5"
            style={{ backgroundColor:"#00BFFF20", color:"#00BFFF", borderColor:"#00BFFF50" }}>
            One-Time
          </Badge>

          <span className="text-gray-500">+</span>

          <span className="text-gray-300">Dashboard</span>
          <Badge variant="secondary" className="rounded px-2 py-0.5"
            style={{ backgroundColor:"#00BFFF20", color:"#00BFFF", borderColor:"#00BFFF50" }}>
            One-Time
          </Badge>

          <span className="text-gray-500">+</span>

          <span className="text-gray-300">Financial Tracking</span>
          <Badge variant="secondary" className="rounded px-2 py-0.5"
            style={{ backgroundColor:"#8A2BE220", color:"#8A2BE2", borderColor:"#8A2BE250" }}>
            Monthly
          </Badge>
        </div>

        <p className="text-sm font-medium bg-gradient-to-r from-[#00BFFF] to-[#8A2BE2] bg-clip-text text-transparent mt-2">
          Typical: {currency(2800)} – {currency(5800)}
        </p>
      </div>

      {/* Complete Solution */}
      <div className="p-4 rounded-lg border border-gray-700 hover:border-[#00FFFF] transition-all duration-300 hover:shadow-lg hover:shadow-[#00FFFF]/20">
        <h4 className="font-medium text-white">Complete Solution</h4>

        {/* One-time vs Monthly */}
        <div className="flex flex-wrap items-center gap-2 text-sm mt-1">
          <span className="text-gray-300">Full Suite Setup</span>
          <Badge variant="secondary" className="rounded px-2 py-0.5"
            style={{ backgroundColor:"#00BFFF20", color:"#00BFFF", borderColor:"#00BFFF50" }}>
            One-Time
          </Badge>

          <span className="text-gray-500">+</span>

          <span className="text-gray-300">Ongoing Support</span>
          <Badge variant="secondary" className="rounded px-2 py-0.5"
            style={{ backgroundColor:"#8A2BE220", color:"#8A2BE2", borderColor:"#8A2BE250" }}>
            Monthly
          </Badge>

          <span className="text-gray-500">+</span>

          <span className="text-gray-300">Training</span>
          <Badge variant="secondary" className="rounded px-2 py-0.5"
            style={{ backgroundColor:"#00BFFF20", color:"#00BFFF", borderColor:"#00BFFF50" }}>
            One-Time
          </Badge>
        </div>

        <p className="text-sm font-medium bg-gradient-to-r from-[#00BFFF] to-[#8A2BE2] bg-clip-text text-transparent mt-2">
          Typical: {currency(5000)} – {currency(12000)}
        </p>
      </div>
    </div>
  </CardContent>
</Card>
          
          {/* Pricing Info */}
          <Card className="bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">How We Price</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-[#00BFFF] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">
                    Scope & complexity determine final pricing (ranges shown are starting points)
                  </span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-[#8A2BE2] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">
                    Advanced integrations or custom development may adjust pricing
                  </span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-[#9370DB] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">
                    Nonprofits & youth programs qualify for community pricing
                  </span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-[#00FFFF] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">
                    Monthly services include ongoing support and maintenance
                  </span>
                </li>
              </ul>
              
              <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                <p className="text-sm text-gray-400">
                  Custom development and consulting:{" "}
                  <span className="font-medium bg-gradient-to-r from-[#00BFFF] to-[#8A2BE2] bg-clip-text text-transparent">
                    $95–$150/hr
                  </span>
                </p>
              </div>
              
              <Button className="w-full mt-6 bg-gradient-to-r from-[#00BFFF] to-[#8A2BE2] text-black font-semibold hover:shadow-lg hover:shadow-[#00BFFF]/40 transition-all duration-300 transform hover:scale-105">
                Request Custom Solution
              </Button>
            </CardContent>
          </Card>


        {/* One-time vs Monthly tags for the bundle */}
<div className="flex flex-wrap items-center gap-2 text-sm mt-1">
  <span className="text-gray-300">Branding</span>
  <Badge
    variant="secondary"
    className="rounded px-2 py-0.5"
    style={{
      backgroundColor: "#00BFFF20",  // One-Time (blue tint)
      color: "#00BFFF",
      borderColor: "#00BFFF50",
    }}
  >
    One-Time
  </Badge>

  <span className="text-gray-500">+</span>

  <span className="text-gray-300">Social Media</span>
  <Badge
    variant="secondary"
    className="rounded px-2 py-0.5"
    style={{
      backgroundColor: "#8A2BE220",  // Monthly (purple tint)
      color: "#8A2BE2",
      borderColor: "#8A2BE250",
    }}
  >
    Monthly
  </Badge>

  <span className="text-gray-500">+</span>

  <span className="text-gray-300">Email Marketing</span>
  <Badge
    variant="secondary"
    className="rounded px-2 py-0.5"
    style={{
      backgroundColor: "#8A2BE220",  // Monthly – change to blue if you mean setup-only
      color: "#8A2BE2",
      borderColor: "#8A2BE250",
    }}
  >
    Monthly
  </Badge>
</div>

        
        {/* Footer */}
        <footer className="text-center text-sm text-gray-400 py-8 border-t border-gray-800">
          © {new Date().getFullYear()} myCoder Foundation • Build smart. Build safely. Build together.
        </footer>
      </main>
    </div>
  );
}