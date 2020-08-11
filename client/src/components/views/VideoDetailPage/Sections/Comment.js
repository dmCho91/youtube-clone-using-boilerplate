import React, { useState } from 'react'
import Axios from 'axios'
import { useSelector } from 'react-redux'

function Comment(props) {
    const videoId = props.postId

    const user = useSelector(state => state.user) // redux - state에서 가져옴
    const [CommentValue, setCommentValue] = useState("")

    const handleClick = (event) => {
        setCommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault() //refresh 방지

        const variables = {
            content: CommentValue,
            // writer: localStorage.getItem('userId'),
            writer : user.userData._id, // redux 사용
            postId: videoId
        }

        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success){
                    console.log(response.data.result)
                }else{
                    alert(' 코멘트를 저장하지 못했습니다.')
                }
            })
    }

    return (
        <div>
            <br />
            <p> Replies</p>
            <hr />

            {/* Comment Lists */}

            {/* Root Comment Form */}

            <form style={{display:'flex'}} onSubmit={onSubmit}>
                <textarea 
                    style={{width:'100%', borderRadius:'5px'}}
                    onChange={handleClick}
                    value={CommentValue}
                    placeholder='코멘트를 작성해주세요'

                />
                <br />
                <button style={{width:'20%', height:'52px'}} onClick={onSubmit} >Submit</button>
            </form>
        </div>
    )
}

export default Comment
