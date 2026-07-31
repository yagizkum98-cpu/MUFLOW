import { AuthUser, UserRole, demoUsers, roles } from "./auth";

export type ManagedUser = AuthUser & {
  createdAt: string;
  createdBy: string;
  status: "ACTIVE";
};

type StoredManagedUser = ManagedUser & {
  passwordHash: string;
};

type UserStoreState = {
  users: StoredManagedUser[];
  passwordOverrides: Record<string, string>;
};

const encoder = new TextEncoder();
const globalKey = "__muflow_user_store__";

function getStore() {
  const globalState = globalThis as typeof globalThis & { [globalKey]?: UserStoreState };

  if (!globalState[globalKey]) {
    globalState[globalKey] = { users: [], passwordOverrides: {} };
  }

  return globalState[globalKey];
}

export async function hashPassword(password: string) {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(password));
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function isUserRole(value: string): value is UserRole {
  return roles.includes(value as UserRole);
}

export async function createManagedUser(input: {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  tenantId?: string;
  createdBy: string;
}) {
  const store = getStore();
  const email = input.email.trim().toLowerCase();

  if (store.users.some((user) => user.email === email) || demoUsers.some((user) => user.email === email)) {
    return { error: "Bu e-posta ile kullanıcı zaten tanımlı." };
  }

  const user: StoredManagedUser = {
    id: `usr_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    name: input.name.trim(),
    email,
    role: input.role,
    tenantId: input.tenantId,
    createdAt: new Date().toISOString(),
    createdBy: input.createdBy,
    status: "ACTIVE",
    passwordHash: await hashPassword(input.password),
  };

  store.users.unshift(user);

  return { user: toPublicUser(user) };
}

export async function findManagedUser(email: string, password: string): Promise<AuthUser | null> {
  const user = getStore().users.find((item) => item.email === email.trim().toLowerCase());

  if (!user || user.passwordHash !== await hashPassword(password)) {
    return null;
  }

  return toAuthUser(user);
}

export async function verifyPasswordOverride(email: string, password: string) {
  const hash = getStore().passwordOverrides[email.trim().toLowerCase()];
  return Boolean(hash && hash === await hashPassword(password));
}

export async function setPasswordOverride(email: string, password: string) {
  getStore().passwordOverrides[email.trim().toLowerCase()] = await hashPassword(password);
}

export async function updateManagedUserPassword(email: string, password: string) {
  const user = getStore().users.find((item) => item.email === email.trim().toLowerCase());

  if (!user) {
    return false;
  }

  user.passwordHash = await hashPassword(password);
  return true;
}

export function listManagedUsers() {
  return getStore().users.map(toPublicUser);
}

function toAuthUser(user: StoredManagedUser): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    tenantId: user.tenantId,
  };
}

function toPublicUser(user: StoredManagedUser): ManagedUser {
  return {
    ...toAuthUser(user),
    createdAt: user.createdAt,
    createdBy: user.createdBy,
    status: user.status,
  };
}
