import { storage } from '$lib/server/appwrite-server.js';

export const AetosMind = {
	bucketId: '6740230a002ce99c0cd2',
	getFile: async (fileId) => {
		return await storage.getFileView(AetosMind.bucketId, fileId);
	}
};
