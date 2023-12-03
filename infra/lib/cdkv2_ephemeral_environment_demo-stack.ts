import { Stack, StackProps } from 'aws-cdk-lib';  
import { Construct } from 'constructs';
import input from "../environment-properties.json";
import { Cdkv2EphemeralEnvironmentServices } from '@labvel/ecs-fargate-services';


export interface EphemeralEnvironmentProps extends StackProps {
  onDemandTestEnv: boolean;
  version: string
}

export class Cdkv2EphemeralEnvironmentDemoStack extends Stack {
  constructor(scope: Construct, id: string, props?: EphemeralEnvironmentProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    for (let s of input.service_instances){
        s.inputs.image = `${s.inputs.image}:${props?.version}`
        console.log(s.inputs.image)
        new Cdkv2EphemeralEnvironmentServices(this, `CustomService-${s.name}`, {
              listenerPort: s.inputs.alb_port,
              containerPort: s.inputs.port,
              public: true,
              parentEnv:`${input.environment.env}-${input.environment.outputs.ParentEnv}`, //"parentEnv",
              instanceInputs: {inputs: s.inputs},
              environmentOutputs:{"outputs": input.environment.outputs }
            })
      
    }
    // Create additional services for testing
    if( props?.onDemandTestEnv) {
      for (let s of input.additonal_test_service_instances){
            
            new Cdkv2EphemeralEnvironmentServices(this, `TestService-${s.name}`, {
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
}
