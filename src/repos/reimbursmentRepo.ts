import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from './dynamo';
import Reimbursment from '../modules/Reimbursment';
import log from '../log';

class ReimbursmentRepo {
  constructor(
      private docClient: DocumentClient = dynamo,
  ) {}

  // create a new reimbursement UNTESTED
  async addReimbursment(reimbursment: Reimbursment): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'reimbursements',
      Item: reimbursment,
      ReturnConsumedCapacity: 'TOTAL',
      ConditionExpression: 'id <> :id',
      ExpressionAttributeValues: {
        ':id': reimbursment.id,
      },
    };

    try {
      const result = await this.docClient.put(params).promise();
      log.debug('Succesful add to reimbursements table');
      log.debug(result);
      return true;
    } catch(error) {
      log.error(error);
      return false;
    }
  }

  // update a given reimbursement UNTESTED
  async updateReimbursment(reimbursment: Reimbursment): Promise<boolean> {
    const params: DocumentClient.UpdateItemInput = {
      TableName: 'reimbursements',
      Key: {
        id: reimbursment.id,
      },
      ReturnConsumedCapacity: 'TOTAL',
      UpdateExpression: 'SET amount = :a, stage = :s, nextStage = :n',
      ExpressionAttributeValues: {
        ':a': reimbursment.amount,
        ':s': reimbursment.stage,
        ':n': reimbursment.nextStage,
      },
      ReturnValues: 'UPDATED_NEW',
    };

    try {
      const result = await this.docClient.update(params).promise();
      log.debug('Succesful update to reimbursements table');
      log.debug(result);
      return true;
    } catch(error) {
      log.error(error);
      return false;
    }
  }

  async getById(id: number): Promise<Reimbursment | undefined> {
    const params: DocumentClient.GetItemInput = {
      TableName: 'reimbursements',
      Key: {
        id,
      },
    };

    try {
      const data = await this.docClient.get(params).promise();
      log.debug('Succesful retrieval of user data');
      log.debug(data);
      return data.Item as Reimbursment;
    } catch(error) {
      log.error(error);
      return undefined;
    }
  }

  async getByEmployee(employee: string): Promise<Reimbursment[]> {
    const params: DocumentClient.QueryInput = {
      TableName: 'reimbursements',
      IndexName: 'employee-index',
      KeyConditionExpression: 'employee = :emp',
      ExpressionAttributeValues: {
        ':emp': employee,
      },
    };

    try {
      const data = await this.docClient.query(params).promise();
      log.debug('Succesful query of reimbursements table');
      log.debug(data);
      if(data.Items) {
        return data.Items as Reimbursment[];
      }
    } catch(error) {
      log.error(error);
    }
    return [];
  }

  async getByStage(stage: string): Promise<Reimbursment[]> {
    const params: DocumentClient.QueryInput = {
      TableName: 'reimbursements',
      IndexName: 'stage-index',
      KeyConditionExpression: 'stage = :stg',
      ExpressionAttributeValues: {
        ':stg': stage,
      },
    };

    try {
      const data = await this.docClient.query(params).promise();
      log.debug('Succesful query of reimbursements table');
      log.debug(data);
      if(data.Items) {
        return data.Items as Reimbursment[];
      }
    } catch(error) {
      log.error(error);
    }
    return [];
  }
}

export default new ReimbursmentRepo();
