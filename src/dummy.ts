import { IClass, ITutor, IUser } from "./interfaces"

export const userAccount1 = {
  id: "u1",
  email: "user1@gmail.com"
}
export const userAccount2 = {
  id: "u2",
  email: "user2@gmail.com"
}


export const user: IUser = {
  id: userAccount1.id,
  name: "user1",
  email: "user1@gmail.com",
  phoneNumber: 1234567899,
  lastUpdatedAt: new Date().toDateString(),
  createdAt: new Date().toString()
}

export const user2: IUser = {
  id: userAccount2.id,
  name: "user2",
  email: "user2@gmail.com",
  phoneNumber: 1234567899,
  lastUpdatedAt: new Date().toDateString(),
  createdAt: new Date().toString()
}

export const tutorAccount = {
  id: "t1",
  email: "tutor1@gmail.com"
}


export const tutorCalender = {
  tutor: tutorAccount.id,
  timeslots: []
}


export const tutor: ITutor = {
  "id": "t1",
  "firstName": "tutor1",
  "lastName": "tutor1",
  "tutorCalender": {
    "tutor": "t1",
    "timeslots": [
      {
        "start": "2022-12-18T02:00",
        "end": "2022-12-18T03:00",
      },
      {
        "start": "2022-12-18T03:00",
        "end": "2022-12-18T04:00",
      },
      {
        "start": "2022-12-19T04:00",
        "end": "2022-12-19T05:00",
      },
      {
        "start": "2022-12-19T03:00",
        "end": "2022-12-19T04:00",
      },
      {
        "start": "2022-12-20T04:00",
        "end": "2022-12-20T05:00",
      },
      {
        "start": "2022-12-19T06:00",
        "end": "2022-12-19T07:00",
      },
      {
        "start": "2022-12-20T06:00",
        "end": "2022-12-20T07:00",
      },
      {
        "start": "2022-12-21T06:00",
        "end": "2022-12-21T07:00",
      },
      {
        "start": "2022-12-21T04:00",
        "end": "2022-12-21T05:00",
      },
      {
        "start": "2022-12-21T03:00",
        "end": "2022-12-21T04:00",
      },
      {
        "start": "2022-12-21T02:00",
        "end": "2022-12-21T03:00",
      },
      {
        "start": "2022-12-20T00:00",
        "end": "2022-12-20T01:00",
      },
      {
        "start": "2022-12-19T00:00",
        "end": "2022-12-19T01:00",
      },
      {
        "start": "2022-12-19T01:00",
        "end": "2022-12-19T02:00",
      },
      {
        "start": "2022-12-19T02:00",
        "end": "2022-12-19T03:00",
      },
      {
        "start": "2022-12-20T01:00",
        "end": "2022-12-20T02:00",
      },
      {
        "start": "2022-12-20T02:00",
        "end": "2022-12-20T03:00",
      },
      {
        "start": "2022-12-20T03:00",
        "end": "2022-12-20T04:00",
      },
      {
        "start": "2022-12-21T07:00",
        "end": "2022-12-21T08:00",
      },
      {
        "start": "2022-12-21T08:00",
        "end": "2022-12-21T09:00",
      }
    ]
  }
}

export const classes = [
  {
    "user": "u1",
    "tutor": "t1",
    "attendance": {
      "user": false,
      "tutor": false
    },
    "timeslot": {
      "start": "2022-12-19T03:00",
      "end": "2022-12-19T04:00"
    },
    "status": "pending"
  },
  {
    "user": "u1",
    "tutor": "t1",
    "attendance": {
      "user": false,
      "tutor": false
    },
    "timeslot": {
      "start": "2022-12-19T04:00",
      "end": "2022-12-19T05:00"
    },
    "status": "pending"
  },
  {
    "user": "u1",
    "tutor": "t1",
    "attendance": {
      "user": false,
      "tutor": false
    },
    "timeslot": {
      "start": "2022-12-20T06:00",
      "end": "2022-12-20T07:00"
    },
    "status": "pending"
  },
  {
    "user": "u1",
    "tutor": "t1",
    "attendance": {
      "user": false,
      "tutor": false
    },
    "timeslot": {
      "start": "2022-12-21T04:00",
      "end": "2022-12-21T05:00"
    },
    "status": "pending"
  },
  {
    "user": "u2",
    "tutor": "t1",
    "attendance": {
      "user": false,
      "tutor": false
    },
    "timeslot": {
      "start": "2022-12-20T04:00",
      "end": "2022-12-20T05:00"
    },
    "status": "pending"
  },
  {
    "user": "u2",
    "tutor": "t1",
    "attendance": {
      "user": false,
      "tutor": false
    },
    "timeslot": {
      "start": "2022-12-20T03:00",
      "end": "2022-12-20T04:00"
    },
    "status": "pending"
  },
  {
    "user": "u2",
    "tutor": "t1",
    "attendance": {
      "user": false,
      "tutor": false
    },
    "timeslot": {
      "start": "2022-12-21T03:00",
      "end": "2022-12-21T04:00"
    },
    "status": "pending"
  }
]



export const users = [
  "user1",
  "user2",
  "user3",
  "user4",
  "user5",
  "user6",
  "user7",
  "user8",
  "user9"
]

export const tutors = [
  "tutor1",
  "tutor2",
  "tutor3",
  "tutor4",
  "tutor5",
  "tutor6",
  "tutor7",
  "tutor8",
  "tutor9"
]

export const grades = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12"
]