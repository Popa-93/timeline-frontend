import logo from './logo.svg';
import './App.css';

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

function WorkIcon() {
  return (
    <fragment>
      <img src={logo} alt="Work Icon"/>
      <img src={logo} alt="Work Icon"/>
    </fragment>);
}
function SchoolIcon() {
  return <img src={logo} alt="School Icon"/>;
}

function App() {


  return (
  <VerticalTimeline>
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      date="2009"
      iconStyle={{ background: '#ff0000', color: '#0000ff' }}
      icon={<WorkIcon />}
    >
      <h3 className="vertical-timeline-element-title">Podfjklgjdfsklgjdfkljgklsdfjgklpa93</h3>
      <h4 className="vertical-timeline-element-subtitle">Pop!</h4>
      <p>
        Blabla bla!
      </p>
    </VerticalTimelineElement>
    <VerticalTimelineElement
      className="vertical-timeline-element--school"
      date="2010 - 2011"
      iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
      icon={<SchoolIcon />}
    >
      <h3 className="vertical-timeline-element-title">Art Director</h3>
      <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
      <p>
        Creative Direction, User Experience, Visual Design, SEO, Online Marketing
      </p>
    </VerticalTimelineElement>
  </VerticalTimeline>
  );
}

export default App;
