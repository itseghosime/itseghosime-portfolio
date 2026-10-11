import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ComponentProps } from "react";
import { LabExperimentDetail } from "./lab-experiment-detail";
import { LabExperimentCard } from "./lab-experiment-card";

vi.mock("./lab-presentation", () => ({
  LabPresentation: () => <div>Presentation</div>,
}));

const sample: ComponentProps<typeof LabExperimentDetail> = {
  experiment: {
    id: "envguard",
    number: "LAB 001",
    title: "EnvGuard",
    slug: "envguard",
    summary: "Validate environment configuration without exposing secrets.",
    stack: "TypeScript · Node.js",
    category: "developerTools",
    categoryLabel: "Developer tools",
    presentation: "none",
    status: "Completed",
    isActive: true,
    sourceUrl: "https://github.com/itseghosime/envguard",
  },
  content: {
    _id: "envguard",
    title: "EnvGuard",
    slug: "envguard",
    summary: "Configuration checks",
    question: "Can configuration checks stay secret-safe?",
    status: "completed",
    startedAt: null,
    completedAt: null,
    demoUrl: null,
    repositoryUrl: null,
    featured: null,
    displayOrder: null,
    experimentNumber: 1,
    category: "developerTools",
    version: null,
    presentation: "none",
    coverImage: null,
    technologies: [],
    body: [
      {
        _key: "intro",
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _key: "text",
            _type: "span",
            text: "The experiment log comes from Sanity.",
            marks: [],
          },
        ],
      },
    ],
    findings: [
      {
        _key: "finding",
        title: "Secret-safe output",
        description: "Report names rather than secret values.",
      },
    ],
    relatedProject: null,
    seo: null,
  },
};

describe("Lab experiment detail", () => {
  it("renders the log, question, findings and repository link", () => {
    render(<LabExperimentDetail {...sample} />);
    expect(
      screen.getByRole("heading", { level: 1, name: "EnvGuard" }),
    ).toBeTruthy();
    expect(
      screen.getByText("Can configuration checks stay secret-safe?"),
    ).toBeTruthy();
    expect(
      screen.getByText("The experiment log comes from Sanity."),
    ).toBeTruthy();
    expect(
      screen.getByText("Report names rather than secret values."),
    ).toBeTruthy();
    expect(
      screen.getByRole("link", { name: /View source/ }).getAttribute("href"),
    ).toBe(sample.experiment.sourceUrl);
  });
  it("omits unavailable sections instead of showing placeholder content", () => {
    render(
      <LabExperimentDetail
        {...sample}
        content={{ ...sample.content, body: [], findings: [], question: null }}
      />,
    );
    expect(screen.queryByText("Experiment log")).toBeNull();
    expect(screen.queryByText("Findings & lessons")).toBeNull();
    expect(screen.queryByText("Live demonstration")).toBeNull();
  });
  it.each(["featured", "paired", "wide"] as const)(
    "opens internal content from a %s card without a demo URL",
    (variant) => {
      render(
        <LabExperimentCard experiment={sample.experiment} variant={variant} />,
      );
      expect(
        screen
          .getByRole("link", { name: /Open experiment/ })
          .getAttribute("href"),
      ).toBe("/lab/envguard");
    },
  );
});
