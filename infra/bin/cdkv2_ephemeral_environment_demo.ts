#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Cdkv2EphemeralEnvironmentDemoStack } from '../lib/cdkv2_ephemeral_environment_demo-stack';

import input from "../environment-properties.json";
// Use environment variables when needed.
import {env} from "process";

const deploymentEnv = {
  account: env.CDK_DEPLOY_ACCOUNT ||env.CDK_DEFAULT_ACCOUNT,  //'571340586587',
  region: env.CDK_DEPLOY_REGION || env.CDK_DEFAULT_REGION, //'us-east-2'
};
const stackName = input.environment.name;

const app = new cdk.App();
new Cdkv2EphemeralEnvironmentDemoStack(app, 'Cdkv2EphemeralEnvironmentDemoStack', {
  env: deploymentEnv,
  stackName: stackName,
  onDemandTestEnv:  Boolean(env.ON_DEMAND_TEST_ENV) || false, 
  version: env.VERSION || "latest"
});

