import update from 'immutability-helper'
import type { FC } from 'react'
import { useCallback, useState } from 'react'
import { Card } from './Card'
import { TMedia } from '../types/global'

const style = {
  display: 'flex',
  width: '90vw',
  OverflowX: 'auto',
}


export const Container: FC = () => {
  {
    const [drag, setDrag] = useState<TMedia[]>([
      {
        // index: 1,
        type: 'image',
        thumbnail: 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg',
        assetUrl: 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg',
      },
      {
        // index: 2,
        type: 'video_yt',
        thumbnail: 'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg',
        assetUrl: 'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg',
      },
      {
        // index: 1,
        type: 'image',
        thumbnail: 'https://images.unsplash.com/photo-1638486071992-536e48c8fa3e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bG9vayUyMGJhY2t8ZW58MHx8MHx8fDA%3D',
        assetUrl: 'https://images.unsplash.com/photo-1638486071992-536e48c8fa3e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bG9vayUyMGJhY2t8ZW58MHx8MHx8fDA%3D',
      },
      {
        // index: 2,
        type: 'video_yt',
        thumbnail: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
        assetUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
      },
      {
        // index: 1,
        type: 'image',
        thumbnail: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg',
        assetUrl: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg',
      },
     
    ]);

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      setDrag((prevCards: TMedia[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as TMedia],
          ],
        }),
      )
    }, [])

    // const renderCard = useCallback(
    //   (item:TMedia , index:number) => {
    //     return (
          
    //       <Card
    //         type={item.type}
    //         index={index}
    //         item={item.assetUrl}
    //         moveCard={moveCard}
    //         />
    //     <div></div>
    //     )
    //   },
    //   [],
    // )
    return (
      <>
        <div style={style}>
          {drag.map((item: TMedia, index: number) => (
            <Card
                    index={index}
                    item={item}
                    moveCard={moveCard}
                    />
          ))}
        </div>
      </>
    )
  }
};

