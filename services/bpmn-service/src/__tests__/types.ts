import {AnyObject} from '@loopback/repository';

export interface MockCamundaWorkflow {
  workflowVersion: number;
  externalIdentifier: string;
  name: string;
  provider: string;
  inputSchema: AnyObject;
  workflowVersions: [];
  file: string;
}

export const MOCK_BPMN_ENGINE_KEY = 'mock.bpmn.engine';
