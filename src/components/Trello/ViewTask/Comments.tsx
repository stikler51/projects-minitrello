import React, { ReactElement } from 'react'
import { CommentsProps } from '../types'

const Comments = ({ items }: CommentsProps): ReactElement => {
  return (
    <div>
      {items.map((comment) => {
        return (
          <div key={comment.id} className="comment">
            <div className="comment_author">
              {comment.author.first_name} {comment.author.last_name}
            </div>
            <div className="comment_text">{comment.text}</div>
          </div>
        )
      })}
    </div>
  )
}

export default Comments
