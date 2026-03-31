'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X, Users, BookOpen, Award, Building2, Mail, Phone, MapPin, Play, GraduationCap, Star, ChevronRight, Heart, Lightbulb, Globe, Handshake } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const students = useCountUp(850, 2000, statsVisible);
  const years = useCountUp(67, 2000, statsVisible);
  const teachers = useCountUp(45, 2000, statsVisible);
  const successRate = useCountUp(98, 2000, statsVisible);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ── Navigation ── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md text-gray-800' : 'bg-transparent text-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            <div className="flex items-center space-x-3">
              <img src="/logo.png" width="50" height="50" alt="Logo Sully" className="rounded-full shadow" />
              <div>
                <span className="text-xl font-bold tracking-tight">École Collège</span>
                <span className="block text-xs font-medium opacity-70 tracking-widest uppercase">Sully</span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {['home','about','programs','values','media','contact'].map((s, i) => (
                <button key={s} onClick={() => scrollToSection(s)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-blue-700 hover:text-white ${scrolled ? 'text-gray-700' : 'text-white/90'}`}>
                  {['Accueil','À Propos','Programmes','Valeurs','Médias','Contact'][i]}
                </button>
              ))}
              <button onClick={() => scrollToSection('contact')}
                className="ml-4 px-6 py-2 bg-emerald-600 text-white rounded-full text-sm font-semibold hover:bg-emerald-500 transition-all shadow-md hover:shadow-lg transform hover:scale-105">
                Inscription
              </button>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-4 border-t border-white/20 bg-blue-950/95 backdrop-blur-md rounded-b-2xl">
              {['home','about','programs','values','media','contact'].map((s, i) => (
                <button key={s} onClick={() => scrollToSection(s)}
                  className="block w-full text-left py-3 px-6 text-white hover:bg-white/10 transition text-sm">
                  {['Accueil','À Propos','Programmes','Valeurs','Médias','Contact'][i]}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950">
          <div className="absolute inset-0 opacity-25"
            style={{backgroundImage: 'radial-gradient(circle at 15% 50%, #0ea5e9 0%, transparent 45%), radial-gradient(circle at 85% 20%, #10b981 0%, transparent 45%), radial-gradient(circle at 55% 85%, #6366f1 0%, transparent 40%)'}} />
          <div className="absolute top-16 right-24 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-24 left-12 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay:'1.2s'}} />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-400/10 rounded-full blur-2xl animate-pulse" style={{animationDelay:'2.4s'}} />
        </div>
        <div className="absolute inset-0 opacity-5"
          style={{backgroundImage:'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)', backgroundSize:'60px 60px'}} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-4 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
            <Star className="w-4 h-4 fill-current" />
            Institution d'Excellence depuis 1957
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="block">École Collège</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-sky-300 to-indigo-300">
              Sully
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-4 text-blue-100 max-w-3xl mx-auto">
            Former les esprits d'aujourd'hui pour bâtir le monde de demain
          </p>
          <p className="text-base mb-12 text-white/50 tracking-[0.35em] uppercase font-light">
            Savoir · Savoir-faire · Savoir-être
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollToSection('contact')}
              className="group px-8 py-4 bg-emerald-600 text-white rounded-full font-semibold text-lg hover:bg-emerald-500 transition-all shadow-xl hover:shadow-emerald-600/30 transform hover:scale-105 flex items-center justify-center gap-2">
              Nous Contacter
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => scrollToSection('programs')}
              className="px-8 py-4 bg-white/10 text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20">
              Découvrir nos Programmes
            </button>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/30 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-white/40 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section ref={statsRef} className="py-16 bg-gradient-to-r from-emerald-700 to-teal-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
            {[
              { value: students, suffix: '+', label: 'Élèves' },
              { value: years,    suffix: ' ans', label: "D'Excellence" },
              { value: teachers, suffix: '+', label: 'Enseignants' },
              { value: successRate, suffix: '%', label: 'de Réussite' },
            ].map((s, i) => (
              <div key={i} className="group">
                <div className="text-5xl md:text-6xl font-bold mb-1 group-hover:scale-110 transition-transform">{s.value}{s.suffix}</div>
                <div className="text-emerald-100 text-xs uppercase tracking-widest font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-widest">Notre Histoire</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-gray-900">Qui Sommes-Nous ?</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-blue-700 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Fondée en 1957 sous le nom de <strong className="text-gray-900">Juliette Dodu</strong>, l'École Sully est un établissement privé
                d'enseignement qui s'inscrit depuis plus de six décennies dans une mission éducative fondée sur la qualité académique, l'épanouissement personnel des élèves et la transmission de valeurs citoyennes.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                L'école dispense un enseignement fondé sur les <strong className="text-gray-900">programmes francophones et malgaches</strong>, avec pour objectif de former des élèves autonomes, responsables et ouverts sur leur environnement.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Afin de renforcer les ressources pédagogiques mises à disposition des élèves et de soutenir ses initiatives de solidarité éducative.
              </p>
              <button onClick={() => scrollToSection('programs')}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-full font-semibold hover:bg-blue-800 transition-all transform hover:scale-105 shadow-lg">
                Voir nos programmes
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users,    bg: 'from-blue-50 to-blue-100',   border: 'border-blue-200',   iconBg: 'bg-blue-700',   title: 'Équipe Expérimentée',     desc: 'Enseignants qualifiés et passionnés par leur métier' },
                { icon: BookOpen, bg: 'from-teal-50 to-teal-100',   border: 'border-teal-200',   iconBg: 'bg-teal-600',   title: 'Programmes Modernes',     desc: 'Curricula actualisés et innovants' },
                { icon: Award,    bg: 'from-sky-50 to-sky-100',     border: 'border-sky-200',    iconBg: 'bg-sky-600',    title: 'Excellence Reconnue',     desc: 'Résultats académiques remarquables' },
                { icon: Building2,bg: 'from-indigo-50 to-indigo-100',border:'border-indigo-200', iconBg: 'bg-indigo-700', title: 'Infrastructures Modernes',desc: 'Salles équipées et laboratoires' },
              ].map(({ icon: Icon, bg, border, iconBg, title, desc }) => (
                <div key={title} className={`group bg-gradient-to-br ${bg} p-6 rounded-2xl border ${border} hover:shadow-lg transition-all hover:-translate-y-1`}>
                  <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-base mb-1 text-gray-900">{title}</h3>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Programs ── */}
      <section id="programs" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-widest">Formations</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-gray-900">Nos Programmes</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-blue-700 mx-auto rounded-full" />
            <p className="text-gray-500 mt-6 max-w-2xl mx-auto">
              Des parcours éducatifs complets, adaptés à chaque étape de la scolarité de votre enfant.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                img: '/gym.png', label: '6 – 11 ans', labelColor: 'bg-blue-700',
                iconBg: 'bg-blue-100', iconColor: 'text-blue-700', Icon: BookOpen,
                title: 'École Primaire',
                desc: 'Fondations solides en mathématiques, français, sciences et arts. Enseignement interactif et ludique.',
                items: ['Apprentissage personnalisé','Ateliers créatifs','Activités sportives','Langues étrangères'],
                bulletColor: 'bg-blue-100 text-blue-700',
                accent: 'border-blue-200',
              },
              {
                img: '/classe.jpg', label: '11 – 15 ans', labelColor: 'bg-teal-600', featured: true,
                iconBg: 'bg-teal-100', iconColor: 'text-teal-600', Icon: GraduationCap,
                title: 'Collège',
                desc: 'Programme complet préparant à l\'entrée au lycée. Accent sur la réflexion critique et l\'autonomie.',
                items: ['Préparation au brevet','Projets interdisciplinaires','Orientation professionnelle','Soutien académique'],
                bulletColor: 'bg-teal-100 text-teal-600',
                accent: 'border-teal-200',
              },
              {
                img: '/groupe.png', label: 'Tous niveaux', labelColor: 'bg-indigo-700',
                iconBg: 'bg-indigo-100', iconColor: 'text-indigo-700', Icon: Users,
                title: 'Activités Spéciales',
                desc: 'Clubs de musique, théâtre, sports, informatique. Développement des talents et des passions.',
                items: ['Clubs parascolaires','Excursions pédagogiques','Projets communautaires','Échanges internationaux'],
                bulletColor: 'bg-indigo-100 text-indigo-700',
                accent: 'border-indigo-200',
              },
            ].map(({ img, label, labelColor, featured, iconBg, iconColor, Icon, title, desc, items, bulletColor, accent }) => (
              <div key={title} className={`group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border ${accent} ${featured ? 'md:-mt-4 ring-2 ring-teal-500/30' : ''} transform hover:-translate-y-2`}>
                <div className="relative overflow-hidden h-52">
                  <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className={`${labelColor} text-white px-3 py-1 rounded-full text-xs font-semibold`}>{label}</span>
                  </div>
                  {featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-semibold">⭐ Phare</span>
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{title}</h3>
                  <p className="text-gray-500 mb-6 leading-relaxed text-sm">{desc}</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {items.map(item => (
                      <li key={item} className="flex items-center gap-2">
                        <span className={`w-5 h-5 ${bulletColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <ChevronRight className="w-3 h-3" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section id="values" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-15"
          style={{backgroundImage:'radial-gradient(circle at 25% 75%, #10b981 0%, transparent 50%), radial-gradient(circle at 75% 25%, #38bdf8 0%, transparent 50%)'}} />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-teal-400 font-semibold text-sm uppercase tracking-widest">Ce qui nous guide</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">Nos Valeurs Fondamentales</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-400 to-sky-400 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Star,      num:'01', title:'Excellence Académique',    desc:'Nous nous engageons à offrir un enseignement de haute qualité qui prépare nos élèves à réussir dans leurs études et au-delà.', grad:'from-blue-500 to-sky-500' },
              { icon: Heart,     num:'02', title:'Développement Intégral',   desc:'Nous cultivons le développement intellectuel, moral, émotionnel et physique de chaque élève.', grad:'from-teal-500 to-emerald-600' },
              { icon: Users,     num:'03', title:'Inclusion et Respect',     desc:'Chaque élève est valorisé et respecté. Nous créons un environnement inclusif où la diversité est une force.', grad:'from-indigo-500 to-purple-600' },
              { icon: Lightbulb, num:'04', title:'Innovation et Créativité', desc:"Nous encourageons la pensée créative et l'innovation pour préparer nos élèves au monde en constante évolution.", grad:'from-sky-500 to-cyan-500' },
              { icon: Globe,     num:'05', title:'Responsabilité Sociale',   desc:'Nous formons des citoyens responsables engagés envers leur communauté et leur environnement.', grad:'from-teal-600 to-green-600' },
              { icon: Handshake, num:'06', title:'Collaboration',            desc:'Nous travaillons en étroite collaboration avec les parents, les élèves et la communauté locale.', grad:'from-violet-500 to-indigo-600' },
            ].map(({ icon: Icon, num, title, desc, grad }) => (
              <div key={num} className="group bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                <div className={`w-14 h-14 bg-gradient-to-br ${grad} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-white/25 text-xs font-bold tracking-widest mb-1">{num}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
                <p className="text-blue-100/70 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Media ── */}
      <section id="media" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-widest">Galerie</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-gray-900">La Vie à Sully</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-blue-700 mx-auto rounded-full" />
            <p className="text-gray-500 mt-6 max-w-2xl mx-auto">
              Découvrez les moments importants de la vie de notre établissement à travers nos photos et vidéos.
            </p>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center">
                <Building2 className="w-4 h-4 text-white" />
              </span>
              Photos de l'École
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { src:'/gym.png',    label:'Gymnase & Sports',        sub:'Installations sportives' },
                { src:'/ecole.png',  label:'Bâtiment Principal',      sub:'Notre établissement' },
                { src:'/classe.jpg', label:'Salle de Classe',         sub:"Environnement d'apprentissage" },
                { src:'/groupe.png', label:'Élèves & Communauté',     sub:'Vie scolaire' },
                { src:'/dessin.jpg', label:'Activités Artistiques',   sub:'Créativité & expression' },
                { src:'/ecole.png',  label:'Espaces Communs',         sub:'Lieux de partage' },
              ].map((p, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                  <img src={p.src} alt={p.label} className="aspect-square w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:from-black/80 transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-bold text-white text-sm">{p.label}</p>
                    <p className="text-white/60 text-xs">{p.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <Play className="w-4 h-4 text-white" />
              </span>
              Vidéos Événements
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title:'Journée Portes Ouvertes',    dur:'2:30 min', grad:'from-blue-800 to-indigo-900' },
                { title:"Spectacle de Fin d'Année",   dur:'5:45 min', grad:'from-teal-800 to-emerald-900' },
                { title:'Projection Tour du Monde',   dur:'3:15 min', grad:'from-sky-800 to-cyan-900' },
                { title:'Championnat de Sports',      dur:'4:20 min', grad:'from-indigo-800 to-violet-900' },
              ].map((v, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
                  <div className={`aspect-video bg-gradient-to-br ${v.grad} relative`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/15 backdrop-blur-sm border-2 border-white/40 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-white/25 transition-all duration-300">
                        <Play className="w-7 h-7 text-white fill-current ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <h4 className="text-white font-bold">{v.title}</h4>
                      <p className="text-white/55 text-sm">{v.dur}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-15"
          style={{backgroundImage:'radial-gradient(circle at 80% 15%, #10b981 0%, transparent 40%), radial-gradient(circle at 20% 85%, #38bdf8 0%, transparent 40%)'}} />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-teal-400 font-semibold text-sm uppercase tracking-widest">Restez en contact</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">Nous Contacter</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-400 to-sky-400 mx-auto rounded-full" />
            <p className="text-blue-100/70 mt-6 max-w-xl mx-auto">
              Une question ? Un projet ? N'hésitez pas à nous écrire, nous vous répondrons rapidement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon:Phone,  label:'Téléphone', value:'+261 20 85 234 94', sub:'+261 34 16 351 52', note:'Lun-Ven: 8h–17h',        grad:'from-blue-500 to-sky-600' },
              { icon:Mail,   label:'Email',     value:'sully.amb@sully.mg',sub:'',                  note:'Réponse rapide garantie', grad:'from-teal-500 to-emerald-600' },
              { icon:MapPin, label:'Adresse',   value:'Lot IV A 16 Bis Ambodivonkely', sub:'Antananarivo 101', note:'Madagascar', grad:'from-indigo-500 to-violet-600' },
            ].map(({ icon:Icon, label, value, sub, note, grad }) => (
              <div key={label} className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 flex flex-col items-center text-center">
                <div className={`w-14 h-14 bg-gradient-to-br ${grad} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{label}</h3>
                <p className="font-medium text-sm">{value}</p>
                {sub && <p className="text-blue-200 text-sm">{sub}</p>}
                <p className="text-blue-100/50 text-xs mt-1">{note}</p>
              </div>
            ))}
          </div>

          <ContactForm />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-950 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img src="/logo.png" width="44" height="44" alt="Logo" className="rounded-full" />
                <div>
                  <span className="text-xl font-bold text-white">École Collège Sully</span>
                  <p className="text-gray-400 text-xs tracking-widest uppercase">Excellence Éducative</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
                Institution d'excellence éducative franco-malgache depuis 1957. Formant les leaders de demain.
              </p>
              <div className="flex gap-3">
                {['F','I','L'].map((l, i) => (
                  <div key={i} className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-teal-600 transition-colors">
                    <span className="text-white text-xs font-bold">{l}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-5 text-xs uppercase tracking-widest">Navigation</h4>
              <ul className="space-y-3">
                {[['home','Accueil'],['about','À Propos'],['programs','Programmes'],['values','Valeurs'],['media','Médias'],['contact','Contact']].map(([id,lbl]) => (
                  <li key={id}>
                    <button onClick={() => scrollToSection(id)}
                      className="text-gray-400 hover:text-teal-400 transition-colors text-sm flex items-center gap-2 group">
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {lbl}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-5 text-xs uppercase tracking-widest">Contact</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-0.5 text-teal-400 flex-shrink-0" />
                  <span>+261 20 85 234 94<br />+261 34 16 351 52</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-0.5 text-teal-400 flex-shrink-0" />
                  <span>sully.amb@sully.mg</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-teal-400 flex-shrink-0" />
                  <span>Lot IV A 16 Bis Ambodivonkely<br />Antananarivo 101, Madagascar</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">&copy; 2024 École Collège Sully. Tous droits réservés.</p>
            <p className="text-gray-700 text-xs tracking-widest">Savoir · Savoir-faire · Savoir-être</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
