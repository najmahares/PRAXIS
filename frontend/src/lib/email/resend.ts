const RESEND_ENDPOINT = "https://api.resend.com/emails";

function apiKey(): string {
  return process.env.RESEND_API_KEY ?? "";
}

function fromAddress(): string {
  return process.env.RESEND_FROM ?? "PRAXIS <onboarding@resend.dev>";
}

type SendInput = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendEmail(input: SendInput): Promise<{ ok: boolean; error?: string }> {
  const key = apiKey();
  if (!key) return { ok: false, error: "RESEND_API_KEY not configured" };

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + key,
      },
      body: JSON.stringify({
        from: fromAddress(),
        to: input.to,
        subject: input.subject,
        html: input.html,
        reply_to: input.replyTo,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      return { ok: false, error: body.slice(0, 300) };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

type ResetEmailInput = {
  to: string;
  name?: string;
  resetUrl: string;
};

export async function sendPasswordResetEmail(
  input: ResetEmailInput,
): Promise<{ ok: boolean; error?: string }> {
  const greet = input.name ? "Hi " + input.name + "," : "Hi,";
  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f5f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f6f8;padding:40px 20px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;border:1px solid #e5e7eb;overflow:hidden;">
            <tr>
              <td style="padding:32px 40px 24px;">
                <div style="font-size:12px;font-weight:800;letter-spacing:0.16em;color:#1d4ed8;text-transform:uppercase;margin-bottom:20px;">PRAXIS</div>
                <h1 style="margin:0 0 14px;font-size:22px;line-height:1.3;font-weight:700;color:#0f172a;">Reset your password</h1>
                <p style="margin:0 0 18px;font-size:15px;line-height:1.65;color:#475569;">${greet}</p>
                <p style="margin:0 0 24px;font-size:15px;line-height:1.65;color:#475569;">We received a request to reset the password for your PRAXIS account. Click the button below to set a new one. This link expires in 1 hour.</p>
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="background:linear-gradient(180deg,#2563eb,#1e40af);border-radius:10px;">
                      <a href="${input.resetUrl}" style="display:inline-block;padding:13px 26px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">Set a new password</a>
                    </td>
                  </tr>
                </table>
                <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#94a3b8;">If you didn't request this, you can safely ignore this email. Your password won't change until you click the link above and set a new one.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 40px 28px;border-top:1px solid #f1f5f9;">
                <p style="margin:0;font-size:12px;line-height:1.55;color:#94a3b8;">PRAXIS - practice financial decisions safely.<br/>If the button doesn't work, paste this link into your browser:</p>
                <p style="margin:8px 0 0;font-size:11.5px;line-height:1.5;color:#64748b;word-break:break-all;">${input.resetUrl}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return sendEmail({
    to: input.to,
    subject: "Reset your PRAXIS password",
    html,
  });
}
