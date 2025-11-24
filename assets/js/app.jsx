import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, Cylinder, Stars, Environment, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { ArrowDown, Menu, X, Leaf, BookOpen, CheckCircle, Globe, Users, TrendingUp, RefreshCw } from 'lucide-react';

// --- 3D COMPONENTS (Ex QuantumScene) ---

const DataNode = ({ position, color, scale = 1 }) => {
  const ref = useRef(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.1;
      ref.current.rotation.x = t * 0.2;
      ref.current.rotation.y = t * 0.3;
    }
  });

  return (
    <Icosahedron ref={ref} args={[1, 0]} position={position} scale={scale}>
      <meshStandardMaterial
        color={color}
        roughness={0.3}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.2}
        wireframe
      />
    </Icosahedron>
  );
};

const FloatingLeaf = ({ position, rotation }) => {
    const ref = useRef(null);
    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.getElapsedTime();
            ref.current.rotation.z = Math.sin(t * 0.5 + position[0]) * 0.1;
            ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.2;
        }
    });

    return (
        <group ref={ref} position={position} rotation={rotation}>
            <mesh>
                <boxGeometry args={[0.8, 0.05, 1.2]} />
                <meshStandardMaterial color="#059669" transparent opacity={0.8} />
            </mesh>
        </group>
    )
}

const EcoNetworkScene = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <DataNode position={[0, 0, 0]} color="#059669" scale={1.5} />
          <DataNode position={[-3, 1, -2]} color="#34D399" scale={0.6} />
          <DataNode position={[3, -1, -3]} color="#064E3B" scale={0.8} />
          <DataNode position={[-2, -2, 1]} color="#10B981" scale={0.5} />
          <FloatingLeaf position={[2, 2, -1]} rotation={[0.5, 0.5, 0]} />
          <FloatingLeaf position={[-2, -1, 0]} rotation={[-0.5, -0.2, 0]} />
        </Float>
        <Environment preset="park" />
        <Stars radius={100} depth={50} count={400} factor={4} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
};

// --- DIAGRAMS (Ex Diagrams.tsx) ---

