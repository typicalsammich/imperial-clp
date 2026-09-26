export async function POST(request) {
  try {
    const data = await request.json();
    const { firstName, lastName, phone, service } = data || {};

    if (!firstName || !lastName || !phone || !service) {
      return Response.json({ ok: false, error: "Please complete all fields." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_EMAIL;
    const from = process.env.FROM_EMAIL || "Imperial Crown <onboarding@resend.dev>";

    if (!apiKey || !to) {
      return Response.json(
        { ok: false, error: "Contact form email is not configured yet." },
        { status: 503 }
      );
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to,
        subject: `New Imperial Crown estimate request — ${firstName} ${lastName}`,
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
            <h2>New Website Lead</h2>
            <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
            <p><strong>Service needed:</strong> ${escapeHtml(service)}</p>
          </div>
        `
      })
    });

    if (!res.ok) {
      const detail = await res.text();
      return Response.json({ ok: false, error: "Email delivery failed.", detail }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}