"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { SiteChrome } from "./site-chrome";

gsap.registerPlugin(ScrollTrigger);

type StoryBlock = {
  kicker: string;
  title: string;
  body: string;
  proof: string;
  bullets: string[];
};

const storyBlocks: StoryBlock[] = [
  {
    kicker: "Etapa 01",
    title: "Unificamos la lectura operativa en un solo pulso",
    body: "Conectamos WMS, rutas, patio y entregas para que cada equipo vea la misma verdad en tiempo real.",
    proof: "De silos aislados a un command center unico para operaciones y comercial.",
    bullets: [
      "Eventos de deposito, picking y despacho en un stream comun.",
      "Visibilidad por cliente, ruta, unidad y franja horaria.",
      "Alertas tempranas para desvio de SLA antes del impacto final.",
    ],
  },
  {
    kicker: "Etapa 02",
    title: "Automatizamos decisiones repetitivas de alto costo",
    body: "Motor de reglas para reasignar recursos, ajustar ventanas y priorizar incidencias sin esperar reuniones.",
    proof: "Menos dependencia de urgencias manuales y menos horas improductivas.",
    bullets: [
      "Priorizacion dinamica por criticidad comercial.",
      "Playbooks automaticos para quiebres de stock y atrasos.",
      "Escalamiento inteligente con trazabilidad completa.",
    ],
  },
  {
    kicker: "Etapa 03",
    title: "Escalamos con control de margen y nivel de servicio",
    body: "Con dashboards ejecutivos y operativos, cada responsable ve costo por entrega, capacidad y cumplimiento en vivo.",
    proof: "Operacion mas predecible y decisiones de expansion basadas en datos.",
    bullets: [
      "Tablero por unidad de negocio con metas compartidas.",
      "Ciclos de mejora continua sobre indicadores claves.",
      "Simulacion de escenarios para picos de demanda.",
    ],
  },
];

