import {StatusTicket} from './status-ticket.enum';

export class Ticket {
    ticketId? : string;  
    item?: string;
    description?: string;
    status?: StatusTicket;
    loggedDate?: number;
    resolvedDate?: number;
    raisedBy?: string;
    assignedTo?: string;
    category? : string;
  }
  
  