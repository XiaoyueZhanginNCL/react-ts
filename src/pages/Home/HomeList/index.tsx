import { Image, List } from 'antd-mobile'
// mock数据
import { ListRes, fetchListAPI } from '@/apis/list'
import { useEffect, useState } from 'react'

const HomeList = () => {

    const [listRes,setListRes]=useState<ListRes>({
        results:[],
        pre_timestamp:''+new Date().getTime(),
    })


    useEffect(()=>{
        async function getList(){
            const res=await fetchListAPI({
                channel_id:'0',
                timestamp:''+new Date().getTime()
            })

            setListRes({
                results:res.data.data.results,
                pre_timestamp:res.data.data.pre_timestamp,
            })
        }

        getList();
    },[])
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
    </>
  )
}

export default HomeList