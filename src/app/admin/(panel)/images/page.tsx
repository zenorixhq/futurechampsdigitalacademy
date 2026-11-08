import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { SITE_IMAGE_SLOTS } from "@/lib/site-images";
import { updateSiteImage, deleteSiteImage } from "./actions";

export const dynamic = "force-dynamic";

type ImagesPageProps = {
  searchParams: Promise<{ error?: string; updated?: string }>;
};

export default async function ImagesPage({ searchParams }: ImagesPageProps) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const params = await searchParams;
  const rows = await prisma.siteImage.findMany();
  const byKey = new Map(rows.map((row) => [row.key, row]));

  const groupedSlots = SITE_IMAGE_SLOTS.reduce((acc, slot) => {
    if (!acc[slot.page]) acc[slot.page] = [];
    acc[slot.page].push(slot);
    return acc;
  }, {} as Record<string, Array<(typeof SITE_IMAGE_SLOTS)[number]>>);

  return (
    <>
      <h1 className="adminPageTitle">Site images</h1>
      <p className="adminPageSub">
        Replace the photography used across the public pages. JPEG, PNG or WebP, up to 5MB.
      </p>

      {params?.error && <p className="adminFormError">{params.error}</p>}
      {params?.updated && (
        <p className="adminMuted">
          {params.updated === "Deleted" ? "Image deleted." : "Image updated."}
        </p>
      )}

      {Object.entries(groupedSlots).map(([pageName, slots]) => (
        <div key={pageName} style={{ marginBottom: "2rem" }}>
          <h2 style={{ marginBottom: "1rem", fontSize: "1.25rem", fontWeight: 600 }}>{pageName}</h2>
          {slots.map((slot) => {
            const row = byKey.get(slot.key);
            return (
              <div className="adminPanel" key={slot.key}>
                <div className="adminHeaderRow">
                  <div>
                    <strong>{slot.label}</strong>
                    <div className="adminMuted">{slot.key}</div>
                  </div>
                </div>
                {row ? (
                  <img className="adminThumb" src={row.url} alt={row.alt ?? slot.label} />
                ) : 'fallback' in slot && slot.fallback ? (
                  <img className="adminThumb" src={slot.fallback} alt={slot.label} style={{ opacity: 0.6 }} />
                ) : (
                  <p className="adminMuted">No image</p>
                )}
                
                <div style={{ display: "flex", gap: "1rem", marginTop: 12, alignItems: "flex-end" }}>
                  <form action={updateSiteImage.bind(null, slot.key)} style={{ flex: 1 }}>
                    <div className="adminField">
                      <label htmlFor={`file-${slot.key}`}>New image</label>
                      <input
                        id={`file-${slot.key}`}
                        type="file"
                        name="file"
                        accept="image/jpeg,image/png,image/webp"
                        required
                        className="adminInput"
                      />
                    </div>
                    <div className="adminField">
                      <label htmlFor={`alt-${slot.key}`}>Alt text</label>
                      <input
                        id={`alt-${slot.key}`}
                        type="text"
                        name="alt"
                        className="adminInput"
                        defaultValue={row?.alt ?? ""}
                      />
                    </div>
                    <button type="submit" className="adminBtn adminBtnSmall">
                      Upload
                    </button>
                  </form>
                  
                  {row && (
                    <form action={deleteSiteImage.bind(null, slot.key)}>
                      <button type="submit" className="adminBtn adminBtnSmall" style={{ backgroundColor: "#dc2626" }}>
                        Delete
                      </button>
                    </form>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}
