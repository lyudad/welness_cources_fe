import React, { FC } from 'react'
import ReactPlayer from 'react-player'

interface VideoPlayerProps {
  videoUrl: string
}

export const VideoPlayer: FC<VideoPlayerProps> = ({ videoUrl }) => {
  return (
    <div>
      <ReactPlayer url={videoUrl} controls width='100%' height='auto' />
    </div>
  )
}
