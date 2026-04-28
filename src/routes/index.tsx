import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Droplets,
  Shield,
  Wrench,
  CheckCircle2,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import heroHouse from "@/assets/hero-house.jpg";
import beforeAfter from "@/assets/before-after-1.jpg";
import gutterGuard from "@/assets/gutter-guard.jpg";
import downspout from "@/assets/downspout.jpg";
import cleaning from "@/assets/cleaning.jpg";
import { QuoteForm } from "@/components/QuoteForm";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Allawy Solutions | Expert Gutter Services in Toronto & GTA" },
      {
        name: "description",
        content:
          "Professional gutter cleaning, sealing, guard installation and downspout repair across Toronto and the GTA. Protect your home — request a free quote today.",
      },
      { property: "og:title", content: "Allawy Solutions — Toronto Gutter Specialists" },
      {
        property: "og:description",
        content:
          "Precision gutter cleaning, sealing, and premium guard installation across Toronto & GTA.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

const WHATSAPP_URL = "https://wa.me/16475693231";
const PHONE_DISPLAY = "+1 (647) 569-3231";
const EMAIL = "allawysolutions@gmail.com";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 21.785h-.003a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zM20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.358.101 11.94c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.733 1.46h.005c6.581 0 11.940-5.358 11.943-11.94 0-3.193-1.243-6.196-3.466-8.417z" />
    </svg>
  );
}

