import {describe, expect, it} from "vitest";

import {
  createPersonStructuredData,
  PROFESSIONAL_IDENTITY,
} from "./professional-identity";

describe("professional identity structured data", () => {
  it("uses the durable software developer positioning and verified award", () => {
    const person = createPersonStructuredData();

    expect(person.name).toBe("Abdulrahman Itseghosime Bello");
    expect(person.jobTitle).toBe("Software Developer");
    expect(person.alternateName).toContain("ITSEGHOSIME");
    expect(person.award).toContain(PROFESSIONAL_IDENTITY.award);
    expect(person.address.addressLocality).toBe("Abuja");
  });

  it("deduplicates technology and profile signals", () => {
    const person = createPersonStructuredData({
      knowsAbout: ["React", "React"],
      sameAs: ["https://github.com/itseghosime"],
    });

    expect(person.knowsAbout.filter((item) => item === "React")).toHaveLength(1);
    expect(
      person.sameAs.filter((item) => item === "https://github.com/itseghosime"),
    ).toHaveLength(1);
  });
});
