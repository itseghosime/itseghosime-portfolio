import { describe, expect, it } from "vitest";

import { getProjectSocialImage } from "./project-social-images";

describe("getProjectSocialImage", () => {
  it.each(["creele-studios", "rawlab-ventures", "skinny-cans"])(
    "returns a dedicated share-ready image for %s",
    (slug) => {
      const image = getProjectSocialImage(slug);

      expect(image).toMatchObject({ height: 630, width: 1200 });
      expect(image?.url).toBe(`https://www.itseghosime.com/og/${slug}.png`);
    },
  );

  it("leaves projects without a dedicated asset on the existing fallback path", () => {
    expect(getProjectSocialImage("unmapped-project")).toBeUndefined();
  });
});
