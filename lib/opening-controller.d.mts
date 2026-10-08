export type OpeningResult = {
  proceed: boolean;
  reason: string;
  notified?: boolean;
  notify?: boolean;
  mode?: string;
  nextSteps?: string[];
  preferences?: { enabled: boolean; waitSeconds: number; surface: string };
};

export function controlOpening(
  action: string,
  ticket: string,
): Promise<OpeningResult>;
