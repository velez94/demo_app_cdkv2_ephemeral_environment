import { Stack, StackProps } from 'aws-cdk-lib';  
import { Construct } from 'constructs';
import input from "../environment-properties.json";
import { Cdkv2EphemeralEnvironmentServices } from '@labvel/ecs-fargate-services';

export class Cdkv2EphemeralEnvironmentDemoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    for (let s of input.service_instances){
      
        new Cdkv2EphemeralEnvironmentServices(this, `CustomService-${s.name}`, {
              listenerPort: s.inputs.alb_port,
              containerPort: s.inputs.port,
              public: true,
              parentEnv:`${input.environment.env}-${input.environment.outputs.ParentEnv}`, //"parentEnv",
              instanceInputs: {inputs: s.inputs},
              environmentOutputs:{"outputs": input.environment.outputs }
            })
      
    }
    
    
  }
}
