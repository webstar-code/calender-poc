export interface ITutor {
  id: string,
  firstName: string,
  lastName: string,
  tutorCalender: {
    tutor: string,
    timeslots: ISlot[]
  }
  refId?: string
}

export interface IUser {
  id: string,
  name: string,
  email: string,
  phoneNumber: number,
  lastUpdatedAt: string,
  createdAt: string,
  refId?: string
}

export interface ISlot {
  start: string,
  end: string,
}


export interface IClass {
  user: string,
  tutor: string,
  timeslot: ISlot,
  attendance: {
    user: boolean,
    tutor: boolean,
  },
  status: "pending" | "completed" | "upcoming"
}