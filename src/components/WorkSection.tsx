"use client";

import { WORK_PROJECTS, type HoverProp, type WorkProject } from "@/data/work-projects";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";

const PANEL_TRANSITION_MS = 450;

function hoverPropStyle(prop: HoverProp): CSSProperties {
  return {
    ["--prop-size" as string]: `${prop.size}px`,
    ["--prop-rotate" as string]: `${prop.rotate}deg`,
    ["--prop-delay-in" as string]: `${prop.delayIn}ms`,
    ["--prop-delay-out" as string]: `${prop.delayOut}ms`,
    ["--prop-x-offset" as string]: prop.xOffset ?? "0px",
    ["--prop-y-offset" as string]: prop.yOffset ?? "0px",
  };
}

function WorkHoverProps({ props, active }: { props: HoverProp[]; active: boolean }) {
  return (
    <div className="work-hover-props" aria-hidden="true">
      {props.map((prop, index) => (
        <img
          key={`${prop.src}-${index}`}
          className={`work-hover-prop work-hover-prop--${prop.anchor}${active ? " is-visible" : ""}`}
          src={prop.src}
          alt=""
          draggable={false}
          data-anchor={prop.anchor}
          style={hoverPropStyle(prop)}
        />
      ))}
    </div>
  );
}

function WorkProjectCard({
  project,
  isLast,
  isFocused,
  isAnyFocused,
  onHoverStart,
  onHoverEnd,
  onOpen,
}: {
  project: WorkProject;
  isLast: boolean;
  isFocused: boolean;
  isAnyFocused: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`wrapper-work${isLast ? " u-mb-0" : ""}${isAnyFocused && !isFocused ? " is-dimmed" : ""}${isFocused ? " is-focused" : ""}`}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <div
        className={`wrapper-blue u-scroll-none work-project-card${hovered ? " is-hovered" : ""}`}
        role="button"
        tabIndex={0}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => {
          setHovered(true);
          onHoverStart();
        }}
        onBlur={() => setHovered(false)}
        onClick={onOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
        }}
      >
        <WorkHoverProps props={project.hoverProps} active={hovered} />
        <div className="wrapper-blue-header u-mb-2">
          <div className="wrapper-header u-mb-0 u-p-20-around">
            <p className="text-paragraph u-extra-bold u-text-white u-mb-0 u-mr-2">
              {project.name}
            </p>
          </div>
          <img
            src={project.thumbnail}
            loading="lazy"
            alt=""
            className={`image-work-thumbnail${project.thumbnailClass ? ` ${project.thumbnailClass}` : ""}`}
          />
        </div>
      </div>
      {project.categories.map((category) => (
        <a key={category} href="#" className="link-categories w-inline-block">
          <div className="h2">{category}</div>
        </a>
      ))}
    </div>
  );
}

function getProjectCaseStudyHref(project: WorkProject) {
  return `/case-studies/${project.id}`;
}

function ProjectHeaderCta({ project }: { project: WorkProject }) {
  return (
    <Link href={getProjectCaseStudyHref(project)} className="btn white small work-overlay-cta w-button">
      View Case Study
    </Link>
  );
}

function ProjectDetailOverlay({
  project,
  isOpen,
  onClose,
}: {
  project: WorkProject;
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!isOpen) return;

    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.classList.add("work-overlay-open");
    document.addEventListener("keydown", onEscape);
    return () => {
      document.body.classList.remove("work-overlay-open");
      document.removeEventListener("keydown", onEscape);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`work-project-overlay contact-modal3_component ${project.id}${isOpen ? " is-open" : ""}`}
      style={{ display: "flex" }}
    >
      <div
        className={`contact-modal3_content-wrapper ${project.id === "shipnetwork" ? "shipnetwork" : "safefaces"}`}
      >
        <div className="wrapper-header-blue">
          <button
            type="button"
            className="contact-modal3_close-button w-inline-block"
            onClick={onClose}
            aria-label="Close project"
          >
            <img
              src="/images/original-cbdec51e43c4235fa64b2f4cd82bcd49-1.png"
              loading="lazy"
              alt=""
              className="image-5"
            />
          </button>
          <div className="work-overlay-header-main">
            <p className="text-paragraph u-extra-bold u-text-white u-mb-0">
              {project.name}
            </p>
            <ProjectHeaderCta project={project} />
          </div>
        </div>
        {project.overlayImages.map((image, index) => (
          <img
            key={`${image.src}-${index}`}
            src={image.src}
            loading="lazy"
            alt=""
            className={image.className ?? "image-one-window"}
          />
        ))}
      </div>
      <div
        className="contact-modal3_background-overlay"
        style={{ opacity: 1 }}
        onClick={onClose}
        aria-hidden="true"
      />
    </div>
  );
}

export default function WorkSection() {
  const [view, setView] = useState<"column" | "grid">("column");
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [focusedProjectId, setFocusedProjectId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openProject = WORK_PROJECTS.find((p) => p.id === openProjectId) ?? null;
  const isAnyFocused = focusedProjectId !== null;

  useEffect(() => {
    document.body.classList.toggle("work-project-focus", isAnyFocused);
    return () => document.body.classList.remove("work-project-focus");
  }, [isAnyFocused]);

  const handleOpen = (projectId: string) => {
    setFocusedProjectId(null);
    setOpenProjectId(projectId);
    setOverlayOpen(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setOverlayOpen(true));
    });
  };

  const handleClose = () => {
    setOverlayOpen(false);
    window.setTimeout(() => setOpenProjectId(null), PANEL_TRANSITION_MS);
  };

  return (
    <section
      className={`section u-pt-0 work-section${isAnyFocused ? " work-section--focused" : ""}`}
      data-work-section=""
    >
      <div className="container">
        <h2 className="h2 u-position-work work-section-chrome">Work</h2>
        <div data-easing="ease" data-duration-in="300" data-duration-out="100" className="w-tabs">
          <div className="wrapper-orange work w-tab-menu work-section-chrome">
            <a
              href="#"
              className={`tabs-work left w-inline-block w-tab-link${view === "column" ? " w--current" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setView("column");
              }}
            >
              <div>
                <span className="u-text-blue">[</span>Column
              </div>
            </a>
            <a
              href="#"
              className={`tabs-work right w-inline-block w-tab-link${view === "grid" ? " w--current" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setView("grid");
              }}
            >
              <div>
                Grid<span className="u-text-blue">]</span>
              </div>
            </a>
          </div>
          <div className="w-tab-content">
            <div
              className={`w-tab-pane w--tab-active work-section-pane work-section--${view}`}
            >
              {WORK_PROJECTS.map((project, index) => (
                <WorkProjectCard
                  key={project.id}
                  project={project}
                  isLast={index === WORK_PROJECTS.length - 1}
                  isFocused={focusedProjectId === project.id}
                  isAnyFocused={isAnyFocused}
                  onHoverStart={() => setFocusedProjectId(project.id)}
                  onHoverEnd={() => setFocusedProjectId(null)}
                  onOpen={() => handleOpen(project.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {mounted && openProject
        ? createPortal(
            <ProjectDetailOverlay
              project={openProject}
              isOpen={overlayOpen}
              onClose={handleClose}
            />,
            document.body
          )
        : null}
    </section>
  );
}
