import {StatusTicket} from './status-ticket.enum';

export class Ticket {
    ticketId? : string;  
    title?: string;
    description?: string;
    status?: StatusTicket;
    approved? : boolean;
    estimated?: Date;
    raisedBy?: string;
    assignedTo?: string;
  }
  
  