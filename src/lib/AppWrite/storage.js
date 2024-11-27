import { storage } from './appwrite';

export const WebApp = {
 bucketId: '6740230a002ce99c0cd2',
 getFile: async (fileId) => {
  console.warn("Okay I received the fileId: ", fileId);
  const fileUrl = await storage.getFileView(WebApp.bucketId, fileId);
  console.warn("Here is the fileUrl: ", fileUrl);
  return fileUrl;
 }
};