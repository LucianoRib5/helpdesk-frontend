export interface Technician {
  id: number;
  userId: number;
  name: string;
  assignedTicketsCount: number;
  statusId: number;
  workShiftStart: string;
  workShiftEnd: string;
}
