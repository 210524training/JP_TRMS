import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from './dynamo';
import User from '../modules/User';
import log from '../log';

class UserRepo {
  constructor(
      private docClient: DocumentClient = dynamo,
  ) {}

  // add a user to the database if the user does not already exist
  async addUser(user: User): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'users',
      Item: user,
      ReturnConsumedCapacity: 'TOTAL',
      ConditionExpression: 'userName <> :username',
      ExpressionAttributeValues: {
        ':username': user.userName,
      },
    };

    try {
      const result = await this.docClient.put(params).promise();
      log.debug('Succesful add to user table');
      log.debug(result);
      return true;
    } catch(error) {
      log.error(error);
      return false;
    }
  }

  // retieve a user based on user name
  async getUser(userName: string): Promise<User | undefined> {
    const params: DocumentClient.GetItemInput = {
      TableName: 'users',
      Key: {
        userName,
      },
      ProjectionExpression: '#name, #pass, #role, #reimburse',
      ExpressionAttributeNames: {
        '#name': 'userName',
        '#pass': 'password',
        '#role': 'role',
        '#reimburse': 'reimbursment',
      },
    };

    try {
      const data = await this.docClient.get(params).promise();
      log.debug('Succesful retrieval of user data');
      log.debug(data);
      return data.Item as User | undefined;
    } catch(error) {
      log.error(error);
      return undefined;
    }
  }

  // update a given user
  async updateUser(user: User): Promise<boolean> {
    const params: DocumentClient.UpdateItemInput = {
      TableName: 'users',
      Key: {
        userName: user.userName,
      },
      ReturnConsumedCapacity: 'TOTAL',
      UpdateExpression: 'SET reimbursment = :n',
      ExpressionAttributeValues: {
        ':n': user.reimbursment,
      },
      ReturnValues: 'UPDATED_NEW',
    };

    try {
      const result = await this.docClient.update(params).promise();
      log.debug('Succesfull update to user table');
      log.debug(result);
      return true;
    } catch(error) {
      log.error(error);
      return false;
    }
  }
}

export default new UserRepo();
