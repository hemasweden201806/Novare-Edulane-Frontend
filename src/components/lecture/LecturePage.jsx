import React, { useEffect, useState } from 'react';
import {v4 as uuid} from 'uuid';

import LectureApi from '../../api/LectureApi';
import UserAPi from '../../api/UserApi';

import CreateLecture from './CreateLecture';
import Lecture from './Lecture';


export default function LecturePage() {
    const [ lectures, setLectures ] = useState([]);

    const [ user, setUser] =useState({});

    function getAllLectures() {
        LectureApi.getAllLectures()
            .then((data) => {
                setLectures(data.data);
                console.log(data);
            })
    }

    useEffect(() => {
        getAllLectures();
        getUserRole();
    }, [])
    
    function deleteLecture(lectureId) {
        LectureApi.deleteLecture(lectureId)
            .then(() => {
                alert("Lecture Deleted!");
                getAllLectures(); // to refresh the list immediately
            })
    }

    function getUserRole(){
        UserAPi.getLoggedInUser()
            .then ((data)=> {
                setUser(data.data);
            })
    }
    
    

    return (
        <div className= "lecture-div">
            {  user.role !== "teacher" ? null :  <CreateLecture lectures={lectures} getAllLectures={getAllLectures}/>}
           

            { lectures.length === 0 ? "No lecture yet." :
                   lectures
                    .map((lecture) => 
                    <Lecture key={uuid()} lecture={lecture} deleteLecture={deleteLecture} user_role={user.role} />
            )}
        </div>
    );

}