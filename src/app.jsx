import { useState, useEffect, useRef } from "react";

const ACCESS_CODE = "18SEP1954";

const MEMBERS = [
    { name: "Mahendra", role: "President", initials: "MA", color: "#4F46E5" },
    { name: "Sathwik", role: "Secretary", initials: "SA", color: "#1dd077" },
    { name: "Snehitha", role: "Secretary(Jt.)", initials: "SN", color: "#5dd5ed" },
    { name: "Raisy", role: "Treasurer", initials: "RA", color: "#D97706" },
    { name: "Prasanth", role: "Prayer Secretary", initials: "PR", color: "#DC2626" },
    { name: "Karunya Keerthi", role: "Mission& Outreach Secretary", initials: "KK", color: "#7C3AED" },
];

const POEMS = [
    { title: "His Grace", author: "Pankaj james", preview: "In the valley of shadows, Your light leads the way / Every morning new mercies arrive with the day...", likes: 24 },
    { title: "Anchor of Hope", author: "David A", preview: "When storms arise and waves grow tall / You are the anchor that holds through it all...", likes: 18 },
    { title: "Still Waters", author: "Rishi K", preview: "Beside still waters my soul finds rest / In Your presence alone I am truly blessed...", likes: 31 },
];

const PAST_MEETINGS = [
    { title: "Finding God's will ", date: "May 16, 2026", desc: "Summer general meeting covering God's will and Word of God led by Bro. Ranganadham, Vizag .", thumb: "🎬", duration: "1h 12m" },
    { title: "Stewardship of time and Balancing Ministry& Academics", date: "May 23, 2026", desc: "Full video recap of the online session held on Zoom. Testimonies, worship sessions and the Word.", thumb: "⛺", duration: "2h 34m" },
    { title: "Art of Living", date: "May 30, 2026", desc: "CP Thomas uncle from Dumka Share the art of living in our lives", thumb: "📋", duration: "1h 55m" },
];

const GALLERY = {
    Camps: [
        { label: "DTC 2025", emoji: "🌄" },
        { label: "EV Retreat 2024", emoji: "⛺" },
        { label: "Mission Camp 2023", emoji: "🏕️" },
    ],
    Birthdays: [
        { label: "Nissy Grace's 20th", emoji: "🎂" },
        { label: "Simon's Surprise", emoji: "🎉" },
        { label: "Neelima's Birthday", emoji: "🥳" },
    ],
    "Special Occasions": [
        { label: "New Year Service", emoji: "✨" },
        { label: "Thanksgiving 2023", emoji: "🙏" },
        { label: "Pre-christmas Night", emoji: "🎄" },
    ],
};

const SECTIONS = [
    { id: "Prayer Line", icon: "🙏", label: "Prayer Line", color: "#7C3AED", bg: "#f5f3ff", desc: "Submit requests & read this month's prayer letter", stat: "24 prayers answered" },
    { id: "Treasury", icon: "💰", label: "Treasury", color: "#059669", bg: "#f0fdf4", desc: "Contribute offerings & track monthly finances", stat: "₦10,500 raised" },
    { id: "Literature", icon: "📖", label: "Literature", color: "#D97706", bg: "#fffbeb", desc: "Read poems, stories & share your own writing", stat: "3 new pieces" },
    { id: "Photo Gallery", icon: "📸", label: "Photo Gallery", color: "#0891B2", bg: "#f0f9ff", desc: "Browse photos from camps, birthdays & occasions", stat: "9 albums" },
    { id: "Past Meetings", icon: "🎬", label: "Past Meetings", color: "#DC2626", bg: "#fef2f2", desc: "Watch recordings of past fellowship meetings", stat: "3 recordings" },
    { id: "Members", icon: "👥", label: "Members", color: "#4F46E5", bg: "#eef2ff", desc: "Meet the committee and their roles", stat: "6 leaders" },
];

const TABS = ["Home", "Prayer Line", "Treasury", "Literature", "Photo Gallery", "Past Meetings", "Members"];

const FLOATERS = [
    { emoji: "✝️", top: "12%", left: "8%", size: "2rem", delay: "0s", dur: "6s" },
    { emoji: "🕊️", top: "25%", right: "6%", size: "1.8rem", delay: "1s", dur: "7s" },
    { emoji: "⭐", top: "60%", left: "4%", size: "1.4rem", delay: "2s", dur: "5s" },
    { emoji: "🌿", top: "75%", right: "8%", size: "1.6rem", delay: "0.5s", dur: "8s" },
    { emoji: "✨", top: "45%", left: "92%", size: "1.2rem", delay: "1.5s", dur: "6.5s" },
    { emoji: "🙏", top: "85%", left: "15%", size: "1.5rem", delay: "3s", dur: "7s" },
];

function useInView(ref) {
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return inView;
}

function AnimCard({ children, delay = 0 }) {
    const ref = useRef(null);
    const inView = useInView(ref);
    return (
        <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: `all 0.65s cubic-bezier(.22,1,.36,1) ${delay}ms` }}>
            {children}
        </div>
    );
}

function CountUp({ end, suffix = "" }) {
    const [val, setVal] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref);
    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const step = Math.ceil(end / 60);
        const timer = setInterval(() => {
            start = Math.min(start + step, end);
            setVal(start);
            if (start >= end) clearInterval(timer);
        }, 20);
        return () => clearInterval(timer);
    }, [inView, end]);
    return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

