import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { deleteEnquiry, toggleEnquiryRead } from "./actions";

export const dynamic = "force-dynamic";

export default async function EnquiriesPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <h1 className="adminPageTitle">Enquiries</h1>
      <p className="adminPageSub">Messages sent through the contact form.</p>

      {enquiries.length === 0 ? (
        <div className="adminPanel">
          <p className="adminEmpty">No enquiries yet.</p>
        </div>
      ) : (
        <div className="adminPanel">
          <table className="adminTable">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry) => (
                <tr key={enquiry.id}>
                  <td>{enquiry.createdAt.toLocaleString()}</td>
                  <td>{enquiry.name}</td>
                  <td>{enquiry.email}</td>
                  <td>{enquiry.phone ?? "—"}</td>
                  <td>
                    <details>
                      <summary>View</summary>
                      <p style={{ margin: "8px 0 0", whiteSpace: "pre-wrap" }}>
                        {enquiry.message}
                      </p>
                    </details>
                  </td>
                  <td>
                    <span className={enquiry.read ? "adminBadge" : "adminBadge adminBadgeUnread"}>
                      {enquiry.read ? "Read" : "New"}
                    </span>
                  </td>
                  <td>
                    <div className="adminRowActions">
                      <form action={toggleEnquiryRead.bind(null, enquiry.id)}>
                        <button type="submit" className="adminBtn adminBtnSecondary adminBtnSmall">
                          {enquiry.read ? "Mark new" : "Mark read"}
                        </button>
                      </form>
                      <form action={deleteEnquiry.bind(null, enquiry.id)}>
                        <button type="submit" className="adminBtn adminBtnDanger adminBtnSmall">
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
