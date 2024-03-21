import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchDetailAPI,DetailData } from "@/apis/detail";
import { useEffect, useState } from "react";
import { NavBar } from "antd-mobile";

const Detail=()=>{
    const [detail,setDetail]=useState<DetailData|null>(null)
    const [params]=useSearchParams();
    const id=params.get('id');

    useEffect(()=>{
        async function getDetail(){
            const res= await fetchDetailAPI(id!);
            setDetail(res.data.data);
        }
        getDetail();
    },[id])

    const navigate=useNavigate();
    function back(){
        navigate(-1);
    }

    if(!detail){
        return<div>loading</div>
    }

    return <div>
        <div>
            <NavBar onBack={back}>{detail?.title}</NavBar>
        </div>
        <div dangerouslySetInnerHTML={{__html:detail?.content}}>
        </div>
    </div>
}

export default Detail;