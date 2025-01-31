export type Severity = "sev1" | "sev2" | "sev3";

export interface Incident {
  id: number;
  service: string;
  severity: Severity;
  message: string;
  startedAt: string;
  resolved: boolean;
}

