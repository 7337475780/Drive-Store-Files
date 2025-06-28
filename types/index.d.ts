export type FileType = "document" | "image" | "video" | "audio" | "other";
export interface UploadFileProps {
  file: File;
  ownerId: string;
  accountId: string;
  path: string;
}

interface ActionType {
  label: string;
  icon: string;
  value: string;
}
interface SearchParamsProps {
  params?: Promise<SegmentParams>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

declare interface GetFilesProps {
  types: FileType[];
  searchText?: string;
  sort?: string;
  limit?: number;
}

export interface RenameFileProps {
  fileId: string;
  name: string;
  extension: string;
  path: string;
}

export interface UpdateFileUserProps {
  fileId: string;
  emails: string[];
  path: string;
}

export interface DeleteFileProps {
  fileId: string;
  bucketFileId: string;
  path: string;
}
