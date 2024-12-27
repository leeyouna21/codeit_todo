

// import React from 'react';

// interface DoneProps {
//   task: string;
// }

// const Done: React.FC<DoneProps> = ({ task }) => {
//   return (
//     <div className="todoList todoListOK">
//       <div className="checkBoxCheck"></div>
//       <h6>{task}</h6>
//     </div>
//   );
// };

// export default Done;


import React from 'react';

interface DoneProps {
  task: string;
  onClickCheck: () => void; // Added this to handle checkbox clicks
}

const Done: React.FC<DoneProps> = ({ task, onClickCheck }) => {
  return (
    <div className="todoList todoListOK">
      <div className="checkBoxCheck" onClick={onClickCheck}></div>
      <h6>{task}</h6>
    </div>
  );
};

export default Done;
