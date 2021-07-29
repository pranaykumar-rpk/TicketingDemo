import { StatusTicket } from './status-ticket.enum';

export class Ticket {
  ticketId?: string;
  item?: string;
  description?: string;
  status?: StatusTicket;
  loggedDate?: number;
  resolvedDate?: number;
  raisedBy?: string;
  assignedTo?: string;
  category?: string;
  type?: string;
  solution? :string;

  constructor(
    id: string,
    item: string,
    description: string,
    status: StatusTicket,
    logDate: number,
    resolveDate: number,
    raisedBy: string,
    assignedTo: string,
    category: string,
    type: string,
    solution: string
  ) {
    this.ticketId = id;
    this.item = item;
    this.description = description;
    this.status = status;
    this.loggedDate = logDate;
    this.resolvedDate = resolveDate;
    this.raisedBy = raisedBy;
    this.assignedTo = assignedTo;
    this.category = category;
    this.type = type;
    this.solution = solution;
  }
}
