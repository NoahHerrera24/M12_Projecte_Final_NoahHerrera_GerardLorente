export interface ITicketQueixa {

   id: number;
   descripcio: string;
   estat: string; 
   foto?: string;
   video?: string;
   culpable_id: number;
   torneig_id: number;
   culpable?: {
      id: number;
      name: string;
   };
   
}