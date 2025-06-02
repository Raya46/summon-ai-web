"use client";
import CardPaced from "@/components/card-paced";
import CardProject from "@/components/card-project";
import Navbar from "@/components/navbar";
import ParticleBackground from "@/components/particles";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  ChangeEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { sendEmail } from "./actions/send-email";

gsap.registerPlugin(ScrollTrigger);

interface FormDataState {
  name: string;
  email: string;
  budget: string;
  service: string;
  message: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const modalPanelRef = useRef<HTMLDivElement>(null);
  const modalBackdropRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    email: "",
    budget: "",
    service: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sendSuccess, setSendSuccess] = useState(false);

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

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitEmail = async () => {
    setIsSending(true);
    setSendError(null);
    setSendSuccess(false);

    try {
      const result = await sendEmail(formData);

      if (result?.success) {
        setSendSuccess(true);
        setFormData({
          name: "",
          email: "",
          budget: "",
          service: "",
          message: "",
        });
      } else {
        setSendError(
          result?.message || "Failed to send email. Please try again."
        );
      }
    } catch (error) {
      console.error("Error calling sendEmail action:", error);
      setSendError("An unexpected error occurred. Please try again.");
    }
    setIsSending(false);
  };

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !panelRefs.current.includes(el)) {
      panelRefs.current.push(el);
    }
  };

  useLayoutEffect(() => {
    if (isLoading) {
      return;
    }

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

    const currentHorizontalTrackRef = horizontalTrackRef.current;
    const currentTlIntro = tlIntro;

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (currentHorizontalTrackRef) {
        gsap.killTweensOf(currentHorizontalTrackRef);
      }
      if (currentTlIntro) {
        currentTlIntro.kill();
      }
    };
  }, [isLoading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isPanelVisible && modalPanelRef.current) {
      modalPanelRef.current.focus();
    }
  }, [isPanelVisible]);

  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalDocElementOverflow = document.documentElement.style.overflow;

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalDocElementOverflow;
    }
    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalDocElementOverflow;
    };
  }, [isModalOpen]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setSendSuccess(false);
    setSendError(null);
    setIsPanelVisible(true);
  };

  const handleCloseModal = () => {
    setIsPanelVisible(false);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0  z-[9999] flex items-center justify-center bg-[#00040f]">
        <p className="text-white text-[10vw] lg:text-[140px] font-kronaOne pointer-events-auto animate-pulse -translate-y-[5.7rem]">
          SUMMON
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden flex flex-col bg-[#00040f] gap-4">
      <div ref={particleWrapperRef} className="fixed inset-0 z-0">
        <ParticleBackground />
      </div>

      <div ref={navbarWrapperRef} className="relative z-50">
        <Navbar />
      </div>

      <section ref={heroTriggerRef} className="relative h-screen z-20">
        <div ref={pinnedHeroElementRef} className="h-full w-full relative">
          <div
            ref={ellipsRef}
            className="absolute z-0 w-[150vw] h-[80vh] -left-[25vw] bottom-[11rem] lg:w-full lg:h-full lg:left-0 lg:bottom-0"
          >
            <Image
              src="/ellips.png"
              alt="ellips"
              fill
              className="object-fill lg:object-cover"
            />
          </div>
          <div className="relative flex flex-col gap-[5rem] items-center justify-center h-full pointer-events-none">
            <p
              ref={summonTextRef}
              className="text-white text-[15vw] lg:text-[200px] font-kronaOne pointer-events-auto"
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
              className="font-kronaOne text-sm sm:text-base md:text-lg lg:text-[20px] fade-in"
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
            <div
              ref={addToRefs}
              className="h-screen w-screen flex flex-col items-center text-white p-8 pt-[10vh] lg:pt-0 lg:justify-center"
            >
              <div className="flex flex-col w-full max-w-6xl">
                <div className="flex flex-col items-center justify-center w-full mb-8 h-[45vh] lg:h-auto">
                  <Image
                    src="/globe-mid.png"
                    alt="globe-mid"
                    width={500}
                    height={500}
                    className="object-contain max-w-[70vw] max-h-full "
                  />
                </div>
                <div className="flex flex-col text-center w-full">
                  <p className="font-kronaOne text-[32px] md:text-[48px] lg:text-[64px]">
                    IDENTIFY
                  </p>
                  <p className="font-poppins text-lg sm:text-xl md:text-2xl lg:text-[28px]">
                    We help you identify automation opportunities in your
                    business, and summon the incredible power of AI.
                  </p>
                </div>
              </div>
            </div>
            <div
              ref={addToRefs}
              className="h-screen w-screen flex flex-col items-center text-white p-8 pt-[10vh] lg:pt-0 lg:justify-center"
            >
              <div className="flex flex-col w-full max-w-6xl">
                <div className="w-full flex justify-center items-center mb-8 lg:mb-0 h-[45vh] lg:h-auto">
                  <div className="flex h-full flex-row gap-0 justify-center items-center">
                    <Image
                      id="globe-side-left"
                      src="/globe-side.png"
                      alt="globe-side-left"
                      width={300}
                      height={400}
                      className="object-contain w-full max-h-full h-full relative z-10"
                    />
                    <Image
                      id="globe-mid-design"
                      src="/globe-mid.png"
                      alt="globe-mid-design"
                      width={400}
                      height={400}
                      className="object-contain max-w-[40vw] md:max-w-full max-h-full relative z-20"
                    />
                    <Image
                      id="globe-side-right"
                      src="/globe-side.png"
                      alt="globe-side-right"
                      width={300}
                      height={400}
                      className="object-contain w-full max-h-full h-full relative z-10"
                    />
                  </div>
                </div>
                <div className="flex flex-col text-center w-full fade-in">
                  <p className="font-kronaOne text-[32px] md:text-[48px] lg:text-[70px] fade-in">
                    DESIGN
                  </p>
                  <p className="font-poppins text-lg lg:text-[28px] fade-in">
                    We will design your AI Agent workflow
                  </p>
                  <p className="font-poppins text-lg lg:text-[28px] fade-in">
                    and give them the best tools to make your job easier.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div
              ref={addToRefs}
              className="h-screen w-screen flex flex-col items-center text-white p-8 pt-[10vh] lg:pt-0 lg:justify-center"
            >
              <div className="flex flex-col w-full max-w-6xl">
                <div className="w-full flex justify-center items-center relative mb-8 lg:mb-0 h-[45vh] lg:h-auto">
                  <div className="relative flex h-full justify-center items-center">
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
                      className="object-contain max-w-[70vw] md:max-w-full max-h-full fade-in z-10"
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
                  <p className="font-kronaOne text-[32px] md:text-[48px] lg:text-[70px] fade-in">
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

      <section className="relative flex flex-col py-[10rem] mx-10">
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
            <Image
              src="/branch-logo.png"
              alt="branch-logo"
              width={160}
              height={160}
              className="object-contain z-[999]"
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

      <section className="relative flex flex-col items-center justify-center text-white py-20 px-4 lg:px-10 gap-8">
        <p className="font-kronaOne text-3xl lg:text-[48px] text-center leading-tight">
          The best AI systems are built <br />
          <span className="text-blue-400">side by side</span>
        </p>
        <button
          onClick={handleOpenModal}
          className="bg-black hover:bg-blue-700 transition-colors text-white font-poppins border border-blue-600 text-lg py-4 px-10 rounded-full flex items-center gap-3"
        >
          let&apos;s partner up
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </section>

      {isModalOpen && (
        <div
          ref={modalBackdropRef}
          className="fixed inset-0 bg-black bg-opacity-50 z-[9990] flex justify-end items-center"
          onClick={handleCloseModal}
        >
          <div
            ref={modalPanelRef}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className={`bg-[#00040f] text-white w-full max-w-md p-6 md:p-8 shadow-xl \\
                        rounded-xl m-4 md:m-8 max-h-[calc(100vh-2rem)] md:max-h-[calc(100vh-4rem)] overflow-y-auto outline-none overscroll-contain`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-kronaOne text-xl md:text-2xl">
                Partnership Inquiry
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-7 h-7 md:w-8 md:h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div>
              {!sendSuccess ? (
                <form className="space-y-4 md:space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="sm:w-1/2">
                      <label
                        htmlFor="name"
                        className="block text-sm font-poppins text-gray-300 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Enter your full name"
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                        disabled={isSending}
                      />
                    </div>
                    <div className="sm:w-1/2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-poppins text-gray-300 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="Enter your email address"
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                        disabled={isSending}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="budget"
                      className="block text-sm font-poppins text-gray-300 mb-1"
                    >
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleFormChange}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                      disabled={isSending}
                    >
                      <option value="" disabled>
                        Select Budget
                      </option>
                      <option value="Rp 100 mio">Rp 100 mio</option>
                      <option value="Rp 100 - 150 mio">Rp 100 - 150 mio</option>
                      <option value="Rp 150 - 250 mio">Rp 150 - 250 mio</option>
                      <option value="Rp 300 mio+">Rp 300 mio+</option>
                      <option value="Not Sure">Not Sure</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-poppins text-gray-300 mb-1"
                    >
                      Service You&apos;re Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleFormChange}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                      disabled={isSending}
                    >
                      <option value="" disabled>
                        Select Service
                      </option>
                      <option value="Custom AI Solution">
                        Custom AI Solution
                      </option>
                      <option value="AI Audit and Consulting">
                        AI Audit and Consulting
                      </option>
                      <option value="AI Education and Training">
                        AI Education and Training
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-poppins text-gray-300 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder="Tell us more about your project..."
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-blue-500 focus:border-blue-500 resize-none"
                      disabled={isSending}
                    />
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={handleSubmitEmail}
                      disabled={isSending}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-poppins py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSending ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Inquiry
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                  {sendError && (
                    <p className="mt-2 text-sm text-red-400 font-poppins text-center">
                      Error: {sendError}
                    </p>
                  )}
                </form>
              ) : (
                <div className="text-center py-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-16 h-16 text-green-400 mx-auto mb-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h3 className="font-kronaOne text-xl text-green-400 mb-2">
                    Inquiry Sent!
                  </h3>
                  <p className="font-poppins text-gray-300 mb-6">
                    Thank you for reaching out. We will get back to you soon.
                  </p>
                  <button
                    onClick={handleCloseModal}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-poppins py-2 px-6 rounded-md transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}

              {!sendSuccess && (
                <p className="font-inter text-xs text-gray-400 mt-4 md:mt-6 text-center">
                  Alternatively, you can email us directly at{" "}
                  <a
                    href="mailto:tegarfadillah444@gmail.com"
                    className="text-blue-400 hover:underline"
                  >
                    tegarfadillah444@gmail.com
                  </a>
                  .
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
