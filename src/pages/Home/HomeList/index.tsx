import { Image, List,InfiniteScroll } from 'antd-mobile'
// mock数据
import { ListRes, fetchListAPI } from '@/apis/list'
import { useEffect, useState } from 'react'

type Props={
    channelID:string
}

const HomeList = (props:Props) => {

    const [listRes,setListRes]=useState<ListRes>({
        results:[],
        pre_timestamp:''+new Date().getTime(),
    })


    useEffect(()=>{
        async function getList(){
            const res=await fetchListAPI({
                channel_id:props.channelID,
                timestamp:''+new Date().getTime()
            })

            setListRes({
                results:res.data.data.results,
                pre_timestamp:res.data.data.pre_timestamp,
            })
        }

        getList();
    },[props.channelID])

    const [hasMore,setHasMore] = useState(true);
    
    async function loadMore(){
            const res=await fetchListAPI({
                channel_id:props.channelID,
                timestamp:listRes.pre_timestamp
            })

            setListRes({
                results:[...listRes.results,...res.data.data.results],
                pre_timestamp:res.data.data.pre_timestamp,
            })

            if(res.data.data.results.length===0){
                setHasMore(false);
            }
    
}

  return (
    <>
      <List>
        {listRes.results.map((item) => (
          <List.Item
            key={item.art_id}
            prefix={
              <Image
                src={item.cover.images?.[0]}
                style={{ borderRadius: 20 }}
                fit="cover"
                width={40}
                height={40}
              />
            }
            description={item.pubdate}
            >
            {item.title}
          </List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} threshold={10} hasMore={hasMore} />
    </>
  )
}

export default HomeList