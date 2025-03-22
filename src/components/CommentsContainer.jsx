/* eslint-disable no-unused-vars */
import React from 'react'

const commentsData = [
    {
        name: "Kaioum Islam",
        text: "This is a comment",
        replies: [
            {
                name: "Kaioum Islam",
                text: "This is a reply",
                replies: [
                    {
                        name: "Kaioum Islam",
                        text: "This is a reply",
                        replies: []
                    },
                    {
                        name: "Kaioum Islam",
                        text: "This is a reply",
                        replies: []
                    },
                ]
            },
            {
                name: "Kaioum Islam",
                text: "This is a reply"
            },
            {
                name: "Kaioum Islam",
                text: "This is a reply"
            }
        ]
    },
    {
        name: "Kaioum Islam",
        text: "This is a comment",
        replies: [
            {
                name: "Kaioum Islam",
                text: "This is a reply",
                replies: [
                    {
                        name: "Kaioum Islam",
                        text: "This is a reply",
                        replies: [
                            {
                                name: "Kaioum Islam",
                                text: "This is a reply",
                                replies: [
                                    {
                                        name: "Kaioum Islam",
                                        text: "This is a reply",
                                        replies: []
                                    },
                                ]
                            },
                        ]
                    },
                ]
            },
            {
                name: "Kaioum Islam",
                text: "This is a reply",
                replies: []
            },
            {
                name: "Kaioum Islam",
                text: "This is a reply",
                replies: []
            },
        ]
    },
    {
        name: "Kaioum Islam",
        text: "This is a comment",
        replies: [
            {
                name: "Kaioum Islam",
                text: "This is a reply"
            }
        ]
    }
]

const Comment = ({ data }) => {
    const { name, text, replies } = data
    return (
        <div className='flex shadow-sm bg-gray-100 p-2 rounded-lg my-2'>
            <img className='h-12 w-12' src="https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png" alt="User" />
            <div className='px-3'>
                <p className='font-bold'>{name}</p>
                <p>{text}</p>
            </div>
        </div>
    )
}

const CommentLists = ({ comments }) => {
    return (
        comments?.map((comment, index) => (
            <div>
                <Comment key={index} data={comment}></Comment>
                <div className='pl-5 border bolder-l-black ml-5'>
                    <CommentLists key={index} comments={comment?.replies}></CommentLists>
                </div>
            </div>
        ))
    )
}

const CommentsContainer = () => {
    return (
        <div className='m-5 p-2'>
            <h1 className='text-2xl font-bold'>Comments: </h1>
            <CommentLists comments={commentsData}></CommentLists>
        </div>
    )
}

export default CommentsContainer