import React from 'react'
import { formatDistanceToNow, parseISO } from 'date-fns';


const TimeAgo = ({stringDate}) => {

    let dateData = formatDistanceToNow( parseISO( stringDate ) )

  return (
    <div>
        <i className='muted'>{dateData} ago</i>
    </div>
  )
}

export default TimeAgo