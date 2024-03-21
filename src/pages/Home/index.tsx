import { Tabs } from 'antd-mobile';
import './style.css'
import { fetchChannelListAPI } from '@/apis/list';
import { useEffect, useState } from 'react';
import { ChannelItem } from '@/apis/list';
import HomeList from './HomeList';

const Home=()=>{
    const [channels,setChannels]=useState<ChannelItem[]>([]);

    useEffect(()=>{
        async function getChannels(){
            const res=await fetchChannelListAPI();
            setChannels(res.data.data.channels)
        }

        getChannels();
    },[])

    return <div>
        <div className='tabContainer'>
            {/* 默认激活的数据：channel id为0的推荐 */}
        <Tabs defaultActiveKey={'0'}>
            {channels?.map(item => 
                <Tabs.Tab title={item.name} key={item.id}>
                    <div className='listContainer'>
                       <HomeList channelID={''+item.id}/>
                    </div>
                </Tabs.Tab> 
            )}
          
        </Tabs>
        </div>
    </div>
}

export default Home;