type TranscodeStatus =
  | "not_applicable"
  | "running"
  | "finished"
  | "pending"
  | "good_as_is"
  | "error"
  | "fetch_pending";

type ApiResponse = {
  status: "success" | "error";
  message?: string;
};

export type Item = {
  id: string;
  name: string;
  type: "file" | "folder";
} & Partial<{
  size: number;
  created_at: number;
  mime_type: string;
  transcode_status: TranscodeStatus;
  link: string;
  stream_link: string;
  virus_scan: "ok" | "infected" | "error";
}>;

export type Transfer = {
  id: string;
  name: string;
  status:
    | "waiting"
    | "finished"
    | "running"
    | "deleted"
    | "banned"
    | "error"
    | "timeout"
    | "seeding"
    | "queued";
} & Partial<{
  message: string;
  /** 0.0 - 1.0 */
  progress: number;
  src: string;
  folder_id: string;
  file_id: string;
}>;

export type Account_Info = ApiResponse & {
  customer_id: string;
  premium_util: number;
  limit_used: number;
  space_used: number;
};

export type Authorize_Preflight = {
  verification_uri: string;
  user_code: string;
  device_code: string;
  interval: number;
};

export type Authorize_Token = {
  access_token: string;
  token_type: "bearer";
  expires_in: number;
  scope: string;
  refresh_token: string;
};
