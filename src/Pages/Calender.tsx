// import { classes, tutor, tutorCalender, user, user2 } from "../dummy"
import moment from "moment";
import { useEffect, useState } from "react";
import { IClass, ISlot, ITutor, IUser } from "../interfaces";
import { userApi } from "../api/usersApi";
import { tutorsApi } from "../api/tutorApi";
import { classesApi } from "../api/classesApi";

const Booking = () => {
  const currWeek = [
    ("2022-12-17"),
    ("2022-12-18"),
    ("2022-12-19"),
    ("2022-12-20"),
    ("2022-12-21"),
    ("2022-12-22"),
    ("2022-12-23"),
  ]

  const [currentTutor, setCurrentTutor] = useState<ITutor>();
  const [currentUser, setCurrentUser] = useState<IUser>();

  const [bookedslots, setBookedSlots] = useState<IClass[]>([])
  const [timeslots, setTimeslots] = useState<ISlot[]>([]);

  const [classes, setClasses] = useState<IClass[]>([]);
  // console.log(moment("2022-12-17 03:00").format("HH"))

  async function getUserByname(name: string) {
    const data = userApi.getUserByname(name);
    return data;
  }

  async function getTutorByName(name: string) {
    const data = tutorsApi.getTutorByName(name);
    return data;
  }

  async function getAllClasses() {
    const data = classesApi.getClasses();
    return data;
  }


  useEffect(() => {
    getUserByname("user1").then((data) => {
      setCurrentUser(data);
    }).catch((err) => console.log(err))

    getTutorByName("tutor1").then((data) => {
      setCurrentTutor(data);
      setTimeslots(data.tutorCalender.timeslots)
    }).catch((err) => console.log(err))

    getAllClasses().then((data) => {
      if (data) {
        setClasses(data)
      }
    })

  }, []);



  useEffect(() => {

  }, [currentTutor, bookedslots]);



  return (
    <div className="w-full h-full">
      {currentUser && currentTutor &&
        <div className="w-[90%] h-full p-10 mx-auto bg-gray-100">
          <h1 className="w-full text-center py-5 border-b">Schedule Your Classes</h1>
          <div className="flex gap-5">
            <p className="text-2xl font-bold mx-4">user: {currentUser.id}</p>
            <p className="text-2xl font-bold mx-4">tutor: {currentTutor.id}</p>
          </div>


          <div className="flex flex-col item-center">
            {/* Calender */}
            <div className="w-full mr-2 flex items-start">
              <Calender week={currWeek}>
                <>
                  {[...new Array(7)].map((item, weekDayNo) =>
                    <WeekColumn weekDayNo={weekDayNo}>
                      <>
                        {[...new Array(24)].map((i, hour) =>
                          <Slot
                            open={
                              currentTutor.tutorCalender.timeslots.some((item) => {
                                let h = Number(moment(`${item.start.replace("T", " ")}`).format("HH"))

                                return h === hour
                                  && new Date(currWeek[weekDayNo]).toDateString() === new Date(item.start).toDateString()
                              })
                            }
                            booked={
                              classes.length > 0 && classes.some((item) => {
                                let h = Number(moment(`${item.timeslot.start.replace("T", " ")}`).format("HH"))
                                let bookedDate = moment(item.timeslot.start.replace("T", " ")).format("dddd");
                                let weekDate = moment(currWeek[weekDayNo]).format("dddd")
                                return h === hour && weekDate === bookedDate && item.user !== currentUser.id && currentTutor.id === item.tutor
                              })
                            }
                            bookedByMe={
                              classes.length > 0 && classes.some((item) => {
                                let h = Number(moment(`${item.timeslot.start.replace("T", " ")}`).format("HH"))
                                let bookedDate = moment(item.timeslot.start.replace("T", " ")).format("dddd");
                                let weekDate = moment(currWeek[weekDayNo]).format("dddd")
                                return h === hour && weekDate === bookedDate && item.user === currentUser.id && currentTutor.id === item.tutor
                              })
                            }
                            selected={
                              bookedslots.some((item) => {
                                let h = Number(moment(`${item.timeslot.start.replace("T", " ")}`).format("HH"))
                                let bookedDate = moment(item.timeslot.start.replace("T", " ")).format("dddd");
                                let weekDate = moment(currWeek[weekDayNo]).format("dddd")
                                // console.log(h, hour, bookedDate, weekDate)
                                return h === hour && weekDate === bookedDate
                              })

                            }
                            text={`${hour}`}
                            onClick={() => {
                              let slotOpen = currentTutor.tutorCalender.timeslots.some((item) => {
                                let h = Number(moment(`${item.start.replace("T", " ")}`).format("HH"))
                                return h === hour
                                  && new Date(currWeek[weekDayNo]).toDateString() === new Date(item.start).toDateString()
                              });

                              let slotBooked = classes.some((item) => {
                                let h = Number(moment(`${item.timeslot.start.replace("T", " ")}`).format("HH"))
                                let bookedDate = moment(item.timeslot.start.replace("T", " ")).format("dddd");
                                let weekDate = moment(currWeek[weekDayNo]).format("dddd")
                                return h === hour && weekDate === bookedDate
                              })

                              if (slotOpen && !slotBooked) {
                                let timestampStart = moment(`${currWeek[weekDayNo]} ${hour}:00`).format("YYYY-MM-DDTHH:mm");
                                let timestampEnd = moment(`${currWeek[weekDayNo]} ${hour + 1}:00`).format("YYYY-MM-DDTHH:mm");
                                let tempBookedSlots = [...bookedslots];

                                tempBookedSlots.push({
                                  user: currentUser.id,
                                  tutor: currentTutor.id,
                                  attendance: {
                                    user: false,
                                    tutor: false,
                                  },
                                  timeslot: {
                                    start: timestampStart,
                                    end: timestampEnd,
                                  },
                                  status: "pending"

                                })
                                console.log(tempBookedSlots);
                                setBookedSlots(tempBookedSlots)
                              }

                            }} />
                        )}
                      </>

                    </WeekColumn>
                  )}
                </>

              </Calender>
              <div className="w-full flex flex-col mx-5 gap-4">
                <h3 className="text-xl font-semibold pb-4 whitespace-nowrap">Booked Slots</h3>

                {bookedslots.map((item) =>
                  <div className="w-full p-2 flex border border-black/50 rounded-md">
                    <div className="flex flex-col mr-5 items-center">
                      <p className="text-xl font-semibold">{moment(item.timeslot.start.replace("T", " ")).format("D")}</p>
                      <p className="text-sm font-medium">{moment(item.timeslot.start.replace("T", " ")).format("MMM")}</p>
                    </div>

                    <div className="flex flex-col">
                      <p className="text-sm">{moment(item.timeslot.start.replace("T", " ")).format("dddd")}</p>
                      <div className="flex">
                        <p className="text-base font-semibold">{moment(item.timeslot.start.replace("T", " ")).format("LT")}</p>
                        -
                        <p className="text-base font-semibold">{moment(item.timeslot.end.replace("T", " ")).format("LT")}</p>
                      </div>

                    </div>

                  </div>

                )
                }

                <button
                  onClick={() => {
                    let newClasses: IClass[] = [];
                    bookedslots.forEach((bookedSlot) => {
                      let newClass: IClass = {
                        ...bookedSlot
                      };
                      newClasses.push(newClass);

                      classesApi.addClass(newClass).then(() => {
                        console.log("Added class")
                      });
                    });


                  }}
                  className="p-4 px-7 flex items-center justify-center bg-green-400 text-white rounded-full mt-auto">Confirm Booking</button>
              </div>
            </div>



            <div className="w-full mr-2 flex items-start">
              <Calender week={currWeek}>
                <>
                  {[...new Array(7)].map((item, weekDayNo) =>
                    <WeekColumn weekDayNo={weekDayNo}>
                      <>
                        {[...new Array(24)].map((i, hour) =>
                          <Slot
                            open={
                              timeslots.some((item) => {
                                let h = Number(moment(`${item.start.replace("T", " ")}`).format("HH"))
                                return h === hour
                                  && new Date(currWeek[weekDayNo]).toDateString() === new Date(item.start).toDateString()
                              })
                            }
                            bookedFrom={
                              classes.length > 0 && classes.some((item) => {
                                let h = Number(moment(`${item.timeslot.start.replace("T", " ")}`).format("HH"))
                                let bookedDate = moment(item.timeslot.start.replace("T", " ")).format("dddd");
                                let weekDate = moment(currWeek[weekDayNo]).format("dddd")
                                return h === hour && weekDate === bookedDate && currentTutor.id === item.tutor
                              })
                            }



                            text={`${hour}`}
                            onClick={() => {
                              let timestampStart = moment(`${currWeek[weekDayNo]} ${hour}:00`).format("YYYY-MM-DDTHH:mm");
                              let timestampEnd = moment(`${currWeek[weekDayNo]} ${hour + 1}:00`).format("YYYY-MM-DDTHH:mm");
                              let tempTimeslots = [...timeslots];
                              tempTimeslots.push({
                                start: timestampStart,
                                end: timestampEnd,
                              })
                              setTimeslots(tempTimeslots)
                            }} />
                        )}
                      </>
                    </WeekColumn>
                  )}
                </>

              </Calender>


              <div className="w-full flex flex-col mx-5 gap-4">
                <button
                  onClick={async () => {
                    console.log(timeslots);
                    if (currentTutor.refId) {
                      const res = await tutorsApi.updateTutorCalender(currentTutor.refId, timeslots)
                      console.log(res);
                    }
                  }}
                  className="p-4 px-7 flex items-center justify-center bg-green-400 text-white rounded-full mt-auto whitespace-nowrap">Confirm Timeslots</button>
              </div>
            </div>


          </div>

        </div>
      }
    </div>
  )
}



