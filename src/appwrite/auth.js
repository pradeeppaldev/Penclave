import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

// Which Appwrite project to interact with — defined by the client.setProject('<PROJECT_ID>').
// Where the Appwrite server is — defined by client.setEndpoint('<APPWRITE_ENDPOINT>').

// object
export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);    
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                return this.login({email, password});
                // call another method
            }
            else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: get user :: error ", error);
        }

        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error){
            console.log("Appwrite service :: logout :: error ", error);
        }
    }
}

const authService = new AuthService();

export default authService;     //object is exported