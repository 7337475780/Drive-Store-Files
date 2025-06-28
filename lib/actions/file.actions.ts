"use server";

import {
  DeleteFileProps,
  FileType,
  GetFilesProps,
  RenameFileProps,
  UpdateFileUserProps,
  UploadFileProps,
} from "@/types";
import { createAdminClient, createSessionClient } from "../appwrite";
import { InputFile } from "node-appwrite/file";
import { appWriteConfig } from "../appwrite/config";
import { ID, Models, Query } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user.actions";
const handleError = (err: unknown, msg: string) => {
  console.log(err, msg);
  throw err;
};
const createQueries = (
  currentUser: Models.Document,
  types: string[],
  searchText: string,
  sort: string,
  limit?: number
) => {
  const queries = [
    Query.or([
      Query.equal("owner", [currentUser.$id]),
      Query.contains("users", [currentUser.email]),
    ]),
  ];

  if (types.length > 0) queries.push(Query.equal("type", types));
  if (searchText.length) queries.push(Query.contains("name", searchText));
  if (limit) queries.push(Query.limit(limit));

  if (sort) {
    const [sortBy, orderBy] = sort.split("-");
    queries.push(
      orderBy === "asc" ? Query.orderAsc(sortBy) : Query.orderDesc(sortBy)
    );
  }

  return queries;
};
export const uploadFile = async ({
  file,
  ownerId,
  accountId,
  path,
}: UploadFileProps) => {
  const { storage, databases } = await createAdminClient();

  try {
    const inputFile = InputFile.fromBuffer(file, file.name);

    const bucketFile = await storage.createFile(
      appWriteConfig.bucketId,
      ID.unique(),
      inputFile
    );

    const fileDoc = {
      type: getFileType(bucketFile.name).type,
      name: bucketFile.name,
      url: constructFileUrl(bucketFile.$id),
      extension: getFileType(bucketFile.name).extension,
      size: bucketFile.sizeOriginal,
      owner: ownerId,
      accountId,
      users: [],
      bucketFileId: bucketFile.$id,
    };

    const newFile = await databases
      .createDocument(
        appWriteConfig.databaseId,
        appWriteConfig.filesCollectionId,
        ID.unique(),
        fileDoc
      )
      .catch(async (err: unknown) => {
        await storage.deleteFile(appWriteConfig.bucketId, bucketFile.$id);
        handleError(err, "Failed to create a file document");
      });

    revalidatePath(path);
    return parseStringify(newFile);
  } catch (err) {
    handleError(err, "Failed to upload");
  }
};

export async function getTotalSpaceUsed() {
  try {
    const { databases } = await createSessionClient();
    const currUser = await getCurrentUser();

    if (!currUser) throw new Error("User is not authenticated");

    const files = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.filesCollectionId,
      [Query.equal("owner", [currUser.$id])]
    );

    const totalSpace = {
      image: { size: 0, latestDate: "" },
      document: { size: 0, latestDate: "" },
      video: { size: 0, latestDate: "" },
      audio: { size: 0, latestDate: "" },
      other: { size: 0, latestDate: "" },
      used: 0,
      all: 2 * 1024 * 1024 * 1024, //2GB Bucket Storage
    };

    files.documents.forEach((file) => {
      const fileType = file.type as FileType;
      totalSpace[fileType].size += file.size;
      totalSpace.used += file.size;

      if (
        !totalSpace[fileType].latestDate ||
        new Date(file.$updatedAt) > new Date(totalSpace[fileType].latestDate)
      ) {
        totalSpace[fileType].latestDate = file.$updatedAt;
      }
    });

    return parseStringify(totalSpace);
  } catch (err) {
    handleError(err, "Error calculating total space used ");
  }
}

export const getFiles = async ({
  types = [],
  searchText = "",
  sort = "$createdAt-desc",
  limit,
}: GetFilesProps) => {
  const { databases } = await createAdminClient();

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) throw new Error("User not found");

    const queries = createQueries(currentUser, types, searchText, sort, limit);
    const files = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.filesCollectionId,
      queries
    );

    return parseStringify(files);
  } catch (err) {
    handleError(err, "Failed to fetch files");
  }
};

export const renameFile = async ({
  fileId,
  name,
  extension,
  path,
}: RenameFileProps) => {
  const { databases } = await createAdminClient();

  try {
    const newName = `${name}.${extension}`;
    const updatedFile = await databases.updateDocument(
      appWriteConfig.databaseId,
      appWriteConfig.filesCollectionId,
      fileId,
      {
        name: newName,
      }
    );

    revalidatePath(path);
    return parseStringify(updatedFile);
  } catch (err) {
    handleError(err, "Failed to rename file");
  }
};

export const updatedFileUsers = async ({
  fileId,
  emails,
  path,
}: UpdateFileUserProps) => {
  const { databases } = await createAdminClient();

  try {
    const updatedFile = await databases.updateDocument(
      appWriteConfig.databaseId,
      appWriteConfig.filesCollectionId,
      fileId,
      {
        users: emails,
      }
    );

    revalidatePath(path);
    return parseStringify(updatedFile);
  } catch (err) {
    handleError(err, "Failed to rename file");
  }
};

export const deleteFile = async ({
  fileId,
  bucketFileId,
  path,
}: DeleteFileProps) => {
  const { databases, storage } = await createAdminClient();

  try {
    const deletedFile = await databases.deleteDocument(
      appWriteConfig.databaseId,
      appWriteConfig.filesCollectionId,
      fileId
    );

    if (deletedFile) {
      await storage.deleteFile(appWriteConfig.bucketId, bucketFileId);
    }

    revalidatePath(path);
    return parseStringify({ status: "success" });
  } catch (err) {
    handleError(err, "Failed to rename file");
  }
};
