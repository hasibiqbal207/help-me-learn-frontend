import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Fab } from "react-tiny-fab";
import TutorList from "./tutorList/TutorList";
import FilterBar from "./filterBar/FilterBar";
import Chat from "../../../components/chat/Chat";
import { fetchOfferCourse } from "../../../core/actionCreators/offerCourse";
import { fetchApprovedCourseList } from "../../../core/actionCreators/course";
import { getUserType } from "../../../core/selectors/user";

export default function Student() {
  const dispatch = useDispatch();
  const [showChat, toggleChat] = useState(false);

  useEffect(() => {
    console.log("Student component mounted, fetching approved course list");
    dispatch(fetchApprovedCourseList());
  }, [dispatch]);

  const chatClosed = () => toggleChat(false);
  const chatOpened = () => toggleChat(true);

  function renderFabOption() {
    return (
      <Fab
        onMouseEnter={(e) => e.preventDefault()}
        onClick={chatOpened}
        icon={<i className="bi bi-chat-square-text"></i>}
      />
    );
  }

  function renderChat() {
    return (
      <div>
        {renderFabOption()}
        <Chat showChat={showChat} chatClosed={chatClosed} />
      </div>
    );
  }

  const userType = useSelector(getUserType);

  return (
    <div>
      <FilterBar fetchOfferCourse={fetchOfferCourse} />
      <br />
      <TutorList />
      <br />
      {userType === "student" && renderChat()}
    </div>
  );
}
