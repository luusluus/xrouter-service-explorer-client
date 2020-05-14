export class ServiceRequest{
    constructor(
      service:string,
      parameters:string[],
      nodecount:number
    ) { 
      this.service = service;
      this.parameters = parameters;
      this.nodecount = nodecount;
     }
    
     service:string;
     parameters:string[];
     nodecount:number;
  }