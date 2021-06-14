import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from './dynamo';
import log from '../log';

class OptionRepo {
  constructor(
      private docClient: DocumentClient = dynamo,
  ) {}

  // retieve a user based on user name
  async getOptions(type: string): Promise<string[]> {
    const params: DocumentClient.GetItemInput = {
      TableName: 'options',
      Key: {
        type,
      },
      ProjectionExpression: '#type',
      ExpressionAttributeNames: {
        '#type': 'type',
      },
    };

    try {
      const data = await this.docClient.get(params).promise();
      log.debug('Succesful retrieval of user data');
      log.debug(data);
      return data.Item as string[];
    } catch(error) {
      log.error(error);
      return [];
    }
  }
}

export default new OptionRepo();