function Index() {
  const services = [
    {
      icon: Droplets,
      title: "Cleaning, Sealing & Reinforcing",
      description:
        "Thorough debris removal paired with professional sealing and reinforcement to prevent leaks and protect structural integrity.",
      points: ["Leak prevention", "Joint sealing", "Bracket reinforcement"],
    },
    {
      icon: Shield,
      title: "Gutter Protection Installation",
      description:
        "Premium guard solutions engineered to eliminate buildup, reduce maintenance, and extend the life of your gutters.",
      points: ["Lifetime performance", "Debris-free flow"],
    },
    {
      icon: Wrench,
      title: "Downspouts Repair & Installation",
      description:
        "Expertly installed downspouts that divert water away from your foundation — protecting basements and landscaping year-round.",
      points: ["Foundation safety", "Proper diversion", "Seamless install"],
    },
  ];

  const gallery = [
    { src: beforeAfter, title: "Before & After Cleaning", caption: "Clogged to flowing in one visit" },
    { src: gutterGuard, title: "Premium Guard Install", caption: "Mesh protection on grey siding" },
    { src: downspout, title: "Downspout Replacement", caption: "Clean diversion away from brick foundation" },
    { src: cleaning, title: "Professional Service", caption: "Insured technicians, every job" },
  ];

  const areas = [
    "Toronto", "North York", "Scarborough", "Etobicoke", "Mississauga",
    "Brampton", "Vaughan", "Markham", "Richmond Hill", "Oakville", "Burlington", "Pickering",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      {/* Header */}
      <header className="fixed top-4 inset-x-0 z-40 px-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between rounded-full bg-background/85 backdrop-blur-md border border-border shadow-card" style={{ boxShadow: "var(--shadow-card)" }}>
          <a href="#top" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
              A
            </div>
            <div className="leading-tight">
              <div className="font-bold text-foreground">Allawy Solutions</div>
              <div className="text-[11px] text-muted-foreground hidden sm:block">Toronto & GTA Gutter Experts</div>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-secondary">
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#gallery" className="hover:text-primary transition-colors">Gallery</a>
            <a href="#areas" className="hover:text-primary transition-colors">Service Area</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </nav>
          <a href={`tel:+16475693231`} className="hidden sm:inline-flex">
            <Button size="sm" variant="outline" className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground">
              <Phone className="h-4 w-4" /> Call Now
            </Button>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroHouse}
            alt="Modern Canadian detached home with freshly cleaned gutters"
            width={1920}
            height={1280}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)", opacity: 0.88 }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 lg:py-44">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-semibold text-white border border-white/20 mb-6">
              <Sparkles className="h-3.5 w-3.5" /> Trusted across Toronto & the GTA
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight">
              Expert Gutter Solutions for Toronto Homeowners.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/85 max-w-2xl leading-relaxed">
              Protecting your home with precision cleaning, sealing, and premium guard installations.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a href="#contact">
                <Button size="lg" className="h-14 px-8 text-base font-semibold bg-white text-primary hover:bg-white/90 shadow-elegant w-full sm:w-auto" style={{ boxShadow: "var(--shadow-elegant)" }}>
                  Request a Quote <ArrowRight className="h-5 w-5" />
                </Button>
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="h-14 px-8 text-base font-semibold bg-transparent border-white/40 text-white hover:bg-white/10 w-full sm:w-auto">
                  <WhatsAppIcon className="h-5 w-5" /> Chat on WhatsApp
                </Button>
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/85">
              {["Fully insured", "Free estimates", "Same-week service"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-white" /> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-sm font-semibold uppercase tracking-wider text-primary">Our Core Services</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Complete gutter care, done right
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Three specialised services that keep water moving away from your home — the way it should.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <article
                key={s.title}
                className="group relative bg-card rounded-2xl p-8 border border-border transition-all hover:-translate-y-1"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="h-14 w-14 rounded-xl flex items-center justify-center text-primary-foreground mb-6" style={{ background: "var(--gradient-cta)" }}>
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{s.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{s.description}</p>
                <ul className="mt-6 space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-secondary font-medium">
                      <CheckCircle2 className="h-4 w-4 text-primary" /> {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 md:py-28 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-sm font-semibold uppercase tracking-wider text-primary">Before & After</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Real results on real Toronto homes
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Detached brick and siding houses across the GTA — restored, protected, and ready for every season.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {gallery.map((g) => (
              <figure
                key={g.title}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={g.src}
                    alt={g.title}
                    loading="lazy"
                    width={1280}
                    height={896}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="p-5 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-foreground">{g.title}</div>
                    <div className="text-sm text-muted-foreground">{g.caption}</div>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Sparkles className="h-5 w-5" />
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section id="areas" className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-primary">Service Area</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Proudly serving Toronto & the entire GTA
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              From the lakeshore to the 905, our crews cover every corner of the Greater Toronto Area.
              Same-week scheduling and on-time arrivals — guaranteed.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {areas.map((a) => (
                <span
                  key={a}
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground px-4 py-2 text-sm font-medium"
                >
                  <MapPin className="h-3.5 w-3.5" /> {a}
                </span>
              ))}
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden border border-border" style={{ boxShadow: "var(--shadow-elegant)" }}>
            <div className="aspect-[4/3] relative" style={{ background: "var(--gradient-hero)" }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-primary-foreground p-8">
                  <MapPin className="h-16 w-16 mx-auto mb-4 opacity-80" />
                  <div className="text-3xl font-bold">Toronto & GTA</div>
                  <div className="mt-2 text-primary-foreground/80">Coverage radius 60+ km</div>
                </div>
              </div>
              <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/10" />
              <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-white/5" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Quote Form */}
      <section id="contact" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Get your free quote today
            </h2>
            <p className="mt-5 text-lg md:text-xl text-white/85 max-w-2xl mx-auto">
              Tell us about your home — we'll respond within 24 hours with honest pricing and a clear scope of work.
            </p>
          </div>

          <div className="mt-10">
            <QuoteForm />
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/90">
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="h-5 w-5" /> {EMAIL}
            </a>
            <span className="hidden sm:block text-white/30">•</span>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <WhatsAppIcon className="h-5 w-5" /> WhatsApp
            </a>
            <span className="hidden sm:block text-white/30">•</span>
            <a href="tel:+16475693231" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="h-5 w-5" /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-white/10 flex items-center justify-center font-bold">A</div>
            <span className="font-semibold">Allawy Solutions</span>
            <span className="text-white/60">— Toronto & GTA</span>
          </div>
          <div className="text-white/70">© {new Date().getFullYear()} Allawy Solutions. All rights reserved.</div>
        </div>
      </footer>

      {/* Sticky mobile call/whatsapp bar */}
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-background/95 backdrop-blur border-t border-border p-3 grid grid-cols-2 gap-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <a href="tel:+16475693231">
          <Button className="w-full h-12 font-semibold bg-primary text-primary-foreground hover:bg-primary-deep">
            <Phone className="h-5 w-5" /> Call
          </Button>
        </a>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <Button className="w-full h-12 font-semibold bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90">
            <WhatsAppIcon className="h-5 w-5" /> WhatsApp
          </Button>
        </a>
      </div>

      {/* Floating WhatsApp button (desktop) */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="hidden md:flex fixed bottom-6 right-6 z-50 h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground hover:scale-110 transition-transform"
        style={{ boxShadow: "var(--shadow-elegant)" }}
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </div>
  );
}
