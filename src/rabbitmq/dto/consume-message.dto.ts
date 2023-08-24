export interface ConsumeMessageDTO {
  queueName: string;
  handleMessage(message: any): Promise<void>;
}