interface HeaderCellProps {
  text: string
}

const HeaderCell: React.FC<HeaderCellProps> = ({ text }) => {
  return (
    <div className="w-[100px] p-4 flex items-center justify-center border">
      {text}
    </div>
  )
}



const TimeCell = ({ text }: { text: string }) => {
  return (
    <div className="relative min-h-[48px] bg-gray-400 border border-black w-[100px] p-4 flex items-center justify-center">
      <span className="">{text}</span>
    </div>
  )
}

const Slot = ({ text,
  onClick,
  open,
  closed,
  booked,
  bookedByMe,
  selected,
  cancelled,
  bookedFrom
}:
  {
    text: string, onClick: any,
    open?: boolean,
    closed?: boolean,
    booked?: boolean,
    bookedByMe?: boolean,
    selected?: boolean,
    cancelled?: boolean,
    bookedFrom?: boolean
  }) => {
  return (
    <div onClick={() => onClick()}
      className={`relative h-[48px] 
      ${open && "bg-green-400"}
      ${closed && "bg-gray-700"}
      ${selected && "bg-yellow-400"}
      ${booked && "bg-purple-400"}
      ${bookedByMe && "bg-blue-400"}
      ${bookedFrom && "bg-blue-400"}

      ${cancelled && "bg-red-400"}
     w-[100px] border border-black p-4 flex items-center justify-center`}>

      <span className="text-xs">
        {booked && "booked by someone"}
        {bookedByMe && "booked by me"}
        {bookedFrom && `booked`}

      </span>

    </div>
  )
}


