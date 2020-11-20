import React, { useState } from 'react';

//TODO Check if it does not import all fonts during Bundle + clarify "Theme-ing"
//TODO -> Pas d'impact! import 'fontsource-roboto'; 

import './App.css';

import SkillSelector from './SkillSelector'
import Timeline from './Timeline'


const fakeData = {
  activitiesName : [ "Python", "Django", "HTML,CSS", "Javascript", "REACT" ],
  records : [
    {
      date : "2010 - 2011",
      title : "Python basics",
      subtitle: "Learning & Katas",
      desc : "Reading docs, following tutorials and practicing katas on Codewars",
      activitiesName: "Python",
    },
    {
      date : "2009 - 2010",
      title : "Django basics",
      subtitle: "Learning",
      desc : "Reading docs, following tutorials",
      activitiesName: "Django",
     },
     {
      date : "2010 - 2011",
      title : '"Back" to  web basics : HTML, CSS',
      subtitle: "Learning HTML",
      desc : "Reading docs on w3school. Now I know there is also MDN, but anyway it was a good introduction.",
      activitiesName: "HTML,CSS",
    },
  ]
}

function App() {

  const [filter, setFilter] = useState(fakeData.activitiesName);

  return (
      <>
        <SkillSelector activitiesName={fakeData.activitiesName}
          filter={filter}
          setFilter={setFilter} >
        </SkillSelector>
        <Timeline records={fakeData.records} filter={filter}> </Timeline>
      </>
 
  
  );
}

export default App;
