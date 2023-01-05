import { useEffect, useState } from 'react';
import moment from "moment";

const LOCAL_URL = "http://localhost:8000"
interface IClass {
  _id: string
  user: string,
  tutor: string,
  type: string,
  timeslot: {
    timings: {
      start: string,
      end: string
    }
  },
  status: string,
  classLink: string,
  createdAt: string,
  updatedAt: string
}

const BACKEND_ENDPOINT = LOCAL_URL

const Class: IClass = {
  _id: "",
  user: "userA",
  tutor: "tutorA",
  type: "plan",
  timeslot: {
    timings: {
      start: "2022-12-11T18:30:00",
      end: "2022-12-11T19:30:00"
    }
  },
  status: "scheduled",
  classLink: "",
  createdAt: new Date().toDateString(),
  updatedAt: new Date().toDateString()
}

const Classes = () => {
  const [classes, setClasses] = useState<IClass[]>([Class]);

  useEffect(() => {
    getAllClasses().then((result) => {
      // console.log(result);
      if (result) {
        // @ts-ignore
        setClasses(result);
      }
    });
  }, []);

  async function getAllClasses() {
    return await fetch(`${BACKEND_ENDPOINT}/getAllClasses`)
      .then(response => response.json())
      .then(result => result)
      .catch(error => console.log('error', error));
  }

  const addClass = () => {
    fetch(`${BACKEND_ENDPOINT}/addClass`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(Class),
    })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }


  return (
    <div className="w-4/5 h-full mx-auto p-10">
      <h1 className="text-2xl font-semibold mb-5">Classes</h1>

      <div onClick={() => addClass()} className="w-[128px] h-[36px] bg-[#00684a] hover:bg-[#00593f] hover:shadow-[0px_0px_0px_3px_rgb(192_250_230)] border border-[#00684a] flex items-center justify-center cursor-pointer rounded-md">
        <h3 className="text-sm text-white font-medium font-['Raleway']">Create</h3>
      </div>

      <div className='flex flex-col gap-4 my-5'>
        {classes.map((item) =>
          <ClassItem item={item} />
        )}
      </div>


    </div>
  )
}


const ClassItem = ({ item }: { item: IClass }) => {
  return (
    <div className="w-max min-w-[300px] p-2 flex border border-black/50 rounded-md">
      <div className="flex flex-col mr-5 items-center">
        <p className="text-xl font-semibold">{moment(item.timeslot.timings.start.replace("T", " ")).format("D")}</p>
        <p className="text-sm font-medium">{moment(item.timeslot.timings.start.replace("T", " ")).format("MMM")}</p>
      </div>

      <div className="flex flex-col">
        <p className="text-sm">{moment(item.timeslot.timings.start.replace("T", " ")).format("dddd")}</p>
        <div className="flex">
          <p className="text-base font-semibold">{moment(item.timeslot.timings.start.replace("T", " ")).format("LT")}</p>
          -
          <p className="text-base font-semibold">{moment(item.timeslot.timings.end.replace("T", " ")).format("LT")}</p>
        </div>

      </div>

    </div>
  )
}
export default Classes