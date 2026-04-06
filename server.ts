import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Resend lazily to avoid crashing if key is missing
  let resend: Resend | null = null;
  const getResend = () => {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      throw new Error("RESEND_API_KEY is missing. Please add it to your secrets.");
    }
    if (!resend) {
      resend = new Resend(key);
    }
    return resend;
  };

  // API Route for sending emails
  app.post("/api/send-email", async (req, res) => {
    try {
      const { email, subscriptionName, price } = req.body;

      if (!email || !subscriptionName || !price) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const client = getResend();
      
      const { data, error } = await client.emails.send({
        from: "SubTrack <onboarding@resend.dev>",
        to: [email],
        subject: `Payment Nearing: ${subscriptionName}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #191c1e;">
            <h2 style="color: #000666;">SubTrack Reminder</h2>
            <p>Hello,</p>
            <p>This is a reminder that your subscription for <strong>${subscriptionName}</strong> is nearing its next billing cycle.</p>
            <div style="background: #f2f4f7; padding: 15px; border-radius: 12px; margin: 20px 0;">
              <p style="margin: 0;"><strong>Subscription:</strong> ${subscriptionName}</p>
              <p style="margin: 0;"><strong>Amount:</strong> $${price}</p>
            </div>
            <p>Log in to SubTrack to manage your subscriptions and optimize your spending.</p>
            <hr style="border: none; border-top: 1px solid #e6e8eb; margin: 20px 0;" />
            <p style="font-size: 12px; color: #767683;">This is an automated notification from your SubTrack prototype.</p>
          </div>
        `,
      });

      if (error) {
        console.error("Resend Error:", error);
        return res.status(500).json({ error: error.message });
      }

      res.json({ success: true, id: data?.id });
    } catch (err: any) {
      console.error("Server Error:", err);
      res.status(500).json({ error: err.message || "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
