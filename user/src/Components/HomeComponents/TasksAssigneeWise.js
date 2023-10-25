import React, { useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllTasks } from "../../features/taskSlice";
import Spinner from "../ReusableComponents/Spinner";

const TasksAssigneeWise = ({ assigneeWiseTasks }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { Token } = useSelector((state) => {
    return state?.user;
  });
  const dispatch = useDispatch();

  const handleClickReload = () => {
    setIsLoading(true);
    dispatch(getAllTasks({ Token }));
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  const assigneeWiseTaskListArray = assigneeWiseTasks?.map((assignee) => {
    return (
      <div
        key={assignee?.userId}
        className="flex flex-row flex-no-wrap justify-between items-center min-[320px]:w-[260px] sm:w-[360px] shadow-md p-2 rounded-md"
      >
        <div className="flex flex-col flex-no-wrap justify-center items-start my-4">
          <p className="font-roboto text-lg font-normal">
            {assignee?.userName}
          </p>
          <p className="font-roboto text-md font-medium">
            {assignee?.userTasks?.length}
          </p>
        </div>
        <Link to={`/all-tasks/assignee/${assignee?.userId}`}>
          <BsFillEyeFill size="20px" className="text-blue-500" />
        </Link>
      </div>
    );
  });

  return (
    <div className="shadow-md shadow-blue-500/50 border border-gray-300 rounded-md p-4 my-2 flex flex-col flex-no-wrap justify-center items-center min-[320px]:w-[280px] sm:w-[400px]">
      <div className="flex flex-row flex-no-wrap justify-between items-center min-[320px]:w-[260px] sm:w-[360px] min-[320px]:mb-6 sm:mb-8">
        <p className="font-roboto text-lg font-medium">
          All Tasks - Assignee Wise
        </p>
        <button onClick={handleClickReload}>
          <BiRefresh size="25px" />
        </button>
      </div>
      {isLoading && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <div className="flex flex-col flex-no-wrap">
          {assigneeWiseTaskListArray}
        </div>
      )}
    </div>
  );
};

export default TasksAssigneeWise;
