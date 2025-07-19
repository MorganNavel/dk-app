import jwt from "jsonwebtoken";

type JitsiRole = "participant" | "moderator";

interface JitsiUser {
  name: string;
  email: string;
  role?: JitsiRole;
}

interface JWT {
  aud: string;
  iss: string;
  sub: string;
  room: string;
  exp: number;
  context: {
    user: JitsiUser;
  };
}
interface GenJWTProps extends JitsiUser {
  room: string;
}

const JITSI_APP_ID = process.env.JITSI_APP_ID!;
const JITSI_APP_SECRET = process.env.JITSI_APP_SECRET!;
const JITSI_DOMAIN = process.env.JITSI_DOMAIN!;

export function generateJitsiJWT({
  room,
  name,
  email,
  role = "participant",
}: Readonly<GenJWTProps>) {
  const now = Math.floor(Date.now() / 1000);
  const payload: JWT = {
    room,
    aud: JITSI_APP_ID,
    iss: JITSI_APP_ID,
    sub: JITSI_DOMAIN,
    exp: now + 30 * 60,
    context: {
      user: {
        name,
        email,
        role,
      },
    },
  };
  return jwt.sign(payload, JITSI_APP_SECRET, {
    algorithm: "HS256",
  });
}