export default function App() {
    const [unlocked, setUnlocked] = useState(false);
    const [inputCode, setInputCode] = useState("");
    const [codeError, setCodeError] = useState(false);
    const [activeTab, setActiveTab] = useState("Home");
    const [galleryTab, setGalleryTab] = useState("Camps");
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([
        { name: "Joel Junias", text: "Blessed to be part of this fellowship 🙏", time: "2h ago" },
    ]);
    const [commentName, setCommentName] = useState("");
    const [prayerMode, setPrayerMode] = useState(null);
    const [treasuryMode, setTreasuryMode] = useState(null);
    const [writeMode, setWriteMode] = useState(false);
    const [prayerText, setPrayerText] = useState("");
    const [prayerSubmitted, setPrayerSubmitted] = useState(false);
    const [writeText, setWriteText] = useState("");
    const [writeTitle, setWriteTitle] = useState("");
    const [writeSubmitted, setWriteSubmitted] = useState(false);
    const [contributions, setContributions] = useState([
        { name: "Anonymous", amount: 2000, date: "Jun 3" },
        { name: "G. Unknown", amount: 5000, date: "Jun 1" },
        { name: "Idontknow", amount: 3500, date: "May 28" },
    ]);
    const [contribName, setContribName] = useState("");
    const [contribAmount, setContribAmount] = useState("");
    const [contribDone, setContribDone] = useState(false);
    const [heroLoaded, setHeroLoaded] = useState(false);

    useEffect(() => { if (unlocked) setTimeout(() => setHeroLoaded(true), 80); }, [unlocked]);

    const handleUnlock = () => {
        if (inputCode.trim().toUpperCase() === ACCESS_CODE) { setUnlocked(true); setCodeError(false); }
        else setCodeError(true);
    };

    const submitComment = () => {
        if (comment.trim()) {
            setComments([{ name: commentName.trim() || "Anonymous", text: comment.trim(), time: "Just now" }, ...comments]);
            setComment(""); setCommentName("");
        }
    };

    const submitPrayer = () => { if (prayerText.trim()) setPrayerSubmitted(true); };
    const submitWrite = () => { if (writeText.trim() && writeTitle.trim()) setWriteSubmitted(true); };
    const submitContrib = () => {
        if (contribAmount && Number(contribAmount) > 0) {
            setContributions([{ name: contribName.trim() || "Anonymous", amount: Number(contribAmount), date: "Today" }, ...contributions]);
            setContribDone(true);
        }
    };
    const totalContrib = contributions.reduce((s, c) => s + c.amount, 0);

    const goToTab = (label) => {
        setActiveTab(label);
        setPrayerMode(null); setTreasuryMode(null); setWriteMode(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const CSS = `
    @keyframes floatUp { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-16px) rotate(5deg)} }
    @keyframes heroReveal { from{opacity:0;transform:scale(0.96) translateY(28px)} to{opacity:1;transform:scale(1) translateY(0)} }
    @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    @keyframes orb1 { 0%,100%{transform:translate(0,0)} 33%{transform:translate(30px,-25px)} 66%{transform:translate(-20px,18px)} }
    @keyframes orb2 { 0%,100%{transform:translate(0,0)} 33%{transform:translate(-25px,25px)} 66%{transform:translate(20px,-15px)} }
    @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
    @keyframes waveLetter { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes pulse { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.06)} }
    .scard:hover { transform:translateY(-8px) scale(1.02) !important; box-shadow:0 24px 48px rgba(0,0,0,0.13) !important; }
    .mcard:hover { transform:translateY(-5px) !important; box-shadow:0 12px 30px rgba(0,0,0,0.1) !important; }
    .ctabtn:hover { transform:scale(1.05) !important; }
    .nbtn:hover { background:rgba(255,255,255,0.15) !important; }
  `;

    // ── LOCK SCREEN ──────────────────────────────────────────
    if (!unlocked) {
        return (
            <div style={{ minHeight: "100vh", background: "#0a0818", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: "Georgia, serif", position: "relative", overflow: "hidden" }}>
                <style>{CSS}</style>
                <div style={{ position: "absolute", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,0.2) 0%,transparent 70%)", top: "-200px", left: "-200px", animation: "orb1 14s ease-in-out infinite" }} />
                <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(167,139,250,0.15) 0%,transparent 70%)", bottom: "-150px", right: "-100px", animation: "orb2 18s ease-in-out infinite" }} />
                {["✝️", "🕊️", "⭐", "🌿", "🙏", "✨", "💫", "🌟"].map((e, i) => (
                    <div key={i} style={{ position: "absolute", fontSize: `${1.1 + (i % 3) * 0.25}rem`, opacity: 0.15, animation: `floatUp ${5 + i * 0.8}s ease-in-out infinite ${i * 0.6}s`, top: `${8 + i * 11}%`, left: i % 2 === 0 ? `${4 + i * 2}%` : "auto", right: i % 2 !== 0 ? `${4 + i * 2}%` : "auto", pointerEvents: "none" }}>{e}</div>
                ))}
                <div style={{ position: "relative", zIndex: 2, background: "rgba(255,255,255,0.04)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "28px", padding: "3.5rem 3rem", maxWidth: "440px", width: "100%", textAlign: "center", animation: "fadeUp 0.8s ease forwards" }}>
                    <div style={{ width: "80px", height: "80px", borderRadius: "24px", background: "linear-gradient(135deg,#4f46e5,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.2rem", margin: "0 auto 1.5rem", boxShadow: "0 0 50px rgba(99,102,241,0.6)", animation: "pulse 3s ease-in-out infinite" }}>✝️</div>
                    <h1 style={{ background: "linear-gradient(135deg,#c4b5fd,#a5b4fc,#f9a8d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontSize: "2.2rem", fontWeight: "800", margin: "0 0 0.25rem", letterSpacing: "-0.01em" }}>Dhanbad EU</h1>
                    <p style={{ color: "rgba(165,180,252,0.55)", fontSize: "0.72rem", margin: "0 0 0.75rem", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "sans-serif" }}>Private Member Portal</p>
                    <div style={{ width: "50px", height: "1px", background: "rgba(165,180,252,0.2)", margin: "0 auto 1.5rem" }} />
                    <p style={{ color: "rgba(165,180,252,0.65)", fontSize: "0.88rem", margin: "0 0 2rem", fontStyle: "italic", lineHeight: "1.7" }}>A sacred, private space.<br />Enter your access code to continue.</p>
                    <div style={{ background: "rgba(255,255,255,0.05)", border: codeError ? "1px solid rgba(248,113,113,0.5)" : "1px solid rgba(255,255,255,0.12)", borderRadius: "16px", padding: "0.8rem 1.25rem", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <span style={{ opacity: 0.6, fontSize: "1.1rem" }}>🔒</span>
                        <input type="password" placeholder="Enter access code" value={inputCode}
                            onChange={e => { setInputCode(e.target.value); setCodeError(false); }}
                            onKeyDown={e => e.key === "Enter" && handleUnlock()}
                            style={{ background: "transparent", border: "none", outline: "none", color: "#e0e7ff", width: "100%", fontSize: "1rem", letterSpacing: "0.14em", fontFamily: "monospace" }} />
                    </div>
                    {codeError && <p style={{ color: "#f87171", fontSize: "0.8rem", margin: "0 0 0.75rem", animation: "fadeUp 0.3s ease" }}>⚠ Incorrect code. Please try again.</p>}
                    <button onClick={handleUnlock} className="ctabtn" style={{ width: "100%", padding: "1rem", background: "linear-gradient(135deg,#4f46e5,#7c3aed)", color: "white", border: "none", borderRadius: "16px", fontSize: "1rem", fontWeight: "700", cursor: "pointer", letterSpacing: "0.04em", transition: "transform 0.2s" }}>
                        Enter the Portal →
                    </button>
                    <p style={{ color: "rgba(99,102,241,0.45)", fontSize: "0.7rem", marginTop: "1.5rem", fontFamily: "sans-serif" }}>Hint: Birthday of UESI</p>
                </div>
            </div>
        );
    }

    // ── HEADER ───────────────────────────────────────────────
    return (
        <div style={{ minHeight: "100vh", background: "#f8f7ff", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
            <style>{CSS}</style>

            <header style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(10,8,24,0.96)", backdropFilter: "blur(14px)", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "58px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", cursor: "pointer" }} onClick={() => goToTab("Home")}>
                    <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: "linear-gradient(135deg,#4f46e5,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>✝️</div>
                    <div>
                        <p style={{ color: "white", margin: 0, fontSize: "0.9rem", fontWeight: "700" }}>Dhanbad EU's</p>
                        <p style={{ color: "#6366f1", margin: 0, fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Private Portal</p>
                    </div>
                </div>
                <nav style={{ display: "flex", gap: "0.1rem" }}>
                    {TABS.map(t => (
                        <button key={t} className="nbtn" onClick={() => goToTab(t)} style={{ padding: "0.4rem 0.8rem", background: activeTab === t ? "rgba(99,102,241,0.22)" : "transparent", color: activeTab === t ? "#a5b4fc" : "rgba(255,255,255,0.5)", border: activeTab === t ? "1px solid rgba(99,102,241,0.35)" : "1px solid transparent", borderRadius: "8px", cursor: "pointer", fontSize: "0.76rem", fontWeight: activeTab === t ? "600" : "400", transition: "all 0.2s", whiteSpace: "nowrap" }}>{t}</button>
                    ))}
                </nav>
                <button onClick={() => setUnlocked(false)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", borderRadius: "8px", padding: "0.35rem 0.9rem", cursor: "pointer", fontSize: "0.72rem" }}>🔒 Lock</button>
            </header>

            {/* ─────────────────── HOME ──────────────────────────── */}
            {activeTab === "Home" && (
                <div>
                    {/* HERO */}
                    <section style={{ position: "relative", minHeight: "94vh", background: "linear-gradient(160deg,#0a0818 0%,#1a1545 45%,#2a1857 100%)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "5rem 2rem 6rem" }}>
                        <div style={{ position: "absolute", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle,rgba(79,70,229,0.18) 0%,transparent 65%)", top: "-180px", left: "-180px", animation: "orb1 15s ease-in-out infinite" }} />
                        <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.14) 0%,transparent 65%)", bottom: "-120px", right: "-120px", animation: "orb2 18s ease-in-out infinite" }} />
                        <div style={{ position: "absolute", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle,rgba(196,181,253,0.08) 0%,transparent 70%)", top: "40%", left: "62%", animation: "orb1 12s ease-in-out infinite 4s" }} />

                        {FLOATERS.map((f, i) => (
                            <div key={i} style={{ position: "absolute", fontSize: f.size, top: f.top, left: f.left, right: f.right, opacity: 0.18, animation: `floatUp ${f.dur} ease-in-out infinite ${f.delay}`, pointerEvents: "none" }}>{f.emoji}</div>
                        ))}

                        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: "800px", animation: heroLoaded ? "heroReveal 1s cubic-bezier(.22,1,.36,1) forwards" : "none", opacity: heroLoaded ? 1 : 0 }}>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "rgba(99,102,241,0.18)", border: "1px solid rgba(99,102,241,0.35)", borderRadius: "50px", padding: "0.45rem 1.4rem", marginBottom: "2.5rem" }}>
                                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#818cf8", display: "inline-block", boxShadow: "0 0 10px #818cf8", animation: "pulse 2s infinite" }} />
                                <span style={{ color: "#a5b4fc", fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "sans-serif", fontWeight: "600" }}>Members Only · Dhanbad EU</span>
                            </div>

                            <h1 style={{ color: "white", fontSize: "4.5rem", fontWeight: "800", margin: "0 0 0.4rem", lineHeight: 1.1, letterSpacing: "-0.025em", fontFamily: "Georgia, serif" }}>
                                Welcome Home,
                            </h1>
                            <h1 style={{ fontSize: "4.5rem", fontWeight: "800", margin: "0 0 1.5rem", lineHeight: 1.1, letterSpacing: "-0.025em", fontFamily: "Georgia, serif", background: "linear-gradient(135deg,#a5b4fc 0%,#c4b5fd 40%,#f9a8d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                                The Fellowship
                            </h1>

                            <p style={{ color: "rgba(165,180,252,0.75)", fontSize: "1.15rem", margin: "0 auto 3rem", maxWidth: "540px", lineHeight: "1.75", fontFamily: "sans-serif" }}>
                                A private, sacred space where we pray, celebrate, grow, and hold each other up — together in faith.
                            </p>

                            <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
                                {[{ label: "Members", val: 120, suffix: "+" }, { label: "Years Together", val: 6, suffix: "" }, { label: "Prayers Answered", val: 100, suffix: "+" }].map((s, i) => (
                                    <div key={i} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "18px", padding: "1.1rem 2rem", textAlign: "center", animation: `fadeUp 0.7s ${0.4 + i * 0.15}s ease both` }}>
                                        <p style={{ color: "white", fontWeight: "800", fontSize: "1.8rem", margin: "0 0 0.2rem", fontFamily: "Georgia, serif" }}><CountUp end={s.val} suffix={s.suffix} /></p>
                                        <p style={{ color: "rgba(165,180,252,0.6)", fontSize: "0.72rem", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "sans-serif" }}>{s.label}</p>
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                                <button className="ctabtn" onClick={() => goToTab("Prayer Line")} style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)", color: "white", border: "none", borderRadius: "16px", padding: "1.1rem 2.75rem", fontSize: "1.05rem", fontWeight: "700", cursor: "pointer", transition: "transform 0.2s", letterSpacing: "0.02em" }}>🙏 Prayer Line</button>
                                <button className="ctabtn" onClick={() => goToTab("Treasury")} style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "16px", padding: "1.1rem 2.75rem", fontSize: "1.05rem", fontWeight: "700", cursor: "pointer", transition: "transform 0.2s" }}>💰 Give Now</button>
                            </div>
                        </div>

                        {/* Wave bottom */}
                        <svg style={{ position: "absolute", bottom: 0, left: 0, width: "100%", overflow: "hidden" }} viewBox="0 0 1440 70" preserveAspectRatio="none" height="70">
                            <path d="M0,20 C360,70 1080,70 1440,20 L1440,70 L0,70 Z" fill="#f8f7ff" />
                        </svg>
                    </section>

                    {/* TICKER */}
                    <div style={{ background: "#1e1b4b", padding: "0.7rem 0", overflow: "hidden", whiteSpace: "nowrap" }}>
                        <div style={{ display: "inline-block", animation: "ticker 24s linear infinite" }}>
                            {Array(2).fill(["🙏 Pray without ceasing", "✝️ Faith over fear", "🕊️ Grace upon grace", "⭐ New mercies every morning", "🌿 Rooted in love", "✨ Together in faith", "💫 His grace is sufficient"]).flat().map((t, i) => (
                                <span key={i} style={{ color: "rgba(165,180,252,0.65)", fontSize: "0.75rem", letterSpacing: "0.07em", textTransform: "uppercase", margin: "0 2.75rem", fontFamily: "sans-serif" }}>{t}</span>
                            ))}
                        </div>
                    </div>

                    {/* SECTION CARDS */}
                    <section style={{ maxWidth: "980px", margin: "0 auto", padding: "6rem 1.5rem 2rem" }}>
                        <AnimCard>
                            <p style={{ color: "#6366f1", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: "700", margin: "0 0 0.5rem", fontFamily: "sans-serif" }}>Everything in one place</p>
                            <h2 style={{ color: "#1e1b4b", fontSize: "2.4rem", fontWeight: "800", margin: "0 0 0.5rem", fontFamily: "Georgia, serif" }}>Explore the Portal</h2>
                            <p style={{ color: "#6b7280", margin: "0 0 3.5rem", fontSize: "1rem", maxWidth: "420px" }}>Six sections, all built for your fellowship family.</p>
                        </AnimCard>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
                            {SECTIONS.map((s, i) => (
                                <AnimCard key={s.id} delay={i * 75}>
                                    <div className="scard" onClick={() => goToTab(s.id)} style={{ background: "white", borderRadius: "22px", padding: "2rem 1.75rem", cursor: "pointer", border: `1.5px solid ${s.color}15`, transition: "all 0.3s cubic-bezier(.22,1,.36,1)", position: "relative", overflow: "hidden" }}>
                                        <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "110px", height: "110px", borderRadius: "50%", background: s.bg, opacity: 0.7 }} />
                                        <div style={{ width: "56px", height: "56px", borderRadius: "18px", background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.7rem", marginBottom: "1.1rem", position: "relative", border: `1px solid ${s.color}20` }}>{s.icon}</div>
                                        <h3 style={{ color: "#1e1b4b", fontSize: "1.02rem", fontWeight: "700", margin: "0 0 0.4rem" }}>{s.label}</h3>
                                        <p style={{ color: "#6b7280", fontSize: "0.82rem", margin: "0 0 1rem", lineHeight: "1.55" }}>{s.desc}</p>
                                        <span style={{ background: s.bg, color: s.color, fontSize: "0.7rem", fontWeight: "700", padding: "0.3rem 0.8rem", borderRadius: "20px", display: "inline-block", letterSpacing: "0.02em" }}>{s.stat}</span>
                                    </div>
                                </AnimCard>
                            ))}
                        </div>
                    </section>

                    {/* VERSE BANNER */}
                    <AnimCard>
                        <section style={{ maxWidth: "940px", margin: "1rem auto", padding: "0 1.5rem" }}>
                            <div style={{ background: "linear-gradient(135deg,#1a1545,#2d1b69)", borderRadius: "26px", padding: "3.5rem 3rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
                                <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(196,181,253,0.06)" }} />
                                <div style={{ position: "absolute", bottom: "-40px", left: "-40px", width: "160px", height: "160px", borderRadius: "50%", background: "rgba(99,102,241,0.08)" }} />
                                <p style={{ color: "rgba(165,180,252,0.45)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 1.25rem", fontFamily: "sans-serif", position: "relative" }}>Verse of the month</p>
                                <p style={{ color: "white", fontSize: "1.6rem", fontFamily: "Georgia, serif", fontStyle: "italic", lineHeight: "1.75", margin: "0 0 1rem", position: "relative" }}>"For where two or three gather in my name,<br />there am I with them."</p>
                                <p style={{ color: "#a5b4fc", fontSize: "0.88rem", margin: 0, fontFamily: "sans-serif", position: "relative" }}>— Matthew 18:20</p>
                            </div>
                        </section>
                    </AnimCard>

                    {/* MEMBERS PREVIEW */}
                    <section style={{ maxWidth: "980px", margin: "0 auto", padding: "5rem 1.5rem 2rem" }}>
                        <AnimCard>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem" }}>
                                <div>
                                    <p style={{ color: "#6366f1", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: "700", margin: "0 0 0.4rem", fontFamily: "sans-serif" }}>Your leaders</p>
                                    <h2 style={{ color: "#1e1b4b", fontSize: "2rem", fontWeight: "800", margin: 0, fontFamily: "Georgia, serif" }}>Committee Members</h2>
                                </div>
                                <button onClick={() => goToTab("Members")} style={{ background: "transparent", border: "2px solid #6366f1", color: "#6366f1", borderRadius: "12px", padding: "0.55rem 1.4rem", cursor: "pointer", fontWeight: "700", fontSize: "0.85rem", transition: "all 0.2s" }}>View All →</button>
                            </div>
                        </AnimCard>
                        <div style={{ display: "flex", gap: "1rem", overflowX: "auto", paddingBottom: "0.75rem" }}>
                            {MEMBERS.map((m, i) => (
                                <AnimCard key={i} delay={i * 65}>
                                    <div className="mcard" style={{ background: "white", borderRadius: "20px", padding: "1.5rem 1.35rem", textAlign: "center", border: "1px solid #e0e7ff", minWidth: "140px", flex: "0 0 auto", transition: "all 0.3s" }}>
                                        <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "1.1rem", color: "white", margin: "0 auto 0.85rem", boxShadow: `0 8px 20px ${m.color}55` }}>{m.initials}</div>
                                        <p style={{ margin: "0 0 0.3rem", fontWeight: "700", color: "#1e1b4b", fontSize: "0.85rem" }}>{m.name.split(" ")[0]}</p>
                                        <p style={{ margin: 0, fontSize: "0.68rem", color: "white", background: m.color, borderRadius: "20px", padding: "0.18rem 0.65rem", display: "inline-block" }}>{m.role}</p>
                                    </div>
                                </AnimCard>
                            ))}
                        </div>
                    </section>

                    {/* RECENT ACTIVITY */}
                    <section style={{ maxWidth: "980px", margin: "0 auto", padding: "2rem 1.5rem 6rem" }}>
                        <AnimCard>
                            <h2 style={{ color: "#1e1b4b", fontSize: "2rem", fontWeight: "800", margin: "0 0 1.75rem", fontFamily: "Georgia, serif" }}>Recent Activity</h2>
                        </AnimCard>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                            {[
                                { icon: "🙏", text: "New prayer request submitted", time: "2 hours ago", color: "#7c3aed" },
                                { icon: "💰", text: "G. Nwosu contributed ₦5,000", time: "1 day ago", color: "#059669" },
                                { icon: "📖", text: 'New poem "Still Waters" published', time: "2 days ago", color: "#d97706" },
                                { icon: "🎬", text: "June meeting video uploaded", time: "5 days ago", color: "#dc2626" },
                            ].map((a, i) => (
                                <AnimCard key={i} delay={i * 70}>
                                    <div style={{ background: "white", borderRadius: "16px", padding: "1.1rem 1.35rem", border: "1px solid #e0e7ff", display: "flex", gap: "0.9rem", alignItems: "center" }}>
                                        <div style={{ width: "44px", height: "44px", borderRadius: "14px", background: `${a.color}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", flexShrink: 0 }}>{a.icon}</div>
                                        <div>
                                            <p style={{ margin: "0 0 0.18rem", fontSize: "0.86rem", color: "#374151", fontWeight: "500" }}>{a.text}</p>
                                            <p style={{ margin: 0, fontSize: "0.72rem", color: "#9ca3af" }}>{a.time}</p>
                                        </div>
                                    </div>
                                </AnimCard>
                            ))}
                        </div>
                    </section>

                    {/* FOOTER */}
                    <footer style={{ background: "#0a0818", padding: "3rem", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                        <div style={{ fontSize: "1.8rem", marginBottom: "0.75rem" }}>✝️</div>
                        <p style={{ color: "rgba(165,180,252,0.5)", fontSize: "0.78rem", margin: "0 0 0.25rem", fontFamily: "sans-serif", letterSpacing: "0.04em" }}>The Fellowship · Private Member Portal</p>
                        <p style={{ color: "rgba(165,180,252,0.25)", fontSize: "0.7rem", margin: 0, fontFamily: "sans-serif" }}>All rights reserved · Est. 2026</p>
                    </footer>
                </div>
            )}

            {/* ──────────────── INNER PAGES ────────────────────── */}
            {activeTab !== "Home" && (
                <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>

                    {/* PRAYER LINE */}
                    {activeTab === "Prayer Line" && (
                        <div>
                            <h2 style={{ color: "#1e1b4b", fontWeight: "800", fontSize: "1.7rem", marginTop: 0, fontFamily: "Georgia, serif" }}>🙏 Prayer Line</h2>
                            {!prayerMode && (
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                                    {[
                                        { mode: "request", icon: "🤲", title: "Submit Prayer Request", desc: "Share your request with the fellowship and we'll intercede together.", color: "#7c3aed", bg: "#f5f3ff" },
                                        { mode: "letter", icon: "📜", title: "This Month's Prayer Letter", desc: "View the prayer topics and monthly declarations for June 2026.", color: "#4f46e5", bg: "#eef2ff" },
                                    ].map(c => (
                                        <div key={c.mode} onClick={() => setPrayerMode(c.mode)} style={{ background: "white", borderRadius: "22px", padding: "2.25rem", cursor: "pointer", border: `1.5px solid ${c.color}20`, textAlign: "center", transition: "all 0.25s" }}
                                            onMouseOver={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.09)"; }}
                                            onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                                            <div style={{ width: "64px", height: "64px", borderRadius: "20px", background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", margin: "0 auto 1.25rem" }}>{c.icon}</div>
                                            <h3 style={{ color: "#1e1b4b", margin: "0 0 0.5rem", fontSize: "1.05rem" }}>{c.title}</h3>
                                            <p style={{ color: "#6b7280", fontSize: "0.875rem", margin: 0, lineHeight: "1.6" }}>{c.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {prayerMode === "request" && (
                                <div style={{ background: "white", borderRadius: "22px", padding: "2rem", border: "1px solid #e0e7ff" }}>
                                    <button onClick={() => { setPrayerMode(null); setPrayerSubmitted(false); setPrayerText(""); }} style={{ background: "none", border: "none", color: "#6366f1", cursor: "pointer", fontSize: "0.85rem", marginBottom: "1rem", padding: 0 }}>← Back</button>
                                    <h3 style={{ color: "#1e1b4b", marginTop: 0 }}>🤲 Submit a Prayer Request</h3>
                                    {!prayerSubmitted ? (<>
                                        <textarea value={prayerText} onChange={e => setPrayerText(e.target.value)} placeholder="Share your prayer request here... (kept confidential within the fellowship)" style={{ width: "100%", minHeight: "150px", borderRadius: "14px", border: "1px solid #c7d2fe", padding: "1rem", fontSize: "0.95rem", fontFamily: "inherit", resize: "vertical", boxSizing: "border-box", outline: "none" }} />
                                        <button onClick={submitPrayer} style={{ marginTop: "1rem", background: "#7c3aed", color: "white", border: "none", borderRadius: "12px", padding: "0.8rem 2rem", cursor: "pointer", fontWeight: "600" }}>Submit Request</button>
                                    </>) : (
                                        <div style={{ textAlign: "center", padding: "2rem" }}>
                                            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                                            <h3 style={{ color: "#059669" }}>Your request has been received!</h3>
                                            <p style={{ color: "#6b7280" }}>The prayer team will intercede on your behalf. God bless you.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                            {prayerMode === "letter" && (
                                <div style={{ background: "white", borderRadius: "22px", padding: "2rem", border: "1px solid #e0e7ff" }}>
                                    <button onClick={() => setPrayerMode(null)} style={{ background: "none", border: "none", color: "#6366f1", cursor: "pointer", fontSize: "0.85rem", marginBottom: "1rem", padding: 0 }}>← Back</button>
                                    <h3 style={{ color: "#1e1b4b", marginTop: 0 }}>📜 June 2026 — Prayer Letter</h3>
                                    <div style={{ background: "#f5f3ff", borderRadius: "16px", padding: "1.5rem", lineHeight: "1.9", color: "#374151" }}>
                                        {[["Salvation of the Lost", "Pray for our unsaved family members, friends, and neighbours. Let the Holy Spirit draw them irresistibly."], ["Health & Healing", "Intercede for members who are ill or going through physical challenges. Decree divine health in Jesus' name."], ["Financial Breakthrough", "Pray for open doors of employment, business growth, and debt cancellation for every member in need."], ["Unity of the Fellowship", "Let the spirit of love, unity and cooperation reign among us. Let no strife or division arise."], ["Upcoming Camp", "Pray for perfect logistics, safety, and a mighty move of God at the August camp meeting."]].map(([t, d], i) => (
                                            <p key={i}><strong>{i + 1}. {t}</strong><br />{d}</p>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* TREASURY */}
                    {activeTab === "Treasury" && (
                        <div>
                            <h2 style={{ color: "#1e1b4b", fontWeight: "800", fontSize: "1.7rem", marginTop: 0, fontFamily: "Georgia, serif" }}>💰 Treasury Report</h2>
                            {!treasuryMode && (
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                                    {[
                                        { mode: "contribute", icon: "💝", title: "Make a Contribution", desc: "Give your monthly dues or a freewill offering to the fellowship.", color: "#059669", bg: "#f0fdf4" },
                                        { mode: "stats", icon: "📊", title: "June Stats", desc: "View contributions and financial summary for this month.", color: "#065f46", bg: "#ecfdf5" },
                                    ].map(c => (
                                        <div key={c.mode} onClick={() => setTreasuryMode(c.mode)} style={{ background: "white", borderRadius: "22px", padding: "2.25rem", cursor: "pointer", border: `1.5px solid ${c.color}20`, textAlign: "center", transition: "all 0.25s" }}
                                            onMouseOver={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.09)"; }}
                                            onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                                            <div style={{ width: "64px", height: "64px", borderRadius: "20px", background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", margin: "0 auto 1.25rem" }}>{c.icon}</div>
                                            <h3 style={{ color: "#1e1b4b", margin: "0 0 0.5rem", fontSize: "1.05rem" }}>{c.title}</h3>
                                            <p style={{ color: "#6b7280", fontSize: "0.875rem", margin: 0, lineHeight: "1.6" }}>{c.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {treasuryMode === "contribute" && (
                                <div style={{ background: "white", borderRadius: "22px", padding: "2rem", border: "1px solid #d1fae5" }}>
                                    <button onClick={() => { setTreasuryMode(null); setContribDone(false); setContribAmount(""); setContribName(""); }} style={{ background: "none", border: "none", color: "#059669", cursor: "pointer", fontSize: "0.85rem", marginBottom: "1rem", padding: 0 }}>← Back</button>
                                    <h3 style={{ color: "#1e1b4b", marginTop: 0 }}>💝 Make a Contribution</h3>
                                    {!contribDone ? (
                                        <div style={{ display: "grid", gap: "1rem" }}>
                                            <input value={contribName} onChange={e => setContribName(e.target.value)} placeholder="Your name (leave blank to give anonymously)" style={{ borderRadius: "12px", border: "1px solid #a7f3d0", padding: "0.8rem 1rem", fontSize: "0.95rem", outline: "none", fontFamily: "inherit" }} />
                                            <input type="number" value={contribAmount} onChange={e => setContribAmount(e.target.value)} placeholder="Amount (₦)" style={{ borderRadius: "12px", border: "1px solid #a7f3d0", padding: "0.8rem 1rem", fontSize: "0.95rem", outline: "none", fontFamily: "inherit" }} />
                                            <div style={{ background: "#f0fdf4", borderRadius: "12px", padding: "1rem", fontSize: "0.85rem", color: "#065f46" }}>
                                                <strong>Bank Details:</strong><br />Account: 0123456789 · GTBank · The Fellowship Fund
                                            </div>
                                            <button onClick={submitContrib} style={{ background: "#059669", color: "white", border: "none", borderRadius: "12px", padding: "0.8rem 2rem", cursor: "pointer", fontWeight: "600" }}>Confirm Contribution</button>
                                        </div>
                                    ) : (
                                        <div style={{ textAlign: "center", padding: "2rem" }}>
                                            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🙏</div>
                                            <h3 style={{ color: "#059669" }}>Thank you for your generosity!</h3>
                                            <p style={{ color: "#6b7280" }}>₦{Number(contribAmount).toLocaleString()} recorded. God bless you abundantly.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                            {treasuryMode === "stats" && (
                                <div style={{ background: "white", borderRadius: "22px", padding: "2rem", border: "1px solid #d1fae5" }}>
                                    <button onClick={() => setTreasuryMode(null)} style={{ background: "none", border: "none", color: "#059669", cursor: "pointer", fontSize: "0.85rem", marginBottom: "1rem", padding: 0 }}>← Back</button>
                                    <h3 style={{ color: "#1e1b4b", marginTop: 0 }}>📊 June 2026 — Treasury Stats</h3>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                                        {[{ label: "Total Collected", value: `₦${totalContrib.toLocaleString()}`, color: "#059669" }, { label: "Contributors", value: contributions.length, color: "#4f46e5" }, { label: "Target", value: "₦50,000", color: "#d97706" }].map(s => (
                                            <div key={s.label} style={{ background: "#f9fafb", borderRadius: "14px", padding: "1.1rem", textAlign: "center" }}>
                                                <p style={{ margin: "0 0 0.25rem", color: "#9ca3af", fontSize: "0.73rem" }}>{s.label}</p>
                                                <p style={{ margin: 0, fontSize: "1.4rem", fontWeight: "700", color: s.color }}>{s.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ borderRadius: "14px", overflow: "hidden", border: "1px solid #e5e7eb" }}>
                                        {contributions.map((c, i) => (
                                            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.85rem 1.25rem", background: i % 2 === 0 ? "white" : "#f9fafb", borderBottom: i < contributions.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: "700", color: "#065f46" }}>{c.name[0]}</div>
                                                    <span style={{ fontWeight: "500", color: "#374151" }}>{c.name}</span>
                                                </div>
                                                <div style={{ textAlign: "right" }}>
                                                    <p style={{ margin: 0, fontWeight: "700", color: "#059669" }}>₦{c.amount.toLocaleString()}</p>
                                                    <p style={{ margin: 0, fontSize: "0.72rem", color: "#9ca3af" }}>{c.date}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* LITERATURE */}
                    {activeTab === "Literature" && (
                        <div>
                            <h2 style={{ color: "#1e1b4b", fontWeight: "800", fontSize: "1.7rem", marginTop: 0, fontFamily: "Georgia, serif" }}>📖 Literature Corner</h2>
                            {!writeMode && (<>
                                <div style={{ display: "grid", gap: "1rem", marginBottom: "1.5rem" }}>
                                    {POEMS.map((p, i) => (
                                        <div key={i} style={{ background: "white", borderRadius: "18px", padding: "1.35rem 1.6rem", border: "1px solid #e0e7ff", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                            <div style={{ flex: 1 }}>
                                                <h3 style={{ margin: "0 0 0.25rem", color: "#1e1b4b", fontSize: "1rem" }}>"{p.title}"</h3>
                                                <p style={{ margin: "0 0 0.75rem", fontSize: "0.78rem", color: "#6366f1" }}>by {p.author}</p>
                                                <p style={{ margin: 0, color: "#6b7280", fontSize: "0.88rem", fontStyle: "italic", lineHeight: "1.75" }}>{p.preview}</p>
                                            </div>
                                            <div style={{ marginLeft: "1.5rem", textAlign: "center", minWidth: "48px" }}>
                                                <p style={{ margin: 0, fontSize: "1.3rem" }}>🤍</p>
                                                <p style={{ margin: 0, fontSize: "0.78rem", color: "#9ca3af" }}>{p.likes}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={() => setWriteMode(true)} style={{ background: "#4f46e5", color: "white", border: "none", borderRadius: "14px", padding: "0.9rem 2.25rem", cursor: "pointer", fontWeight: "700", fontSize: "0.95rem" }}>✍️ Write Something</button>
                            </>)}
                            {writeMode && (
                                <div style={{ background: "white", borderRadius: "22px", padding: "2rem", border: "1px solid #e0e7ff" }}>
                                    <button onClick={() => { setWriteMode(false); setWriteSubmitted(false); setWriteText(""); setWriteTitle(""); }} style={{ background: "none", border: "none", color: "#6366f1", cursor: "pointer", fontSize: "0.85rem", marginBottom: "1rem", padding: 0 }}>← Back</button>
                                    <h3 style={{ color: "#1e1b4b", marginTop: 0 }}>✍️ Share Your Writing</h3>
                                    {!writeSubmitted ? (
                                        <div style={{ display: "grid", gap: "1rem" }}>
                                            <input value={writeTitle} onChange={e => setWriteTitle(e.target.value)} placeholder="Title of your piece" style={{ borderRadius: "12px", border: "1px solid #c7d2fe", padding: "0.8rem 1rem", fontSize: "0.95rem", outline: "none", fontFamily: "inherit" }} />
                                            <textarea value={writeText} onChange={e => setWriteText(e.target.value)} placeholder="Write your poem, story, devotional, or anything on your heart..." style={{ width: "100%", minHeight: "200px", borderRadius: "12px", border: "1px solid #c7d2fe", padding: "1rem", fontSize: "0.95rem", fontFamily: "Georgia, serif", resize: "vertical", boxSizing: "border-box", outline: "none", lineHeight: "1.9" }} />
                                            <button onClick={submitWrite} style={{ background: "#4f46e5", color: "white", border: "none", borderRadius: "12px", padding: "0.8rem 2rem", cursor: "pointer", fontWeight: "700" }}>Submit for Review</button>
                                        </div>
                                    ) : (
                                        <div style={{ textAlign: "center", padding: "2rem" }}>
                                            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📝</div>
                                            <h3 style={{ color: "#4f46e5" }}>Submitted! Thank you.</h3>
                                            <p style={{ color: "#6b7280" }}>Your piece will be reviewed and published on the board soon.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* PHOTO GALLERY */}
                    {activeTab === "Photo Gallery" && (
                        <div>
                            <h2 style={{ color: "#1e1b4b", fontWeight: "800", fontSize: "1.7rem", marginTop: 0, fontFamily: "Georgia, serif" }}>📸 Photo Gallery</h2>
                            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
                                {Object.keys(GALLERY).map(t => (
                                    <button key={t} onClick={() => setGalleryTab(t)} style={{ padding: "0.5rem 1.3rem", background: galleryTab === t ? "#4f46e5" : "white", color: galleryTab === t ? "white" : "#374151", border: "1px solid #e0e7ff", borderRadius: "20px", cursor: "pointer", fontWeight: galleryTab === t ? "700" : "400", fontSize: "0.85rem", transition: "all 0.2s" }}>{t}</button>
                                ))}
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                                {GALLERY[galleryTab].map((item, i) => (
                                    <div key={i} style={{ background: "white", borderRadius: "18px", border: "1px solid #e0e7ff", overflow: "hidden", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
                                        onMouseOver={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.1)"; }}
                                        onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                                        <div style={{ background: "linear-gradient(135deg,#e0e7ff,#ede9fe)", height: "130px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem" }}>{item.emoji}</div>
                                        <div style={{ padding: "0.8rem 1rem" }}>
                                            <p style={{ margin: 0, fontWeight: "600", fontSize: "0.85rem", color: "#1e1b4b" }}>{item.label}</p>
                                            <p style={{ margin: "0.2rem 0 0", fontSize: "0.72rem", color: "#9ca3af" }}>Tap to view album</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* PAST MEETINGS */}
                    {activeTab === "Past Meetings" && (
                        <div>
                            <h2 style={{ color: "#1e1b4b", fontWeight: "800", fontSize: "1.7rem", marginTop: 0, fontFamily: "Georgia, serif" }}>🎬 Past Meetings</h2>
                            <div style={{ display: "grid", gap: "1rem" }}>
                                {PAST_MEETINGS.map((m, i) => (
                                    <div key={i} style={{ background: "white", borderRadius: "18px", padding: "1.35rem", border: "1px solid #e0e7ff", display: "flex", gap: "1.25rem", alignItems: "flex-start", transition: "all 0.2s" }}
                                        onMouseOver={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.08)"; }}
                                        onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                                        <div style={{ background: "linear-gradient(135deg,#1e1b4b,#4f46e5)", borderRadius: "14px", width: "112px", minWidth: "112px", height: "74px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.2rem", cursor: "pointer" }}>
                                            <span style={{ fontSize: "1.8rem" }}>{m.thumb}</span>
                                            <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.62rem" }}>▶ {m.duration}</span>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ margin: "0 0 0.25rem", color: "#1e1b4b", fontSize: "0.98rem" }}>{m.title}</h3>
                                            <p style={{ margin: "0 0 0.5rem", fontSize: "0.72rem", color: "#6366f1" }}>{m.date}</p>
                                            <p style={{ margin: 0, color: "#6b7280", fontSize: "0.84rem", lineHeight: "1.6" }}>{m.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* MEMBERS */}
                    {activeTab === "Members" && (
                        <div>
                            <h2 style={{ color: "#1e1b4b", fontWeight: "800", fontSize: "1.7rem", marginTop: 0, fontFamily: "Georgia, serif" }}>👥 Committee Members</h2>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
                                {MEMBERS.map((m, i) => (
                                    <div key={i} style={{ background: "white", borderRadius: "20px", padding: "1.75rem", border: "1px solid #e0e7ff", textAlign: "center", transition: "all 0.25s" }}
                                        onMouseOver={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 16px 36px ${m.color}22`; }}
                                        onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                                        <div style={{ width: "68px", height: "68px", borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "1.3rem", color: "white", margin: "0 auto 1rem", boxShadow: `0 8px 22px ${m.color}55` }}>{m.initials}</div>
                                        <p style={{ margin: "0 0 0.3rem", fontWeight: "700", color: "#1e1b4b", fontSize: "0.95rem" }}>{m.name}</p>
                                        <p style={{ margin: 0, fontSize: "0.75rem", color: "white", background: m.color, borderRadius: "20px", padding: "0.22rem 0.8rem", display: "inline-block" }}>{m.role}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* COMMUNITY BOARD */}
                    <div style={{ marginTop: "3rem", background: "white", borderRadius: "20px", padding: "1.75rem", border: "1px solid #e0e7ff" }}>
                        <h3 style={{ color: "#1e1b4b", marginTop: 0, fontSize: "1rem", fontWeight: "700" }}>💬 Community Board</h3>
                        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
                            <input value={commentName} onChange={e => setCommentName(e.target.value)} placeholder="Your name" style={{ width: "150px", borderRadius: "10px", border: "1px solid #e0e7ff", padding: "0.6rem 0.8rem", fontSize: "0.85rem", outline: "none", fontFamily: "inherit" }} />
                            <input value={comment} onChange={e => setComment(e.target.value)} onKeyDown={e => e.key === "Enter" && submitComment()} placeholder="Leave a message for the fellowship..." style={{ flex: 1, borderRadius: "10px", border: "1px solid #e0e7ff", padding: "0.6rem 0.8rem", fontSize: "0.85rem", outline: "none", fontFamily: "inherit" }} />
                            <button onClick={submitComment} style={{ background: "#4f46e5", color: "white", border: "none", borderRadius: "10px", padding: "0.6rem 1.2rem", cursor: "pointer", fontWeight: "600", fontSize: "0.85rem" }}>Send</button>
                        </div>
                        <div style={{ display: "grid", gap: "0.75rem", maxHeight: "220px", overflowY: "auto" }}>
                            {comments.map((c, i) => (
                                <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#e0e7ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: "700", color: "#4f46e5", minWidth: "32px" }}>{c.name[0]}</div>
                                    <div style={{ background: "#f9fafb", borderRadius: "10px", padding: "0.6rem 0.9rem", flex: 1 }}>
                                        <p style={{ margin: "0 0 0.2rem", fontWeight: "600", fontSize: "0.8rem", color: "#374151" }}>{c.name} <span style={{ fontWeight: "400", color: "#9ca3af", fontSize: "0.7rem" }}>{c.time}</span></p>
                                        <p style={{ margin: 0, fontSize: "0.85rem", color: "#4b5563" }}>{c.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            )}
        </div>
    );
}
