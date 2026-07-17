import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  Linkedin,
  MapPin,
  Download,
  Moon,
  Sun,
  ArrowUpRight,
  Code2,
  Database,
  Terminal,
  Wrench,
  Sparkles,
  Briefcase,
  GraduationCap,
  Languages,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: CVPage,
});

const NAV = [
  { id: "moi", label: "Moi" },
  { id: "competences", label: "Compétences" },
  { id: "experiences", label: "Expériences" },
  { id: "diplomes", label: "Diplômes" },
  { id: "contact", label: "Contact" },
];

const SKILLS = [
  {
    icon: Code2,
    title: "Langages",
    groups: [
      { label: "Frontend", items: ["ReactJS", "TypeScript", "Angular", "HTML/CSS/JS"] },
      { label: "Backend", items: ["RPG free", "RPG 4", "CL", "ExpressJS", "Python"] },
      { label: "Mobile", items: ["Java", "Kotlin"] },
    ],
  },
  {
    icon: Terminal,
    title: "Systèmes d'exploitation",
    items: ["IBM i (AS400)", "Linux"],
  },
  {
    icon: Database,
    title: "Bases de données",
    items: ["IBM DB2", "MySQL", "SQL", "PostgreSQL", "NoSQL"],
  },
  {
    icon: Wrench,
    title: "DevOps & Outils",
    items: [
      "GitLab CI/CD",
      "Docker",
      "Jira",
      "Confluence",
      "Selenium",
      "ARCAD",
      "Cycle en V",
      "Agile",
    ],
  },
  {
    icon: Sparkles,
    title: "Savoir-faire",
    items: [
      "Maintenance applicative",
      "Analyse d'impact",
      "Support niveau 3",
      "Recherche d'incidents",
      "Analyse & documentation technique",
      "Création de fonctionnalités",
    ],
  },
];

const EXPERIENCES = [
  {
    role: "Développeur Full-stack",
    company: "Pro à Pro",
    period: "Septembre 2023 — Septembre 2026",
    bullets: [
      "Développement d'un outil d'automatisation (OCR) en RPG et Python pour le traitement des commandes clients, supprimant une part significative de la saisie manuelle dans le système legacy.",
      "Participation à la migration d'une application front-end PHP vers un framework moderne en React pour moderniser l'expérience utilisateur.",
      "Conception et maintenance d'applications web métier, de la conception à la mise en production (suivi du taux d'occupation des entrepôts).",
      "Mise en place de tests automatisés (Selenium) pour fiabiliser les déploiements et limiter les régressions.",
      "Travail collaboratif : génération de fichiers Excel et création de programmes RPG free appelant des classes Java.",
      "Gestion et optimisation de bases de données relationnelles (Visual Explain, SQL).",
      "Suivi de projet en méthodologie agile, cérémonies et coordination via Jira & Confluence.",
    ],
  },
  {
    role: "Stagiaire Développeur Web",
    company: "NTConseil",
    period: "Mai — Juin 2022 & Janvier — Février 2023",
    bullets: [
      "Conception et développement de sites web clients, de la maquette à la mise en ligne (WordPress / Elementor).",
      "Création de pages personnalisées répondant aux besoins spécifiques de chaque client.",
      "Maintenance et mise à jour de sites clients existants.",
    ],
  },
  {
    role: "Saisonnier",
    company: "GLEPA Tastet",
    period: "Été 2020, 2021 & 2022",
    bullets: ["Cueillette et éclaircissage des pommes, travail en équipe."],
  },
];

const DIPLOMAS = [
  {
    title: "Master Expert en Informatique et Système d'Information (EISI)",
    school: "EPSI — Toulouse",
    period: "Septembre 2024 — Septembre 2026",
  },
  {
    title: "Bachelor DevOps & Concepteur Développeur d'Application (CDA)",
    school: "EPSI — Toulouse",
    period: "Septembre 2023 — Septembre 2024",
  },
  {
    title: "DEV112 — Développement sur IBM i",
    school: "Volubis",
    period: "Janvier — Février 2024",
  },
  {
    title: "BTS Services Informatiques aux Organisations — option SLAM",
    school: "Lycée Elie Vinet — Barbezieux Saint-Hilaire",
    period: "Septembre 2021 — Juin 2023",
  },
];

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const stored = (localStorage.getItem("theme") as "light" | "dark" | null) ?? null;
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(stored ?? (prefers ? "dark" : "light"));
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}

