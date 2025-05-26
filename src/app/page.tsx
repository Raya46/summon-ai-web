"use client";
import CardPaced from "@/components/card-paced";
import CardProject from "@/components/card-project";
import Navbar from "@/components/navbar";
import ParticleBackground from "@/components/particles";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinnedElementRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  panelRefs.current = [];

  const navbarWrapperRef = useRef<HTMLDivElement>(null);
  const particleWrapperRef = useRef<HTMLDivElement>(null);
  const ellipsRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const summonTextRef = useRef<HTMLParagraphElement>(null);

  const identifyStepRef = useRef<HTMLParagraphElement>(null);
  const designStepRef = useRef<HTMLParagraphElement>(null);
  const developStepRef = useRef<HTMLParagraphElement>(null);

  const heroTriggerRef = useRef<HTMLDivElement>(null);
  const pinnedHeroElementRef = useRef<HTMLDivElement>(null);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !panelRefs.current.includes(el)) {
      panelRefs.current.push(el);
    }
  };

  useLayoutEffect(() => {
    if (navbarWrapperRef.current) {
      gsap.set(navbarWrapperRef.current, { autoAlpha: 0, y: -50 });
    }
    if (particleWrapperRef.current) {
      gsap.set(particleWrapperRef.current, { autoAlpha: 0 });
    }
    if (ellipsRef.current) {
      gsap.set(ellipsRef.current, { autoAlpha: 0, scale: 0.1 });
    }
    if (descRef.current) {
      gsap.set(descRef.current, { autoAlpha: 0, scale: 0.8 });
    }
    if (summonTextRef.current) {
      gsap.set(summonTextRef.current, { autoAlpha: 0.6, scale: 0.7 });
    }

    if (
      identifyStepRef.current &&
      designStepRef.current &&
      developStepRef.current
    ) {
      gsap.set(
        [
          identifyStepRef.current,
          designStepRef.current,
          developStepRef.current,
        ],
        { autoAlpha: 0, y: 20 }
      );
      gsap.set(identifyStepRef.current, { color: "#60A5FA" });
      gsap.set(designStepRef.current, { color: "#4B5563" });
      gsap.set(developStepRef.current, { color: "#4B5563" });
    }

    if (panelRefs.current.length === 3) {
      panelRefs.current.forEach((panel, i) => {
        if (panel) {
          gsap.set(panel.querySelectorAll(".fade-in"), { autoAlpha: 0 });

          if (i === 1) {
            const midGlobe = panel.querySelector("#globe-mid-design");
            const leftGlobe = panel.querySelector("#globe-side-left");
            const rightGlobe = panel.querySelector("#globe-side-right");

            if (midGlobe) {
              gsap.set(midGlobe, {
                autoAlpha: 0,
                scale: 0.7,
                yPercent: 10,
              });
            }
            if (leftGlobe) {
              gsap.set(leftGlobe, {
                autoAlpha: 0,
                scale: 0.5,
                x: 50,
                xPercent: 50,
                rotation: -180,
                yPercent: 10,
                zIndex: -1,
              });
            }
            if (rightGlobe) {
              gsap.set(rightGlobe, {
                autoAlpha: 0,
                scale: 0.5,
                xPercent: -50,
                rotation: 180,
                yPercent: 10,
                zIndex: -1,
              });
            }
          } else if (i === 2) {
            const polygons = panel.querySelectorAll("[id^='globe-polygon-']");
            if (polygons.length > 0) {
              gsap.set(polygons, { autoAlpha: 0, scale: 0.5 });
            }
          }
        }
      });
    }

    if (heroTriggerRef.current && pinnedHeroElementRef.current) {
      ScrollTrigger.create({
        trigger: heroTriggerRef.current,
        pin: pinnedHeroElementRef.current,
        start: "top top",
        end: "+=60%",
      });
    }

    const tlIntro = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "+=5%",
        scrub: false,
        once: true,
        onEnter: () => {
          if (navbarWrapperRef.current) {
            gsap.to(navbarWrapperRef.current, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              delay: 0.5,
            });
          }
          if (particleWrapperRef.current) {
            gsap.to(particleWrapperRef.current, {
              autoAlpha: 1,
              duration: 0.7,
              ease: "none",
              delay: 0.7,
            });
          }
          if (ellipsRef.current) {
            gsap.to(ellipsRef.current, {
              autoAlpha: 1,
              scale: 1,
              duration: 1.2,
              ease: "power1.inOut",
              delay: 0.3,
            });
          }
          if (descRef.current) {
            gsap.to(descRef.current, {
              autoAlpha: 1,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.7)",
              delay: 1.1,
            });
          }
          if (summonTextRef.current) {
            gsap.to(summonTextRef.current, {
              autoAlpha: 1,
              scale: 1,
              duration: 1.2,
              ease: "power1.inOut",
              delay: 0.3,
            });
          }
        },
      },
    });

    if (
      triggerRef.current &&
      pinnedElementRef.current &&
      horizontalTrackRef.current &&
      panelRefs.current.length === 3
    ) {
      const panels = panelRefs.current.filter(
        (el) => el !== null
      ) as HTMLDivElement[];

      const updateStepHighlight = (activeIndex: number) => {
        const steps = [
          identifyStepRef.current,
          designStepRef.current,
          developStepRef.current,
        ];
        steps.forEach((step, index) => {
          if (step) {
            gsap.to(step, {
              color: index === activeIndex ? "#60A5FA" : "#4B5563",
              duration: 0.3,
            });
          }
        });
      };

      const horizontalScrollTween = gsap.to(horizontalTrackRef.current, {
        x: () =>
          `-${horizontalTrackRef.current!.scrollWidth - window.innerWidth}px`,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: () => `+=1000`,
          pin: pinnedElementRef.current,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel, i) => {
        const animatePanel2Globes = () => {
          const midGlobe = panel.querySelector("#globe-mid-design");
          const leftGlobe = panel.querySelector("#globe-side-left");
          const rightGlobe = panel.querySelector("#globe-side-right");

          if (midGlobe && leftGlobe && rightGlobe) {
            gsap.set(midGlobe, {
              autoAlpha: 0,
              scale: 0.7,
              yPercent: 10,
            });
            gsap.set(leftGlobe, {
              autoAlpha: 0,
              scale: 0.5,
              x: 50,
              xPercent: 50,
              rotation: -180,
              yPercent: 10,
              zIndex: -1,
            });
            gsap.set(rightGlobe, {
              autoAlpha: 0,
              scale: 0.5,
              xPercent: -50,
              rotation: 180,
              yPercent: 10,
              zIndex: -1,
            });

            const tl = gsap.timeline();
            tl.to(midGlobe, {
              autoAlpha: 1,
              scale: 1,
              yPercent: 0,
              duration: 0.6,
              ease: "power2.out",
              overwrite: "auto",
            })
              .to(
                leftGlobe,
                {
                  autoAlpha: 1,
                  xPercent: 0,
                  x: 100,
                  scale: 1,
                  rotation: 0,
                  yPercent: 0,
                  duration: 1.3,
                  ease: "back.out(1.7)",
                  overwrite: "auto",
                  zIndex: 1,
                },
                "-=0.4"
              )
              .to(
                rightGlobe,
                {
                  autoAlpha: 1,
                  xPercent: 0,
                  x: -100,
                  scale: 1,
                  rotation: 0,
                  yPercent: 0,
                  duration: 1.3,
                  ease: "back.out(1.7)",
                  overwrite: "auto",
                  zIndex: 1,
                },
                "<0.15"
              );
          }
        };

        const hidePanel2Globes = () => {
          const midGlobe = panel.querySelector("#globe-mid-design");
          const leftGlobe = panel.querySelector("#globe-side-left");
          const rightGlobe = panel.querySelector("#globe-side-right");
          if (midGlobe && leftGlobe && rightGlobe) {
            gsap.to([midGlobe, leftGlobe, rightGlobe], {
              autoAlpha: 0,
              duration: 0.3,
              overwrite: "auto",
            });
          }
        };

        if (i === 1) {
          ScrollTrigger.create({
            trigger: panel,
            containerAnimation: horizontalScrollTween,
            start: "left center",
            end: "right center",
            onEnter: () => {
              gsap.to(panel.querySelectorAll(".fade-in"), {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.15,
                overwrite: "auto",
              });
              animatePanel2Globes();
              updateStepHighlight(i);
            },
            onEnterBack: () => {
              gsap.to(panel.querySelectorAll(".fade-in"), {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.15,
                overwrite: "auto",
              });
              animatePanel2Globes();
              updateStepHighlight(i);
            },
            onLeave: () => {
              gsap.to(panel.querySelectorAll(".fade-in"), {
                autoAlpha: 0,
                y: 50,
                overwrite: "auto",
              });
              hidePanel2Globes();
            },
            onLeaveBack: () => {
              gsap.to(panel.querySelectorAll(".fade-in"), {
                autoAlpha: 0,
                y: 50,
                overwrite: "auto",
              });
              hidePanel2Globes();
            },
          });
        } else {
          ScrollTrigger.create({
            trigger: panel,
            containerAnimation: horizontalScrollTween,
            start: "left center",
            end: "right center",
            onEnter: () => {
              gsap.to(panel.querySelectorAll(".fade-in"), {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.15,
                overwrite: "auto",
              });
              const polygons = panel.querySelectorAll("[id^='globe-polygon-']");
              if (polygons.length > 0) {
                gsap.set(polygons, { autoAlpha: 0, scale: 0.5 });
                gsap.to(polygons, {
                  autoAlpha: 1,
                  scale: 1,
                  duration: 0.6,
                  stagger: 0.1,
                  ease: "power2.out",
                  overwrite: "auto",
                  delay: 0.3,
                });
              }
              updateStepHighlight(i);
            },
            onEnterBack: () => {
              gsap.to(panel.querySelectorAll(".fade-in"), {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.15,
                overwrite: "auto",
              });
              const polygons = panel.querySelectorAll("[id^='globe-polygon-']");
              if (polygons.length > 0) {
                gsap.set(polygons, { autoAlpha: 0, scale: 0.5 });
                gsap.to(polygons, {
                  autoAlpha: 1,
                  scale: 1,
                  duration: 0.6,
                  stagger: 0.1,
                  ease: "power2.out",
                  overwrite: "auto",
                  delay: 0.3,
                });
              }
              updateStepHighlight(i);
            },
            onLeave: () => {
              gsap.to(panel.querySelectorAll(".fade-in"), {
                autoAlpha: 0,
                y: 50,
                overwrite: "auto",
              });
              const polygons = panel.querySelectorAll("[id^='globe-polygon-']");
              if (polygons.length > 0) {
                gsap.to(polygons, {
                  autoAlpha: 0,
                  scale: 0.5,
                  duration: 0.3,
                  overwrite: "auto",
                });
              }
            },
            onLeaveBack: () => {
              gsap.to(panel.querySelectorAll(".fade-in"), {
                autoAlpha: 0,
                y: 50,
                overwrite: "auto",
              });
              const polygons = panel.querySelectorAll("[id^='globe-polygon-']");
              if (polygons.length > 0) {
                gsap.to(polygons, {
                  autoAlpha: 0,
                  scale: 0.5,
                  duration: 0.3,
                  overwrite: "auto",
                });
              }
            },
          });
        }
      });
    }

    if (triggerRef.current) {
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top center-=20%",
        once: true,
        onEnter: () => {
          if (
            identifyStepRef.current &&
            designStepRef.current &&
            developStepRef.current
          ) {
            gsap.to(
              [
                identifyStepRef.current,
                designStepRef.current,
                developStepRef.current,
              ],
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                delay: 0.2,
              }
            );
          }
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (horizontalTrackRef.current) {
        gsap.killTweensOf(horizontalTrackRef.current);
      }
      tlIntro.kill();
    };
  }, []);

  return (
    <div className="overflow-x-hidden flex flex-col bg-[#00040f] gap-4">
      {/* ParticleBackground is now fixed and global */}
      <div ref={particleWrapperRef} className="fixed inset-0 z-0">
        {/* Full screen, behind content */}
        <ParticleBackground />
      </div>

      {/* Navbar is now a direct child, outside of hero pinning structure */}
      <div ref={navbarWrapperRef} className="relative z-50">
        <Navbar />
      </div>

      {/* Hero Section (to be pinned) */}
      <section ref={heroTriggerRef} className="relative h-screen z-20">
        <div ref={pinnedHeroElementRef} className="h-full w-full relative">
          <div
            ref={ellipsRef}
            className="absolute z-0 w-full h-full bottom-[11rem] origin-center"
          >
            <Image
              src="/ellips.png"
              alt="ellips"
              fill
              className="object-cover w-auto h-auto"
            />
          </div>
          {/* Content of hero section */}
          <div className="relative flex flex-col gap-[5rem] items-center justify-center h-full pointer-events-none">
            <p
              ref={summonTextRef}
              className="text-white text-[10vw] md:text-[150px] lg:text-[200px] font-kronaOne pointer-events-auto"
            >
              SUMMON
            </p>
            <div
              ref={descRef}
              className="relative flex flex-col items-center text-white text-center px-4 pointer-events-auto"
            >
              <p className="font-inter text-lg md:text-xl">
                We Put AI at the center of everything.
              </p>
              <p className="font-poppins text-base md:text-lg">
                Your trusted partner in implementing an AI in your company.
              </p>
              <div className="rounded-full border border-blue-700 py-3 px-14 mt-6 from-black to-white bg-black cursor-pointer hover:bg-blue-700 transition-colors">
                <p className="font-poppins text-lg">Summon Your AI Workers</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="my-[15rem]"></div>
      {/* section 2 - Horizontal Scroll Section */}
      <section ref={triggerRef} className="relative h-[300vh] z-10">
        <div
          ref={pinnedElementRef}
          className="h-screen w-screen overflow-hidden relative z-40"
        >
          <div
            id="centralized-step-list"
            className="absolute top-1/2 -translate-y-1/2 left-8 md:left-16 lg:left-24 z-50 flex flex-col gap-4"
          >
            <p
              ref={identifyStepRef}
              className="font-kronaOne text-sm sm:text-base md:text-lg lg:text-[20px]"
            >
              IDENTIFY
            </p>
            <p
              ref={designStepRef}
              className="font-kronaOne text-sm sm:text-base md:text-lg lg:text-[20px]"
            >
              DESIGN
            </p>
            <p
              ref={developStepRef}
              className="font-kronaOne text-sm sm:text-base md:text-lg lg:text-[20px]"
            >
              DEVELOP
            </p>
          </div>
          <div
            ref={horizontalTrackRef}
            className="h-screen w-[300vw] flex flex-row relative"
          >
            {/* Panel 1: Identify */}
            <div
              ref={addToRefs}
              className="h-screen w-screen flex flex-col justify-center items-center text-white p-8"
            >
              <div className="flex flex-col w-full max-w-6xl">
                <div className="flex flex-col items-center justify-center w-full mb-8">
                  <Image
                    src="/globe-mid.png"
                    alt="globe-mid"
                    width={500}
                    height={500}
                    className="object-contain max-w-[70vw] max-h-[50vh] "
                  />
                </div>
                <div className="flex flex-col text-center w-full">
                  <p className="font-kronaOne text-[64px]">IDENTIFY</p>
                  <p className="font-poppins text-lg sm:text-xl md:text-2xl lg:text-[28px]">
                    We help you identify automation opportunities in your
                    business, and summon the incredible power of AI.
                  </p>
                </div>
              </div>
            </div>
            {/* Panel 2: Design */}
            <div
              ref={addToRefs}
              className="h-screen w-screen flex flex-col justify-center items-center text-white p-8"
            >
              <div className="flex flex-col w-full max-w-6xl">
                <div className="w-full flex justify-center items-center mb-8 md:mb-0">
                  <div className="flex h-full flex-row gap-0 justify-center items-center">
                    <Image
                      id="globe-side-left"
                      src="/globe-side.png"
                      alt="globe-side-left"
                      width={300}
                      height={400}
                      className="object-contain w-full max-h-[50vh] h-full relative z-10"
                    />
                    <Image
                      id="globe-mid-design"
                      src="/globe-mid.png"
                      alt="globe-mid-design"
                      width={400}
                      height={400}
                      className="object-contain max-w-[40vw] md:max-w-full max-h-[30vh] md:max-h-[50vh] relative z-20"
                    />
                    <Image
                      id="globe-side-right"
                      src="/globe-side.png"
                      alt="globe-side-right"
                      width={300}
                      height={400}
                      className="object-contain w-full max-h-[50vh] h-full relative z-10"
                    />
                  </div>
                </div>
                <div className="flex flex-col text-center w-full fade-in">
                  <p className="font-kronaOne text-[32px] lg:text-[64px] fade-in">
                    DESIGN
                  </p>
                  <p className="font-poppins text-lg lg:text-[28px] fade-in">
                    We will design your AI Agent workflow and give them the best
                    tools to make your job easier.
                  </p>
                </div>
              </div>
            </div>
            {/* Panel 3: Develop */}
            <div
              ref={addToRefs}
              className="h-screen w-screen flex flex-col justify-center items-center text-white p-8"
            >
              <div className="flex flex-col w-full max-w-6xl">
                <div className="w-full flex justify-center items-center relative">
                  <div className="relative flex justify-center items-center">
                    <Image
                      id="globe-polygon-1"
                      src="/globe-polygon.png"
                      alt="globe-polygon-1"
                      width={200}
                      height={200}
                      className="object-contain w-auto h-auto absolute transform -translate-x-[7rem] -translate-y-[5.7rem] "
                    />
                    <Image
                      id="globe-polygon-2"
                      src="/globe-polygon.png"
                      alt="globe-polygon-2"
                      width={200}
                      height={200}
                      className="object-contain w-auto h-auto absolute transform translate-x-[7rem] -translate-y-[5.7rem]"
                    />
                    <Image
                      src="/globe-final.png"
                      alt="globe-final"
                      width={400}
                      height={400}
                      className="object-contain max-w-[70vw] md:max-w-full max-h-[40vh] md:max-h-[60vh] fade-in z-10"
                    />
                    <Image
                      id="globe-polygon-3"
                      src="/globe-polygon.png"
                      alt="globe-polygon-3"
                      width={200}
                      height={200}
                      className="object-contain w-auto h-auto absolute transform -translate-x-[7.2rem] translate-y-10 rotate-[80deg]"
                    />
                    <Image
                      id="globe-polygon-4"
                      src="/globe-polygon.png"
                      alt="globe-polygon-4"
                      width={200}
                      height={200}
                      className="object-contain w-auto h-auto absolute transform translate-x-[7.2rem] translate-y-10 -rotate-[80deg]"
                    />
                    <Image
                      id="globe-polygon-5"
                      src="/globe-polygon.png"
                      alt="globe-polygon-5"
                      width={200}
                      height={200}
                      className="object-contain w-auto h-auto absolute transform translate-y-[7.4rem]"
                    />
                  </div>
                </div>
                <div className="flex flex-col text-center w-full fade-in">
                  <p className="font-kronaOne text-[32px] lg:text-[64px] fade-in">
                    DEVELOP
                  </p>
                  <p className="font-poppins text-lg lg:text-[28px] fade-in">
                    We leverage our extensive experience and network to develop
                    custom AI system that are proven to get your job done.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* section 3 */}
      <section className="relative flex flex-col gap-4 text-white px-4 lg:px-0 pb-[10rem]">
        <p className="font-kronaOne text-3xl lg:text-[48px] text-center">
          FAST PACED AI BOUTIQUE
        </p>
        <p className="font-inter text-lg lg:text-[20px] text-center">
          Our team will coordinates everything from brainstorm to deployment
        </p>
        <div className="flex flex-col lg:flex-row gap-4 mt-5 lg:mx-10">
          <CardPaced
            title="Rapid Ideation & Vision Alignment"
            content="Our team dives deep into understanding your goals, challenges, and opportunities transforming ideas into actionable strategies in record time."
            image="/search.png"
            fill={true}
          />
          <CardPaced
            title="Agile Roadmapping for Success"
            content="Once the vision is clear, we craft an agile roadmap tailored to your needs. "
            image="/cards.png"
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 mt-4 lg:mt-0 lg:mx-10">
          <CardPaced
            title="Intuitive & Impactful Design"
            content="Every pixel is crafted to deliver seamless experiences balancing aesthetics with functionality."
            image="/photo.png"
          />
          <CardPaced
            title="Accelerated Prototyping & Coding"
            content="From prototype to production-ready code, our developers work tirelessly to bring your AI solution to life."
            image="/layer.png"
            secondImage="/cpu.png"
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 mt-4 lg:mt-0 lg:mx-10">
          <CardPaced
            title="Precision Validation at Speed"
            content="We rigorously validate every feature using automated testing pipelines, ensuring reliability and scalability before launch."
            image="/lock.png"
            secondImage="/phone.png"
          />
          <CardPaced
            title="Seamless Launch & Continuous Support"
            content="Your AI solution goes live with zero downtime. But it doesn't stop there—we provide ongoing support and optimization."
            image="/setting.png"
            fill={true}
          />
        </div>
      </section>

      {/* section 4 */}
      <section className="relative flex flex-col py-[10rem]">
        <div className="flex flex-col mb-10 gap-1 text-white items-center justify-center">
          <p className="font-kronaOne text-[40px]">BUILD YOUR OWN AI</p>
          <p className="font-poppins text-[28px]">
            Our team will coordinates everything from brainstorm to deployment
          </p>
        </div>
        <div className="flex flex-row justify-evenly items-center mx-4">
          <Image
            src="/left-1.png"
            alt="left-1"
            width={150}
            height={150}
            className="object-cover"
          />
          <Image
            src="/right-1.png"
            alt="right-1"
            width={150}
            height={150}
            className="object-cover"
          />
        </div>
        <div className="flex flex-row justify-evenly items-center gap-8">
          <Image
            src="/left-2.png"
            alt="left-2"
            width={200}
            height={200}
            className="object-cover"
          />
          <div className="relative flex justify-center items-center py-10">
            <div className="absolute z-0 blur-[9rem] w-[10rem] h-[10rem] bg-[#2C00FF]"></div>
            <Image
              src="/branch-logo.png"
              alt="branch-logo"
              width={200}
              height={200}
              className="object-cover z-10"
            />
          </div>
          <Image
            src="/right-2.png"
            alt="right-2"
            width={200}
            height={200}
            className="object-cover"
          />
        </div>
        <div className="flex flex-row justify-evenly items-center gap-4 mx-4">
          <Image
            src="/left-3.png"
            alt="left-3"
            width={150}
            height={150}
            className="object-cover"
          />
          <Image
            src="/right-3.png"
            alt="right-3"
            width={150}
            height={150}
            className="object-cover"
          />
        </div>
      </section>

      {/* section 5 */}
      <section className="relative flex flex-col my-6 mx-10">
        <div className="flex flex-col text-white items-center justify-center my-6">
          <p className="font-kronaOne text-[40px]">ACTIVE USE CASE</p>
          <p className="font-kronaOne text-[40px]">FROM RECENT PROJECT</p>
          <p className="font-poppins text-[28px]">
            Transforming ideas into impact: Real-World AI Success Stories
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-center gap-6">
          <CardProject
            image="/team.png"
            title1="Lead Generation Agent"
            content1="Delivering up to 50,000+ high quality leads with just a single prompt."
            content2="Extracts detailed prospect data (names, titles, emails, phone numbers, LinkedIn profiles, etc) directly from diverse sources."
          />
          <CardProject
            image="/card.png"
            title1="Credit Analyst Agent"
            content1="Automating financial analysis, credit scoring, and risk assessment."
            content2="Simply input a credit application, and the agent delivers financial, credit matrices, and risk scores—in minutes."
          />
          <CardProject
            image="/document.png"
            title1="Deep Research Agent"
            content1="Generating in-depth research reports based on just a title."
            content2="Users provide a topic, and the agent conducts extensive research, compiles findings into a polished PDF"
          />
        </div>
      </section>
    </div>
  );
}
