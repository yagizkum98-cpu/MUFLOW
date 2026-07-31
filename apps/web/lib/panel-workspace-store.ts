import { PanelKey } from "./package-control";

export type WorkspaceRecord = {
  id: string;
  tenantId?: string;
  panel: PanelKey;
  moduleId: string;
  title: string;
  description: string;
  status: "Taslak" | "Yayında" | "İncelemede" | "Tamamlandı";
  createdBy: string;
  createdAt: string;
};

type WorkspaceState = {
  records: WorkspaceRecord[];
};

const globalKey = "__muflow_panel_workspace__";

function getStore() {
  const globalState = globalThis as typeof globalThis & { [globalKey]?: WorkspaceState };

  if (!globalState[globalKey]) {
    globalState[globalKey] = { records: [] };
  }

  return globalState[globalKey];
}

export function listWorkspaceRecords(panel: PanelKey) {
  return getStore().records.filter((record) => record.panel === panel);
}

export function createWorkspaceRecord(input: {
  panel: PanelKey;
  moduleId: string;
  title: string;
  description: string;
  createdBy: string;
  tenantId?: string;
}) {
  const record: WorkspaceRecord = {
    id: `rec_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    tenantId: input.tenantId,
    panel: input.panel,
    moduleId: input.moduleId,
    title: input.title.trim(),
    description: input.description.trim(),
    status: "İncelemede",
    createdBy: input.createdBy,
    createdAt: new Date().toISOString(),
  };

  getStore().records.unshift(record);
  return record;
}