function CVPage() {
  const { theme, toggle } = useTheme();
  const [active, setActive] = useState("moi");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Animated backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[720px] overflow-hidden">
        <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-primary/30 animated-blob" />
        <div className="absolute -top-10 right-[-6rem] h-[380px] w-[380px] rounded-full bg-accent/60 animated-blob" style={{ animationDelay: "-4s" }} />
        <div className="absolute top-40 left-1/3 h-[300px] w-[300px] rounded-full bg-primary-soft animated-blob" style={{ animationDelay: "-8s" }} />
        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--color-foreground) 1px, transparent 0)",
            backgroundSize: "22px 22px",
            maskImage: "linear-gradient(to bottom, black, transparent 80%)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent 80%)",
          }}
        />
      </div>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#moi" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-lg">
              M
            </span>
            <span className="hidden font-display text-lg sm:inline">
              Mathieu Gaisnon
            </span>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                  active === n.id
                    ? "bg-primary-soft text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <button
            onClick={toggle}
            aria-label="Changer le thème"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-6">
        {/* Moi */}
        <section id="moi" className="pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Disponible pour un CDI
              </span>
              <h1 className="mt-5 font-display text-5xl leading-tight md:text-7xl">
                Mathieu <span className="text-primary">Gaisnon</span>
              </h1>
              <p className="mt-3 text-lg text-muted-foreground md:text-xl">
                Développeur Full-Stack — Toulouse / Montauban
              </p>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/85">
                Actuellement en fin de Master EISI à l'EPSI de Toulouse, je termine
                ma dernière année en alternance après trois ans chez Pro à Pro.
                Habitué à jongler entre technologies modernes et systèmes legacy
                critiques, j'ai développé une vraie capacité d'adaptation et le sens
                du détail nécessaire quand l'erreur n'est pas permise.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Me contacter <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="/files/CV_Mathieu_Gaisnon.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                >
                  <Download className="h-4 w-4" /> Télécharger le CV
                </a>
              </div>
            </div>

            <aside className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-display text-xl">Coordonnées</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <ContactRow
                  icon={<Mail className="h-4 w-4" />}
                  href="mailto:mathieu.gaisnon@gmail.com"
                  label="mathieu.gaisnon@gmail.com"
                />
                <ContactRow
                  icon={<Phone className="h-4 w-4" />}
                  href="tel:+33771027898"
                  label="+33 7 71 02 78 98"
                />
                <ContactRow
                  icon={<Linkedin className="h-4 w-4" />}
                  href="https://www.linkedin.com/in/mathieu-gaisnon"
                  label="linkedin.com/in/mathieu-gaisnon"
                  external
                />
                <ContactRow
                  icon={<MapPin className="h-4 w-4" />}
                  label="Toulouse · Montauban"
                />
              </ul>
              <div className="mt-5 border-t border-border pt-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Languages className="h-3.5 w-3.5" />
                  <span>Français · Anglais B2 · Espagnol B1</span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Compétences */}
        <Section
          id="competences"
          eyebrow="02"
          title="Mes compétences"
          subtitle="Les technos, systèmes et savoir-faire que j'utilise au quotidien."
        >
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SKILLS.map((s) => (
              <div
                key={s.title}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-xl">{s.title}</h3>
                </div>

                {"groups" in s && s.groups ? (
                  <div className="mt-5 space-y-4">
                    {s.groups.map((g) => (
                      <div key={g.label}>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {g.label}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {g.items.map((i) => (
                            <Tag key={i}>{i}</Tag>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {s.items?.map((i) => <Tag key={i}>{i}</Tag>)}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-border bg-card/40 p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Savoir-être
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {[
                "Autonome",
                "Adaptabilité",
                "Rigueur",
                "Résolution de problèmes",
                "Travail d'équipe",
                "Curieux",
              ].map((i) => (
                <Tag key={i}>{i}</Tag>
              ))}
            </div>
          </div>
        </Section>

        {/* Expériences */}
        <Section
          id="experiences"
          eyebrow="03"
          title="Mes expériences"
          subtitle="Trois années d'alternance et de stages entre le legacy et le web moderne."
        >
          <ol className="relative space-y-8 border-l border-border pl-6 md:pl-10">
            {EXPERIENCES.map((e) => (
              <li key={e.role + e.company} className="relative">
                <span className="absolute -left-[33px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-primary bg-background md:-left-[45px]">
                  <Briefcase className="h-2.5 w-2.5 text-primary" />
                </span>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl">{e.role}</h3>
                    <span className="text-xs text-muted-foreground">{e.period}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-primary">{e.company}</p>
                  <ul className="mt-4 space-y-2 text-sm text-foreground/85">
                    {e.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* Diplômes */}
        <Section
          id="diplomes"
          eyebrow="04"
          title="Mes diplômes"
          subtitle="Formation initiale et certifications."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {DIPLOMAS.map((d) => (
              <div
                key={d.title}
                className="flex gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg leading-snug">{d.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d.school}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{d.period}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Contact */}
        <Section
          id="contact"
          eyebrow="05"
          title="On échange ?"
          subtitle="À la recherche d'un CDI de développeur full-stack ou analyste programmeur."
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <ContactCard
              icon={<Mail className="h-5 w-5" />}
              label="Email"
              value="mathieu.gaisnon@gmail.com"
              href="mailto:mathieu.gaisnon@gmail.com"
            />
            <ContactCard
              icon={<Phone className="h-5 w-5" />}
              label="Téléphone"
              value="+33 7 71 02 78 98"
              href="tel:+33771027898"
            />
            <ContactCard
              icon={<Linkedin className="h-5 w-5" />}
              label="LinkedIn"
              value="mathieu-gaisnon"
              href="https://www.linkedin.com/in/mathieu-gaisnon"
              external
            />
            <ContactCard
              icon={<Download className="h-5 w-5" />}
              label="CV en PDF"
              value="Télécharger"
              href="/files/CV_Mathieu_Gaisnon.pdf"
              download
            />
          </div>
        </Section>

        <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Mathieu Gaisnon — Fait avec React.
        </footer>
      </main>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-16 md:py-24">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="font-mono text-xs tracking-widest text-primary">{eyebrow}</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">{title}</h2>
          {subtitle && (
            <p className="mt-2 max-w-2xl text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-1 text-xs text-foreground/85">
      {children}
    </span>
  );
}

function ContactRow({
  icon,
  href,
  label,
  external,
}: {
  icon: React.ReactNode;
  href?: string;
  label: string;
  external?: boolean;
}) {
  const content = (
    <span className="flex items-center gap-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-primary">
        {icon}
      </span>
      <span className="truncate">{label}</span>
    </span>
  );
  if (!href) return <li>{content}</li>;
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="group flex items-center justify-between rounded-lg text-foreground/90 transition-colors hover:text-primary"
      >
        {content}
        <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
      </a>
    </li>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
  external,
  download,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      download={download}
      className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
        {icon}
      </span>
      <div className="mt-6">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 flex items-center gap-1 font-display text-lg text-foreground">
          {value}
          <ArrowUpRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </p>
      </div>
    </a>
  );
}
