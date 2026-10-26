import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { ProjectPageData } from "@/types/project";

import { ProjectEvidence } from "./project-evidence";

function project(slug: string, title = "Project"): ProjectPageData {
  return { slug, title } as ProjectPageData;
}

describe("ProjectEvidence", () => {
  it("renders verified Skinny Cans delivery evidence", () => {
    render(<ProjectEvidence project={project("skinny-cans", "Skinny Cans")} />);

    expect(screen.getByText("30 pages")).toBeDefined();
    expect(screen.getByText(/34 passing automated tests/i)).toBeDefined();
  });

  it("renders verified form count for RawLab Ventures", () => {
    render(
      <ProjectEvidence
        project={project("rawlab-ventures", "RawLab Ventures")}
      />,
    );

    expect(screen.getByText("2 forms")).toBeDefined();
  });

  it("does not invent evidence for an unknown project", () => {
    const { container } = render(
      <ProjectEvidence project={project("unverified-project")} />,
    );

    expect(container.innerHTML).toBe("");
  });
});
