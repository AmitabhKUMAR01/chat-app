import { Client ,Databases,Account,Storage} from 'appwrite';
const client = new Client();

export const PROJECT_ID = '6530b6619a68a822cdbf'

export const DATABASES_ID='6530b85e7181667b270e'
export const COLLECTIONS_ID_MESSAGE = '6530b86653f2a8ad1bc6'
export const USER_COLLECTIONS='6538c5c8cb7d4cf5f09d'
export const ONE_MESSAGE_COLLECTION='6538ea9c15475e613f09'
export const MY_API_KEY='e64565f5a6ea4d5de55412e3a49a6ad1a26ec91aa676e08f838c9c8b39cd6ba4928739e0588ecfdd482d171978c2cd493e9ae15897f5d9cdeb7ca80ed14d28a91aa36b83413eb103194d417784b29bea3bb72eb6ceecdcab083119388def941c6cfb886bc2c37103a36460c8efc1f7648115263ba4cc3d1f36cc0db309a10fcd'
export const TODO_DATABASES_ID = '6534d5a0455ffff185af'
export const TODO_COLLECTIONS_ID_MESSAGE = '6534d5aecdcdaca20991'
export const USER_PROFILE_BUCKET_ID = '653c9234cdc90dd099a0'

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6530b6619a68a822cdbf')
    





export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);
export default client;
account.updatePrefs({
    origin: ['https://main--melodious-pavlova-a5baab.netlify.app/']
  })
    .then(response => {
      console.log('CORS settings updated successfully',res);
    })
    .catch(error => {
      console.log('Failed to update CORS settings:', error);
    });