const TripleBottomLineDiagram = () => {
  const [active, setActive] = useState('planet');

  const data = {
    planet: {
        label: "PIANETA",
        desc: "Impatto Ambientale",
        kpis: ["Impronta Carbonica", "Efficienza Energetica (PUE)", "Riduzione Rifiuti Elettronici", "Uso dell'Acqua"],
        color: "bg-eco-main",
        icon: <Globe className="w-6 h-6 text-white" aria-hidden="true" />
    },
    people: {
        label: "PERSONE",
        desc: "Responsabilità Sociale",
        kpis: ["Inclusione Digitale", "Accessibilità (WCAG)", "Privacy ed Etica", "Lavoro nella Supply Chain"],
        color: "bg-blue-500",
        icon: <Users className="w-6 h-6 text-white" aria-hidden="true" />
    },
    profit: {
        label: "PROFITTO",
        desc: "Sostenibilità Economica",
        kpis: ["Riduzione TCO", "Mitigazione del Rischio", "Reputazione del Brand", "Efficienza Operativa"],
        color: "bg-eco-accent",
        icon: <TrendingUp className="w-6 h-6 text-white" aria-hidden="true" />
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg border border-stone-200 my-8 w-full max-w-2xl" role="region" aria-label="Diagramma interattivo Triple Bottom Line">
      <h3 className="font-serif text-2xl mb-2 text-stone-800">Il Triple Bottom Line</h3>
      <p className="text-sm text-stone-500 mb-8 text-center">
        La vera sostenibilità bilancia tre dimensioni. Clicca per esplorare le metriche.
      </p>
      
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full">
          <div className="relative w-64 h-64" role="tablist" aria-label="Selettore dimensioni sostenibilità">
              <motion.button 
                role="tab"
                aria-selected={active === 'planet'}
                aria-controls="tbl-panel"
                onClick={() => setActive('planet')}
                className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full opacity-80 flex items-center justify-center transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-eco-main ${active === 'planet' ? 'bg-eco-main shadow-xl z-20 scale-110' : 'bg-eco-main/40 z-10'}`}
              >
                  <span className="text-white font-bold">PIANETA</span>
              </motion.button>
              <motion.button 
                role="tab"
                aria-selected={active === 'people'}
                aria-controls="tbl-panel"
                onClick={() => setActive('people')}
                className={`absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-80 flex items-center justify-center transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 ${active === 'people' ? 'bg-blue-500 shadow-xl z-20 scale-110' : 'bg-blue-500/40 z-10'}`}
              >
                  <span className="text-white font-bold">PERSONE</span>
              </motion.button>
              <motion.button 
                role="tab"
                aria-selected={active === 'profit'}
                aria-controls="tbl-panel"
                onClick={() => setActive('profit')}
                className={`absolute bottom-0 right-0 w-32 h-32 rounded-full opacity-80 flex items-center justify-center transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-eco-accent ${active === 'profit' ? 'bg-eco-accent shadow-xl z-20 scale-110' : 'bg-eco-accent/40 z-10'}`}
              >
                  <span className="text-white font-bold">PROFITTO</span>
              </motion.button>
              
              <div className="absolute top-[35%] left-[35%] w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full z-30 flex items-center justify-center text-[10px] text-stone-800 font-bold pointer-events-none" aria-hidden="true">
                  SOSTENIBILE
              </div>
          </div>

          <motion.div 
            id="tbl-panel"
            role="tabpanel"
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 bg-stone-50 p-6 rounded-lg border border-stone-200 min-h-[250px]"
          >
                <div className={`inline-flex p-3 rounded-full mb-4 ${data[active].color}`}>
                    {data[active].icon}
                </div>
                <h4 className="text-xl font-bold text-stone-800 mb-1">{data[active].label}</h4>
                <p className="text-sm text-stone-500 italic mb-4">{data[active].desc}</p>
                <ul className="space-y-2">
                    {data[active].kpis.map((kpi, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-stone-700 bg-white p-2 rounded border border-stone-100">
                            <div className={`w-2 h-2 rounded-full ${data[active].color}`} aria-hidden="true"></div>
                            {kpi}
                        </li>
                    ))}
                </ul>
          </motion.div>
      </div>
    </div>
  );
};

const SoftFrameworkDiagram = () => {
  const [step, setStep] = useState(0);

  const phases = [
      { name: "STRATEGIA", desc: "Governance, OKR, Formazione" },
      { name: "IMPLEMENTAZIONE", desc: "Strumenti, Automazione, DevOps" },
      { name: "OPERAZIONI", desc: "Monitoraggio, Miglioramento" },
      { name: "CONFORMITÀ", desc: "Reporting, Audit, CSRD" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center p-8 bg-[#F5F4F0] rounded-xl border border-stone-200 my-8 w-full" aria-label="Diagramma del Framework SOFT">
      <h3 className="font-serif text-2xl mb-2 text-stone-900">Il Framework SOFT</h3>
      <p className="text-sm text-stone-600 mb-8 text-center">
        Un ciclo continuo per la trasformazione: Strategia, Operazioni, Finanza/Implementazione, Tecnologia/Conformità.
      </p>

      <div className="relative flex items-center justify-center w-full max-w-4xl gap-4 flex-wrap md:flex-nowrap" aria-live="polite">
        {phases.map((phase, idx) => (
            <div key={idx} className="flex flex-col items-center relative w-full md:w-1/4">
                <motion.div 
                    className={`w-full p-4 rounded-lg border-2 text-center transition-all duration-500 h-32 flex flex-col justify-center items-center relative z-10
                    ${step === idx ? 'border-eco-main bg-white shadow-lg scale-105' : 'border-stone-300 bg-stone-100 opacity-70'}`}
                >
                    <div className={`text-xs font-bold tracking-widest mb-2 ${step === idx ? 'text-eco-main' : 'text-stone-500'}`}>STEP {idx + 1}</div>
                    <h4 className="font-serif font-bold text-lg mb-1">{phase.name}</h4>
                    <p className="text-xs text-stone-500 leading-tight">{phase.desc}</p>
                </motion.div>
                
                {idx < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-stone-300 z-0" aria-hidden="true"></div>
                )}
                {idx < 3 && (
                    <div className="md:hidden h-4 w-0.5 bg-stone-300 my-2" aria-hidden="true"></div>
                )}
            </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-white rounded-lg border border-stone-200 text-center max-w-lg">
          <div className="flex items-center justify-center gap-2 mb-2 text-eco-main font-bold">
              <RefreshCw size={18} className={step === 3 ? "animate-spin" : ""} aria-hidden="true" />
              <span>Ciclo di Miglioramento Continuo</span>
          </div>
          <p className="text-sm text-stone-500">
            La sostenibilità non è una destinazione, ma un ciclo. I risultati della conformità alimentano la strategia per l'iterazione successiva.
          </p>
      </div>
    </div>
  );
};

const CarbonCostDiagram = () => {
    return (
        <div className="flex flex-col md:flex-row gap-8 items-center p-8 bg-stone-900 text-stone-100 rounded-xl my-8 border border-stone-800 shadow-lg w-full">
            <div className="flex-1 min-w-[240px]">
                <div className="inline-block px-2 py-1 bg-eco-main text-white text-xs font-bold rounded mb-2">IL PARADOSSO DELLA CRESCITA</div>
                <h3 className="font-serif text-2xl mb-2 text-white">Sostenibilità = Profittabilità</h3>
                <p className="text-stone-400 text-sm mb-6 leading-relaxed">
                    La scelta "Green" è spesso la scelta "Lean". Ottimizzare per il carbonio significa solitamente ottimizzare le risorse di calcolo, riducendo direttamente le bollette cloud e il TCO hardware.
                </p>
                
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-eco-main/20 flex items-center justify-center text-eco-main" aria-hidden="true">
                            <Leaf size={16} />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-white">-30% Emissioni</div>
                            <div className="text-xs text-stone-500">Utilizzo Cloud Ottimizzato</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-eco-accent/20 flex items-center justify-center text-eco-accent" aria-hidden="true">
                            <TrendingUp size={16} />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-white">-25% Budget IT</div>
                            <div className="text-xs text-stone-500">Risparmi sui Costi Diretti</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="relative w-full max-w-md h-64 bg-stone-800/50 rounded-xl border border-stone-700/50 p-6" role="img" aria-label="Grafico che mostra la correlazione tra riduzione del carbonio e riduzione dei costi nel tempo">
                <div className="absolute left-6 right-6 top-6 bottom-6">
                    <div className="w-full h-full border-l border-b border-stone-600 relative">
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-stone-700/50 -translate-y-12"></div>
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-stone-700/50 -translate-y-24"></div>
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-stone-700/50 -translate-y-36"></div>
                    </div>

                    <svg className="absolute inset-0 w-full h-full overflow-visible">
                        <title>Grafico costi vs emissioni</title>
                        <desc>Due linee discendenti che mostrano come la riduzione delle emissioni (verde) sia correlata alla riduzione dei costi (oro).</desc>
                        <motion.path 
                            d="M0,20 C50,20 100,50 150,90 C200,130 250,140 320,160" 
                            fill="none" 
                            stroke="#059669" 
                            strokeWidth="3"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 2 }}
                        />
                        <motion.path 
                            d="M0,30 C50,30 100,60 150,100 C200,140 250,150 320,170" 
                            fill="none" 
                            stroke="#D97706" 
                            strokeWidth="3"
                            strokeDasharray="5,5"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 2, delay: 0.5 }}
                        />
                    </svg>
                    
                    <div className="absolute top-0 left-0 text-xs text-stone-500">Baseline</div>
                    <div className="absolute bottom-0 right-0 text-xs text-stone-500">Ottimizzato</div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2 }}
                        className="absolute bottom-4 right-8 bg-stone-900 border border-stone-600 p-2 rounded text-xs"
                    >
                        <div className="flex items-center gap-2 text-eco-main"><div className="w-2 h-2 bg-eco-main rounded-full"></div> Carbonio</div>
                        <div className="flex items-center gap-2 text-eco-accent"><div className="w-2 h-2 bg-eco-accent rounded-full"></div> Costo</div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

// --- MAIN APP COMPONENT (Ex App.tsx) ---

const AuthorCard = ({ name, role, delay }) => {
  return (
    <article className="flex flex-col group animate-fade-in-up items-center p-8 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300 w-full max-w-sm hover:border-eco-main/50" style={{ animationDelay: delay }}>
      <div className="w-24 h-24 bg-stone-100 rounded-full mb-6 flex items-center justify-center overflow-hidden" aria-hidden="true">
         <img 
            src="https://media.licdn.com/dms/image/v2/C4D03AQF6pppYBQqNIw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1634652159502?e=1765411200&v=beta&t=qgzs1dUzJQYb4V0OKJJCh_MniWJQLnTSN2JjMfD73kM" 
            alt={name}
            className="w-full h-full object-cover"
         />
      </div>
      <h3 className="font-serif text-2xl text-stone-900 text-center mb-2">{name}</h3>
      <p className="text-sm text-eco-main font-bold uppercase tracking-widest text-center mb-4">{role}</p>
      <blockquote className="text-stone-600 text-center text-sm leading-relaxed italic">
        "La più grande minaccia per il nostro pianeta è la convinzione che qualcun altro lo salverà."
      </blockquote>
    </article>
  );
};

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-stone-800 selection:bg-eco-main selection:text-white">
      
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#FAFAF9]/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}
        role="navigation"
        aria-label="Navigazione principale"
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <button 
            className="flex items-center gap-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-eco-main rounded-lg p-1" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Torna all'inizio"
          >
            <div className="w-8 h-8 bg-eco-main rounded-lg flex items-center justify-center text-white shadow-sm" aria-hidden="true">
                <Leaf size={18} />
            </div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              SUSTAINABLE <span className="text-eco-main">IT</span>
            </span>
          </button>
          
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium tracking-wide text-stone-600">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-eco-main transition-colors cursor-pointer uppercase focus:outline-none focus:text-eco-main">Il Problema</a>
            <a href="#framework" onClick={scrollToSection('framework')} className="hover:text-eco-main transition-colors cursor-pointer uppercase focus:outline-none focus:text-eco-main">Framework</a>
            <a href="#impact" onClick={scrollToSection('impact')} className="hover:text-eco-main transition-colors cursor-pointer uppercase focus:outline-none focus:text-eco-main">Impatto</a>
            <a href="#author" onClick={scrollToSection('author')} className="hover:text-eco-main transition-colors cursor-pointer uppercase focus:outline-none focus:text-eco-main">Autore</a>
            <a href="https://sustainableitc.substack.com/" target="_blank" rel="noopener noreferrer" className="hover:text-eco-main transition-colors cursor-pointer uppercase focus:outline-none focus:text-eco-main">Newsletter</a>
            <a href="https://kodamahq.it/" target="_blank" rel="noopener noreferrer" className="hover:text-eco-main transition-colors cursor-pointer uppercase focus:outline-none focus:text-eco-main">KodamaHQ</a>
            <a 
              href="https://leanpub.com/sustainable-it" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-5 py-2 bg-stone-900 text-white rounded-full hover:bg-eco-dark transition-colors shadow-sm cursor-pointer flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900"
              aria-label="Acquista il libro Sustainable IT su Leanpub"
            >
              <BookOpen size={16} aria-hidden="true" /> Ottieni il Libro
            </a>
          </div>

          <button 
            className="lg:hidden text-stone-900 p-2 focus:outline-none focus:ring-2 focus:ring-eco-main rounded-md" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#FAFAF9] flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in" role="dialog" aria-modal="true">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-eco-main transition-colors cursor-pointer uppercase">Il Problema</a>
            <a href="#framework" onClick={scrollToSection('framework')} className="hover:text-eco-main transition-colors cursor-pointer uppercase">Il Framework</a>
            <a href="#impact" onClick={scrollToSection('impact')} className="hover:text-eco-main transition-colors cursor-pointer uppercase">Impatto</a>
            <a href="#author" onClick={scrollToSection('author')} className="hover:text-eco-main transition-colors cursor-pointer uppercase">Autore</a>
            <a href="https://sustainableitc.substack.com/" target="_blank" rel="noopener noreferrer" className="hover:text-eco-main transition-colors cursor-pointer uppercase">Newsletter</a>
            <a href="https://kodamahq.it/" target="_blank" rel="noopener noreferrer" className="hover:text-eco-main transition-colors cursor-pointer uppercase">KodamaHQ</a>
            <a 
              href="https://leanpub.com/sustainable-it" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => setMenuOpen(false)} 
              className="px-6 py-3 bg-stone-900 text-white rounded-full shadow-lg cursor-pointer"
            >
              Ottieni il Libro
            </a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden" role="banner">
        <EcoNetworkScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(250,250,249,0.85)_0%,rgba(250,250,249,0.5)_50%,rgba(250,250,249,0.2)_100%)]" aria-hidden="true" />

        <div className="relative z-10 container mx-auto px-6 text-center mt-12">
          <div className="inline-block mb-6 px-4 py-1.5 border border-eco-main/30 text-eco-dark text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-md bg-white/50">
            Il Metodo Pratico
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight mb-6 text-stone-900 drop-shadow-sm">
            Sustainable IT <br/>
            <span className="italic font-light text-stone-600 text-3xl md:text-5xl block mt-2">Riduci l'impatto. Ottimizza le risorse.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-600 font-light leading-relaxed mb-10">
            Una guida completa per guidare la trasformazione digitale sostenibile. Framework pratici, metriche reali e risultati guidati dal business.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4">
             <a 
                href="#introduction" 
                onClick={scrollToSection('introduction')} 
                className="px-8 py-3 bg-stone-900 text-white rounded-full hover:bg-eco-dark transition-all shadow-lg hover:shadow-xl text-sm font-bold tracking-wide focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900"
             >
                INIZIA A LEGGERE
             </a>
             <a 
                href="https://leanpub.com/sustainable-it" 
                target="_blank" 
                rel="noreferrer" 
                className="px-8 py-3 bg-white text-stone-900 border border-stone-200 rounded-full hover:border-eco-main transition-all shadow-sm hover:shadow-md text-sm font-bold tracking-wide flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-main"
             >
                COMPRA SU LEANPUB
             </a>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
            <ArrowDown className="text-stone-400" aria-hidden="true" />
        </div>
      </header>

      <main id="main-content">
        {/* Introduction: The Problem */}
        <section id="introduction" className="py-24 bg-white" aria-labelledby="intro-heading">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-5">
               <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] border border-stone-100">
                  <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000" 
                    alt="Rappresentazione digitale della Terra vista dallo spazio" 
                    className="object-cover w-full h-full opacity-90" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent flex items-end p-8">
                      <p className="text-white font-serif italic text-xl">"Il software sta inquinando più degli aerei."</p>
                  </div>
               </div>
            </div>
            <div className="md:col-span-7">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-eco-main uppercase">UN PROBLEMA DI BUSINESS</div>
              <h2 id="intro-heading" className="font-serif text-4xl md:text-5xl mb-6 leading-tight text-stone-900">Sostenibilità è Efficienza</h2>
              <div className="w-16 h-1 bg-eco-main mb-8" aria-hidden="true"></div>
              
              <div className="text-lg text-stone-600 leading-relaxed space-y-6">
                <p>
                  <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-eco-main">L</span>a maggior parte delle iniziative di sostenibilità IT fallisce perché viene trattata come beneficenza, non come strategia. Ma lo spreco di risorse digitali—cloud sovradimensionato, server zombie, codice inefficiente—è anche uno spreco di denaro.
                </p>
                <p>
                  Il framework del <strong>Triple Bottom Line</strong> dimostra che non devi scegliere tra il pianeta e il profitto. Ottimizzando per la sostenibilità, ottimizzi per le performance, l'esperienza utente e i costi.
                </p>
                
                <ul className="space-y-3 mt-4">
                    {[
                        "Bollette cloud ridotte del 30%+",
                        "Migliore retention dei talenti",
                        "Pronti per la conformità normativa (CSRD)",
                        "Performance & Accessibilità potenziate"
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-stone-700 font-medium">
                            <CheckCircle size={18} className="text-eco-main" aria-hidden="true" /> {item}
                        </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Triple Bottom Line Diagram */}
        <section className="py-16 bg-stone-50 border-y border-stone-200" aria-label="Diagramma Triple Bottom Line">
            <div className="container mx-auto px-6 flex flex-col items-center">
                <TripleBottomLineDiagram />
            </div>
        </section>

        {/* Framework Section */}
        <section id="framework" className="py-24 bg-white" aria-labelledby="framework-heading">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">METODOLOGIA</div>
                    <h2 id="framework-heading" className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Il Framework SOFT</h2>
                    <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                        Un approccio strutturato per trasformare la tua organizzazione. Passare dalla "consapevolezza" all' "esecuzione" richiede governance, strumenti e cultura.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7">
                        <SoftFrameworkDiagram />
                    </div>
                    <div className="lg:col-span-5 space-y-8">
                        <article className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-900 font-bold border border-stone-200 shrink-0">1</div>
                            <div>
                                <h4 className="font-bold text-lg mb-2">Strategia & Governance</h4>
                                <p className="text-stone-600 text-sm">Definisci OKR che contano. Costruisci un comitato "GreenOps". Ferma la tragedia dei beni comuni.</p>
                            </div>
                        </article>
                        <article className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-900 font-bold border border-stone-200 shrink-0">2</div>
                            <div>
                                <h4 className="font-bold text-lg mb-2">Implementazione</h4>
                                <p className="text-stone-600 text-sm">Shift-left. Principi di Green Coding. Integrazione CI/CD. Misura il carbonio come misuri i bug.</p>
                            </div>
                        </article>
                        <article className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-900 font-bold border border-stone-200 shrink-0">3</div>
                            <div>
                                <h4 className="font-bold text-lg mb-2">Operazioni & Misurazione</h4>
                                <p className="text-stone-600 text-sm">Usa metriche standard (SCI, TCS). Monitora l'energia in tempo reale. Ottimizza i cicli di vita dell'hardware.</p>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>

        {/* Impact / Data Section */}
        <section id="impact" className="py-24 bg-stone-900 text-stone-100 overflow-hidden relative" aria-labelledby="impact-heading">
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" aria-hidden="true">
                <div className="w-96 h-96 rounded-full bg-eco-main blur-[150px] absolute top-[-100px] left-[-100px]"></div>
                <div className="w-96 h-96 rounded-full bg-eco-accent blur-[150px] absolute bottom-[-100px] right-[-100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="order-2 lg:order-1 relative flex justify-center">
                        <div className="w-full max-w-[480px] bg-white rounded-xl overflow-hidden shadow-2xl border border-stone-700">
                            <iframe 
                                src="https://sustainableitc.substack.com/embed" 
                                width="480" 
                                height="320" 
                                style={{ border: "none", background: "white" }} 
                                frameBorder="0" 
                                scrolling="no"
                                className="w-full"
                                title="Sustainable IT Newsletter"
                            ></iframe>
                        </div>
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800 text-eco-main text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-700">
                            RISULTATI REALI
                        </div>
                        <h2 id="impact-heading" className="font-serif text-4xl md:text-5xl mb-6 text-white">Il Paradosso della Crescita</h2>
                        <p className="text-lg text-stone-400 mb-8 leading-relaxed">
                            Tradizionalmente, quando le aziende crescono, la loro impronta IT esplode. L'IT Sostenibile rompe questa correlazione. Disaccoppiando la crescita dal consumo, crei un'infrastruttura resiliente e antifragile.
                        </p>
                        
                        <CarbonCostDiagram />
                        
                     </div>
                </div>
            </div>
        </section>

        {/* Author Section */}
        <section id="author" className="py-24 bg-[#FAFAF9] border-t border-stone-200" aria-labelledby="author-heading">
           <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 id="author-heading" className="font-serif text-3xl md:text-4xl mb-4 text-stone-900">L'Autore</h2>
                </div>
                
                <div className="flex justify-center">
                    <AuthorCard 
                        name="Francesco Fullone" 
                        role="Autore & Tech Leader" 
                        delay="0s" 
                    />
                </div>
                
                <div className="max-w-2xl mx-auto mt-12 text-center">
                    <p className="text-stone-600 mb-8">
                        Questo libro è il risultato di anni di workshop, consulenze e implementazioni nel mondo reale. Evita le prediche morali per framework operativi. È scritto per CTO, Developer e Sustainability Lead che devono agire lunedì mattina.
                    </p>
                    <a 
                        href="https://leanpub.com/sustainable-it" 
                        className="inline-block px-8 py-4 bg-eco-main text-white font-bold rounded-lg shadow-lg hover:bg-eco-dark hover:shadow-xl transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-main"
                    >
                        Compra il libro su Leanpub
                    </a>
                    <p className="text-xs text-stone-400 mt-4">Disponibile in PDF, EPUB, MOBI</p>
                </div>
           </div>
        </section>

      </main>

      <footer className="bg-white text-stone-500 py-12 border-t border-stone-200">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start text-stone-900 font-serif font-bold text-xl mb-2">
                    <Leaf size={20} className="text-eco-main" aria-hidden="true" /> Sustainable IT
                </div>
                <p className="text-sm">The Practical Way. Pubblicato 2025.</p>
            </div>
            <div className="flex gap-6 text-sm font-medium flex-wrap justify-center">
                <a href="#" className="hover:text-eco-main transition-colors focus:outline-none focus:text-eco-main">Privacy</a>
                <a href="mailto:francesco@darumahq.it" target="_blank" className="hover:text-eco-main transition-colors focus:outline-none focus:text-eco-main">Contatti</a>
                <a href="https://leanpub.com/sustainable-it" target="_blank" className="hover:text-eco-main transition-colors focus:outline-none focus:text-eco-main">Leanpub</a>
                <a href="https://sustainableitc.substack.com/" target="_blank" className="hover:text-eco-main transition-colors focus:outline-none focus:text-eco-main">Newsletter</a>
                <a href="https://kodamahq.it/" target="_blank" className="hover:text-eco-main transition-colors focus:outline-none focus:text-eco-main">KodamaHQ</a>
            </div>
        </div>
        <div className="text-center mt-12 text-xs text-stone-400">
            © 2025 Francesco Fullone. Tutti i diritti riservati.
        </div>
      </footer>
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);