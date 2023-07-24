export interface Order {
  completed: boolean,
  description: string,
  plannedCompletionDate: string,
  userId: number,
  orderTypeId: number,
  quantity: number,
  title: string,
  price: number,
  client: string,
  orderId: number
  name?: string;
}
