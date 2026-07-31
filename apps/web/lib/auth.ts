export const SESSION_COOKIE = "muflow_session";

export const roles = [
  "SUPER_ADMIN",
  "MUNICIPALITY_ADMIN",
  "MUNICIPALITY_STAFF",
  "BUSINESS_OWNER",
  "CITIZEN",
] as const;

export type UserRole = (typeof roles)[number];

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  tenantId?: string;
};

type TokenPayload = AuthUser & {
  iat: number;
  exp: number;
};

const encoder = new TextEncoder();

export const demoUsers: AuthUser[] = [
  {
    id: "usr_super_admin",
    name: "MUFLOW Super Admin",
    email: "admin@muflow.city",
    role: "SUPER_ADMIN",
    tenantId: "tenant_platform",
  },
  {
    id: "usr_municipality",
    name: "Belediye Yoneticisi",
    email: "belediye@muflow.city",
    role: "MUNICIPALITY_ADMIN",
    tenantId: "tenant_mugla",
  },
  {
    id: "usr_business",
    name: "Isletme Yetkilisi",
    email: "isletme@muflow.city",
    role: "BUSINESS_OWNER",
    tenantId: "tenant_fethiye",
  },
];

function base64UrlEncode(value: string | ArrayBuffer) {
  const bytes = typeof value === "string" ? encoder.encode(value) : new Uint8Array(value);
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(normalized);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

function getJwtSecret() {
  return process.env.JWT_SECRET;
}

async function getSigningKey() {
  const secret = getJwtSecret();

  if (!secret) {
    throw new Error("JWT_SECRET is required for MUFLOW authentication.");
  }

  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function signSession(user: AuthUser) {
  const now = Math.floor(Date.now() / 1000);
  const payload: TokenPayload = {
    ...user,
    iat: now,
    exp: now + 60 * 60 * 8,
  };
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64UrlEncode(JSON.stringify(payload));
  const signature = await crypto.subtle.sign("HMAC", await getSigningKey(), encoder.encode(`${header}.${body}`));

  return `${header}.${body}.${base64UrlEncode(signature)}`;
}

export async function verifySession(token?: string): Promise<AuthUser | null> {
  try {
    if (!token) {
      return null;
    }

    const [header, body, signature] = token.split(".");

    if (!header || !body || !signature) {
      return null;
    }

    const expectedSignature = await crypto.subtle.sign("HMAC", await getSigningKey(), encoder.encode(`${header}.${body}`));
    const valid = base64UrlEncode(expectedSignature) === signature;

    if (!valid) {
      return null;
    }

    const payload = JSON.parse(base64UrlDecode(body)) as TokenPayload;
    const now = Math.floor(Date.now() / 1000);

    if (!roles.includes(payload.role) || payload.exp < now) {
      return null;
    }

    return {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      tenantId: payload.tenantId,
    };
  } catch {
    return null;
  }
}

export function hasRole(user: AuthUser | null, allowedRoles: UserRole[]) {
  return Boolean(user && allowedRoles.includes(user.role));
}

export function findDemoUser(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const fallbackPassword = process.env.DEMO_AUTH_PASSWORD || "1234567890";
  const demoPassword = normalizedEmail === "admin@muflow.city"
    ? process.env.SUPER_ADMIN_PASSWORD || (process.env.NODE_ENV !== "production" ? fallbackPassword : undefined)
    : fallbackPassword;

  if (!demoPassword || password !== demoPassword) {
    return null;
  }

  return demoUsers.find((item) => item.email === normalizedEmail) || null;
}
