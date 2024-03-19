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
        <Tabs>
            {channels?.map(item => 
                <Tabs.Tab title={item.name} key={item.id}>
                    <HomeList channelID={''+item.id}/>
                </Tabs.Tab> 
            )}
          
        </Tabs>
        </div>
    </div>
}

export default Home;