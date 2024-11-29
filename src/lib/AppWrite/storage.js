import { storage } from './appwrite';

export const WebApp = {
	bucketId: '6740230a002ce99c0cd2',
	getFile: async (fileId) => {
		const fileUrl = await storage.getFileView(WebApp.bucketId, fileId);
		return fileUrl;
	}
};
