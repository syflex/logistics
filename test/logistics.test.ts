import '@aws-cdk/assert/jest';
import { SynthUtils } from '@aws-cdk/assert';
import { LogisticsStack } from '../lib/logistics-stack';
import * as cdk from 'aws-cdk-lib';

describe('LogisticsStack', () => {
  let app: cdk.App;
  let stack: LogisticsStack;

  // Create a new App and LogisticsStack before each test
  beforeEach(() => {
    app = new cdk.App();
    stack = new LogisticsStack(app, 'TestStack', { /* props */ });
  });

  // Test the stack DynamoDB tables are created
  test('DynamoDB tables are created', () => {
    expect(SynthUtils.toCloudFormation(stack)).toCountResources('AWS::DynamoDB::Table', 2);
  });

  // Test the stack api output is created
  test('Outputs are created', () => {
    expect(SynthUtils.toCloudFormation(stack).Outputs).toEqual(
      expect.objectContaining({
        TestStackapiURL: expect.any(Object),
        TestStackapiId: expect.any(Object)
      }),
    );
  });
});