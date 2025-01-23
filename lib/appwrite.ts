import { Alert } from 'react-native';
import {
  Client,
  Account,
  Avatars,
  ID,
  Databases,
  Query,
} from 'react-native-appwrite';
export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.takiy.aora',
  projectId: '6791bec1003762055056',
  databaseId: '6791c12a00117e4a3473',
  userCollectionId: '6791c169000a6befe932',
  videoCollectionId: '679240600038beffea70',
  storageId: '6791c56f003ad767b5a9',
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config;

// Init your React Native SDK
const client = new Client();

client.setEndpoint(endpoint).setProject(projectId).setPlatform(platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw new Error('Faild to create account.');

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const user = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      { accountId: newAccount.$id, email, username, avatar: avatarUrl }
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const signIn = async (email: string, password: string) => {
  await account.deleteSessions();

  try {
    return await account.createEmailPasswordSession(email, password);
  } catch (err) {
    throw err;
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error('No account found.');

    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (!currentUser) throw new Error('No current user.');

    return currentUser;
  } catch (error) {}
};

export const getAllPosts = async () => {
  try {
    return databases.listDocuments(databaseId, videoCollectionId);
  } catch (error) {
    throw error;
  }
};