const WeekColumn = ({ weekDayNo, children }: { weekDayNo: number, children?: JSX.Element }) => {
  return (
    <div className="relative w-full flex-grow">
      {children}
    </div>

  )
}



export const Calender = ({ week, children }: { week: string[], children: JSX.Element }) => {
  return (
    <div className="w-full h-full mx-auto flex flex-col">
      <div className="w-full flex flex-col">
        {/* current Month and year */}
        <h3 className="text-xl font-semibold pb-4">{moment(week[0]).format("MMMM YYYY")}</h3>
        <div className="flex items-center">
          {/* Current week */}
          <p className="text-sm">{moment(week[0]).format("MMM Do")} - {moment(week[week.length - 1]).format("MMM Do")}</p>
        </div>
      </div>
      <div className="max-h-[500px] w-full flex flex-col my-5 border border-black/50 rounded-lg">
        <div className="w-full flex" >
          <HeaderCell text={"UTC+ 3.00"} />
          <HeaderCell text={moment(week[0]).format("ddd Do")} />
          <HeaderCell text={moment(week[1]).format("ddd Do")} />
          <HeaderCell text={moment(week[2]).format("ddd Do")} />
          <HeaderCell text={moment(week[3]).format("ddd Do")} />
          <HeaderCell text={moment(week[4]).format("ddd Do")} />
          <HeaderCell text={moment(week[5]).format("ddd Do")} />
          <HeaderCell text={moment(week[6]).format("ddd Do")} />
        </div>


        <div className="w-full flex overflow-hidden overflow-y-scroll">

          <div className="w-full flex flex-col">
            <TimeCell text="12 AM" />
            <TimeCell text="1 AM" />
            <TimeCell text="2 AM" />
            <TimeCell text="3 AM" />
            <TimeCell text="4 AM" />
            <TimeCell text="5 AM" />
            <TimeCell text="6 AM" />
            <TimeCell text="7 AM" />
            <TimeCell text="8 AM" />
            <TimeCell text="9 AM" />
            <TimeCell text="10 AM" />
            <TimeCell text="11 AM" />
            <TimeCell text="12 AM" />
            <TimeCell text="1 PM" />
            <TimeCell text="2 PM" />
            <TimeCell text="3 PM" />
            <TimeCell text="4 PM" />
            <TimeCell text="5 PM" />
            <TimeCell text="6 PM" />
            <TimeCell text="7 PM" />
            <TimeCell text="8 PM" />
            <TimeCell text="9 PM" />
            <TimeCell text="10 PM" />
            <TimeCell text="11 PM" />
          </div>

          {children}

        </div>
      </div>
    </div>
  )
}




export default Booking;






// To see if a timeslot is available loop through all given timeslots


