import { Tabs } from 'antd-mobile';
import './style.css'
import { fetchChannelList } from '@/apis/list';
import { useEffect, useState } from 'react';
import { ChannelItem } from '@/apis/list';

const Home=()=>{
    const [channels,setChannels]=useState<ChannelItem[]>();

    useEffect(()=>{
        async function getChannels(){
            const res=await fetchChannelList();
            setChannels(res.data.data.channels)
        }

        getChannels();
    },[])

    return <div>
        <div className='tabContainer'>
        <Tabs>
            {channels?.map(item => 
                <Tabs.Tab title={item.name} key={item.id}>
                {/* list区域 */}
                </Tabs.Tab> 
            )}
          
        </Tabs>
        </div>
    </div>
}

export default Home;