export function LogisticsB2BStory() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const sceneHostRef = useRef<HTMLDivElement | null>(null);
  const cinematicRef = useRef<HTMLElement | null>(null);
  const audioOrbRef = useRef<HTMLDivElement | null>(null);
  const scrollProgressRef = useRef(0);
  const audioAnalyserRef = useRef<AnalyserNode | null>(null);
  const audioDataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const [audioPulseEnabled, setAudioPulseEnabled] = useState(false);

  useEffect(() => {
    if (!audioPulseEnabled) {
      oscillatorRef.current?.stop();
      oscillatorRef.current?.disconnect();
      ambientGainRef.current?.disconnect();
      audioAnalyserRef.current?.disconnect();
      audioContextRef.current?.close();
      oscillatorRef.current = null;
      ambientGainRef.current = null;
      audioAnalyserRef.current = null;
      audioDataRef.current = null;
      audioContextRef.current = null;
      return;
    }

    const AudioCtor = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return;

    const context = new AudioCtor();
    const oscillator = context.createOscillator();
    const lfo = context.createOscillator();
    const lfoGain = context.createGain();
    const ambientGain = context.createGain();
    const analyser = context.createAnalyser();

    analyser.fftSize = 128;
    ambientGain.gain.value = 0.009;
    oscillator.type = "triangle";
    oscillator.frequency.value = 56;
    lfo.type = "sine";
    lfo.frequency.value = 0.15;
    lfoGain.gain.value = 18;

    oscillator.connect(ambientGain);
    ambientGain.connect(analyser);
    analyser.connect(context.destination);

    lfo.connect(lfoGain);
    lfoGain.connect(oscillator.frequency);

    oscillator.start();
    lfo.start();
    context.resume();

    oscillatorRef.current = oscillator;
    ambientGainRef.current = ambientGain;
    audioAnalyserRef.current = analyser;
    audioDataRef.current = new Uint8Array(analyser.frequencyBinCount);
    audioContextRef.current = context;

    return () => {
      lfo.stop();
      oscillator.stop();
      lfo.disconnect();
      lfoGain.disconnect();
      oscillator.disconnect();
      ambientGain.disconnect();
      analyser.disconnect();
      context.close();

      oscillatorRef.current = null;
      ambientGainRef.current = null;
      audioAnalyserRef.current = null;
      audioDataRef.current = null;
      audioContextRef.current = null;
    };
  }, [audioPulseEnabled]);

  useEffect(() => {
    if (!pageRef.current) return;

    const root = pageRef.current;
    const sceneHost = sceneHostRef.current;

    const gsapContext = gsap.context(() => {
      gsap.fromTo(
        ".js-hero-reveal",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.08,
        },
      );

      gsap.to(".js-parallax-deep", {
        yPercent: -26,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=1100",
          scrub: true,
        },
      });

      gsap.to(".js-parallax-mid", {
        yPercent: -15,
        xPercent: 4,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=1100",
          scrub: true,
        },
      });

      gsap.to(".js-parallax-front", {
        yPercent: -8,
        xPercent: -3,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=1000",
          scrub: true,
        },
      });

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.utils.toArray<HTMLElement>(".js-chapter").forEach((chapter) => {
          gsap.fromTo(
            chapter,
            {
              clipPath: "inset(14% 0% 0% 0% round 22px)",
              opacity: 0.42,
              y: 84,
            },
            {
              clipPath: "inset(0% 0% 0% 0% round 0px)",
              opacity: 1,
              y: 0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: chapter,
                start: "top 82%",
                end: "top 34%",
                scrub: true,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>(".js-chapter-band").forEach((band) => {
          gsap.fromTo(
            band,
            { scaleX: 0.68, opacity: 0.2 },
            {
              scaleX: 1,
              opacity: 0.9,
              transformOrigin: "center",
              ease: "power2.out",
              scrollTrigger: {
                trigger: band,
                start: "top 90%",
                end: "top 56%",
                scrub: true,
              },
            },
          );
        });
      }

      const cinematicCards = gsap.utils.toArray<HTMLElement>(".js-stage-card");
      cinematicCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0.34, y: 36, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 66%",
              end: "bottom 45%",
              scrub: true,
              toggleClass: {
                targets: card,
                className: "is-active",
              },
            },
          },
        );

        gsap.to(card, {
          borderColor: "rgba(209, 228, 255, 0.5)",
          boxShadow: "0 12px 40px rgba(41, 101, 188, 0.28)",
          scrollTrigger: {
            trigger: card,
            start: "top 56%",
            end: "bottom 44%",
            scrub: true,
          },
        });

        gsap.to(".js-stage-index", {
          x: index * 8,
          opacity: 0.45 + index * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 58%",
            end: "bottom 42%",
            scrub: true,
          },
        });

        gsap.to(`.js-theme-layer-${index}`, {
          opacity: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 64%",
            end: "top 36%",
            scrub: true,
          },
        });

        gsap.to(`.js-theme-layer-${index}`, {
          opacity: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "bottom 56%",
            end: "bottom 24%",
            scrub: true,
          },
        });
      });

      if (cinematicRef.current && window.matchMedia("(min-width: 1024px)").matches) {
        const scenePanel = root.querySelector<HTMLElement>(".js-scene-panel");
        if (scenePanel) {
          ScrollTrigger.create({
            trigger: cinematicRef.current,
            start: "top 12%",
            end: "+=1450",
            pin: scenePanel,
            pinSpacing: false,
            scrub: true,
          });
        }
      }

      if (
        window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        gsap.utils.toArray<HTMLElement>(".js-magnetic").forEach((button) => {
          const moveX = gsap.quickTo(button, "x", {
            duration: 0.25,
            ease: "power3.out",
          });
          const moveY = gsap.quickTo(button, "y", {
            duration: 0.25,
            ease: "power3.out",
          });

          const onMove = (event: MouseEvent) => {
            const bounds = button.getBoundingClientRect();
            const x = (event.clientX - bounds.left - bounds.width / 2) * 0.18;
            const y = (event.clientY - bounds.top - bounds.height / 2) * 0.25;
            moveX(x);
            moveY(y);
          };

          const onLeave = () => {
            moveX(0);
            moveY(0);
          };

          button.addEventListener("mousemove", onMove);
          button.addEventListener("mouseleave", onLeave);

          gsapContext.add(() => {
            button.removeEventListener("mousemove", onMove);
            button.removeEventListener("mouseleave", onLeave);
          });
        });
      }

      gsap.utils.toArray<HTMLElement>(".js-logi-reveal").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 44, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;
        },
      });
    }, root);

    if (!sceneHost) {
      return () => {
        gsapContext.revert();
      };
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      sceneHost.clientWidth / sceneHost.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0.4, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(sceneHost.clientWidth, sceneHost.clientHeight);
    renderer.setClearColor(0x000000, 0);
    sceneHost.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xd6e7ff, 0.65);
    const keyLight = new THREE.DirectionalLight(0x8ec5ff, 1.3);
    keyLight.position.set(4, 5, 8);
    const rimLight = new THREE.DirectionalLight(0x7fffd4, 0.9);
    rimLight.position.set(-5, 2, -4);
    scene.add(ambient, keyLight, rimLight);

    const systemGroup = new THREE.Group();
    scene.add(systemGroup);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x9bc4ff,
      transparent: true,
      opacity: 0.6,
    });

    const loops: THREE.Line[] = [];
    for (let i = 0; i < 3; i += 1) {
      const radius = 2.2 + i * 0.75;
      const curve = new THREE.EllipseCurve(0, 0, radius, radius * 0.55);
      const curvePoints = curve.getPoints(160) as Array<{ x: number; y: number }>;
      const points = curvePoints.map((point) => new THREE.Vector3(point.x, point.y, 0));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const ring = new THREE.LineLoop(geometry, lineMaterial.clone());
      ring.rotation.x = i * 0.45 + 0.18;
      ring.rotation.y = i * 0.3;
      loops.push(ring);
      systemGroup.add(ring);
    }

    const nodeGeometry = new THREE.BoxGeometry(0.24, 0.24, 0.24);
    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0xe9f4ff,
      metalness: 0.35,
      roughness: 0.2,
      emissive: 0x4f8cff,
      emissiveIntensity: 0.25,
    });

    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < 18; i += 1) {
      const cube = new THREE.Mesh(nodeGeometry, nodeMaterial);
      const angle = (i / 18) * Math.PI * 2;
      cube.position.set(Math.cos(angle) * 3.2, Math.sin(angle * 1.8) * 1.2, Math.sin(angle) * 2.6);
      cube.scale.setScalar(0.8 + (i % 3) * 0.16);
      nodes.push(cube);
      systemGroup.add(cube);
    }

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 420;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const stride = i * 3;
      positions[stride] = (Math.random() - 0.5) * 18;
      positions[stride + 1] = (Math.random() - 0.5) * 10;
      positions[stride + 2] = (Math.random() - 0.5) * 14;
    }
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x95bfff,
      size: 0.035,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const clock = new THREE.Clock();
    let rafId = 0;

    const renderFrame = () => {
      const elapsed = clock.getElapsedTime();
      const progress = scrollProgressRef.current;
      let audioLevel = 0;

      if (audioAnalyserRef.current && audioDataRef.current) {
        audioAnalyserRef.current.getByteFrequencyData(audioDataRef.current);
        let sum = 0;
        for (let i = 0; i < audioDataRef.current.length; i += 1) {
          sum += audioDataRef.current[i];
        }
        audioLevel = sum / (audioDataRef.current.length * 255);
      }

      systemGroup.rotation.y += (progress * Math.PI * 1.3 - systemGroup.rotation.y) * 0.06;
      systemGroup.rotation.x = 0.08 + Math.sin(elapsed * 0.32) * 0.08;

      camera.position.z = 9 - progress * 2.8;
      camera.position.y = 0.4 + progress * 0.9;
      camera.lookAt(0, 0, 0);

      loops.forEach((ring, index) => {
        ring.rotation.z += 0.0018 + index * 0.0008;
      });

      nodes.forEach((cube, index) => {
        cube.rotation.x += 0.006;
        cube.rotation.y += 0.008 + progress * 0.012;
        cube.position.y += Math.sin(elapsed * 1.7 + index) * 0.0018;
      });

      nodeMaterial.emissiveIntensity = 0.2 + progress * 0.24 + audioLevel * 0.62;

      particles.rotation.y = elapsed * 0.025;
      particles.rotation.x = Math.sin(elapsed * 0.18) * 0.07;
      particlesMaterial.opacity = 0.45 + audioLevel * 0.55;

      if (audioOrbRef.current) {
        audioOrbRef.current.style.opacity = `${0.14 + audioLevel * 0.6}`;
        audioOrbRef.current.style.transform = `scale(${1 + audioLevel * 0.26})`;
      }

      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(renderFrame);
    };

    renderFrame();

    const handleResize = () => {
      if (!sceneHost) return;
      camera.aspect = sceneHost.clientWidth / sceneHost.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(sceneHost.clientWidth, sceneHost.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(rafId);
      gsapContext.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === root) trigger.kill();
      });
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      loops.forEach((ring) => {
        ring.geometry.dispose();
        if (Array.isArray(ring.material)) {
          ring.material.forEach((mat) => mat.dispose());
        } else {
          ring.material.dispose();
        }
      });
      renderer.dispose();
      scene.clear();
      if (sceneHost.contains(renderer.domElement)) {
        sceneHost.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <SiteChrome>
      <div
        ref={pageRef}
        className="relative overflow-hidden bg-[radial-gradient(circle_at_18%_8%,rgba(130,167,218,0.28),transparent_42%),radial-gradient(circle_at_82%_14%,rgba(205,219,241,0.17),transparent_39%),linear-gradient(180deg,#060f1f_0%,#08162b_42%,#050d1a_100%)]"
      >
        <div className="js-theme-layer-0 pointer-events-none absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_22%_20%,rgba(131,177,242,0.34),transparent_44%),linear-gradient(180deg,rgba(8,21,38,0.15),rgba(3,11,23,0.25))]" />
        <div className="js-theme-layer-1 pointer-events-none absolute inset-0 opacity-8 bg-[radial-gradient(circle_at_72%_24%,rgba(150,238,214,0.35),transparent_42%),linear-gradient(180deg,rgba(5,31,36,0.2),rgba(3,15,26,0.25))]" />
        <div className="js-theme-layer-2 pointer-events-none absolute inset-0 opacity-8 bg-[radial-gradient(circle_at_58%_70%,rgba(255,192,146,0.34),transparent_46%),linear-gradient(180deg,rgba(42,21,8,0.18),rgba(20,12,6,0.26))]" />
        <div className="js-parallax-deep pointer-events-none absolute -top-16 left-[14%] h-64 w-64 rounded-full bg-[#6da5f6]/20 blur-3xl" />
        <div className="js-parallax-mid pointer-events-none absolute top-[26%] right-[8%] h-56 w-56 rounded-full bg-[#a8dcff]/20 blur-3xl" />
        <div className="js-parallax-front pointer-events-none absolute bottom-[19%] left-[8%] h-40 w-40 rounded-full bg-[#a8b9ff]/16 blur-3xl" />
        <div className="pointer-events-none absolute top-[22%] right-[18%] h-56 w-56 rounded-full bg-[#b0d2ff]/20 blur-3xl transition-transform duration-300" ref={audioOrbRef} />
        <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:48px_48px]" />

        <section className="js-chapter container mx-auto max-w-[1440px] px-5 md:px-10 lg:px-20 pt-14 md:pt-20 lg:pt-24 pb-16 md:pb-20">
          <div className="max-w-4xl">
            <p className="js-hero-reveal text-[11px] md:text-xs uppercase tracking-[0.24em] text-[#cddbf1] mb-4">
              Servicio B2B | Automatizacion Logistica
            </p>
            <h1 className="js-hero-reveal font-serif text-4xl md:text-6xl xl:text-7xl leading-[0.96] tracking-tight text-white max-w-5xl">
              Tu operacion deja de reaccionar.
              <span className="block text-[#b9d5ff]">Empieza a anticiparse.</span>
            </h1>
            <p className="js-hero-reveal mt-6 text-base md:text-lg text-white/90 leading-relaxed max-w-3xl">
              Disenamos sistemas de automatizacion logistica para empresas B2B que necesitan crecer sin
              perder control de costos, SLA ni experiencia del cliente.
            </p>

            <div className="js-hero-reveal mt-8 flex flex-wrap gap-3">
              <Link
                href="/evaluacion"
                className="js-magnetic inline-flex items-center rounded-full border border-[var(--primary)] bg-[var(--primary)] px-6 md:px-7 py-3 text-sm font-bold tracking-wide text-[var(--text-primary)] shadow-[0_10px_24px_rgba(0,0,0,0.35)] hover:bg-[color:color-mix(in_oklab,var(--primary)_90%,white_10%)] transition-colors"
              >
                Pedir diagnostico operativo
              </Link>
              <Link
                href="/portafolio"
                className="js-magnetic inline-flex items-center rounded-full border border-white/45 px-6 md:px-7 py-3 text-sm font-semibold text-white/90 hover:border-white hover:text-white transition-colors"
              >
                Ver casos de referencia
              </Link>
              <button
                type="button"
                onClick={() => setAudioPulseEnabled((prev) => !prev)}
                aria-pressed={audioPulseEnabled}
                className="js-magnetic inline-flex items-center rounded-full border border-[#b4d7ff]/50 px-6 md:px-7 py-3 text-sm font-semibold text-[#d6e9ff] hover:border-[#d6e9ff] hover:text-white transition-colors"
              >
                {audioPulseEnabled ? "Desactivar pulso sonoro" : "Activar pulso sonoro"}
              </button>
            </div>
          </div>
        </section>

        <div className="js-chapter-band container mx-auto max-w-[1440px] px-5 md:px-10 lg:px-20 pb-8 md:pb-10">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#cfe2ff]/80 to-transparent" />
        </div>

        <section
          ref={cinematicRef}
          className="js-chapter container mx-auto max-w-[1440px] px-5 md:px-10 lg:px-20 pb-14 md:pb-20 lg:pb-28"
        >
          <div className="mb-5 flex items-center gap-3 text-[#cddbf1]">
            <span className="text-xs uppercase tracking-[0.2em]">Narrativa por Scroll</span>
            <div className="h-px flex-1 bg-white/20" />
            <span className="js-stage-index text-xs tracking-[0.16em]">Etapas 01-03</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] gap-8 lg:gap-10 xl:gap-14 items-start">
            <div className="order-2 lg:order-1 space-y-6 md:space-y-8">
              {storyBlocks.map((item) => (
                <article
                  key={item.title}
                  className="js-logi-reveal js-stage-card rounded-2xl border border-[var(--primary)]/25 bg-[color:rgba(50,57,82,0.72)] backdrop-blur-md p-5 md:p-7 lg:p-8 transition-colors"
                >
                  <p className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-[#cddbf1] mb-3">
                    {item.kicker}
                  </p>
                  <h2 className="font-serif text-2xl md:text-3xl leading-tight tracking-tight mb-4">{item.title}</h2>
                  <p className="text-sm md:text-base text-white/88 leading-relaxed mb-5">{item.body}</p>
                  <p className="text-sm md:text-base text-[#d8e7ff] font-semibold mb-5">{item.proof}</p>
                  <ul className="space-y-2.5">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="text-sm md:text-[15px] text-white/86 leading-relaxed">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="order-1 lg:order-2 lg:sticky lg:top-28">
              <div className="js-scene-panel rounded-2xl border border-[#9dc5ff]/35 bg-[linear-gradient(160deg,rgba(148,188,255,0.18),rgba(7,15,28,0.12))] p-3 md:p-4 shadow-[0_24px_70px_rgba(10,30,60,0.35)]">
                <div
                  ref={sceneHostRef}
                  className="h-[280px] sm:h-[360px] lg:h-[520px] rounded-xl bg-[radial-gradient(circle_at_42%_24%,rgba(169,206,255,0.24),rgba(6,17,33,0.95)_58%)]"
                  aria-label="Visual de red logistica sincronizada con scroll"
                />
              </div>

              <div className="mt-5 rounded-2xl border border-[var(--primary)]/25 bg-[color:rgba(50,57,82,0.7)] p-4 md:p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[#cddbf1] mb-3">Impacto Esperado</p>
                <div className="grid grid-cols-3 gap-2 md:gap-3 text-center">
                  <div className="rounded-lg bg-[color:rgba(50,57,82,0.62)] p-2.5 md:p-3">
                    <p className="text-xl md:text-2xl font-bold text-white">-32%</p>
                    <p className="text-[11px] md:text-xs text-white/70 mt-1">incidencias</p>
                  </div>
                  <div className="rounded-lg bg-[color:rgba(50,57,82,0.62)] p-2.5 md:p-3">
                    <p className="text-xl md:text-2xl font-bold text-white">+24%</p>
                    <p className="text-[11px] md:text-xs text-white/70 mt-1">SLA on-time</p>
                  </div>
                  <div className="rounded-lg bg-[color:rgba(50,57,82,0.62)] p-2.5 md:p-3">
                    <p className="text-xl md:text-2xl font-bold text-white">-18%</p>
                    <p className="text-[11px] md:text-xs text-white/70 mt-1">costo por viaje</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="js-chapter-band container mx-auto max-w-[1440px] px-5 md:px-10 lg:px-20 pb-8 md:pb-10">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d9ecff]/85 to-transparent" />
        </div>

        <section className="js-chapter container mx-auto max-w-[1440px] px-5 md:px-10 lg:px-20 pb-16 md:pb-24">
          <div className="js-logi-reveal rounded-3xl border border-[var(--primary)]/30 bg-[linear-gradient(155deg,rgba(50,57,82,0.74),rgba(8,19,36,0.62))] p-6 md:p-8 lg:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-[#dceaff] mb-4">Listo para acelerar</p>
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight max-w-4xl">
              Si tu operacion crece, tu sistema tambien tiene que crecer.
            </h3>
            <p className="mt-4 text-base md:text-lg text-white/88 max-w-3xl leading-relaxed">
              En 3 semanas armamos el mapa de automatizacion, priorizamos quick wins y dejamos una hoja de ruta
              ejecutable con impacto medible para negocio y operaciones.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/comenzar"
                className="js-magnetic inline-flex items-center rounded-full border border-[var(--primary)] bg-[var(--primary)] px-6 py-3 text-sm md:text-base font-bold text-[var(--text-primary)] shadow-[0_10px_24px_rgba(0,0,0,0.35)] hover:bg-[color:color-mix(in_oklab,var(--primary)_90%,white_10%)] transition-colors"
              >
                Agendar workshop ejecutivo
              </Link>
              <Link
                href="/recursos"
                className="js-magnetic inline-flex items-center rounded-full border border-white/40 text-white px-6 py-3 text-sm md:text-base font-semibold hover:border-white transition-colors"
              >
                Descargar playbook logistico
              </Link>
            </div>
          </div>
        </section>
      </div>
    </SiteChrome>
  );
}
