'use client'
import Link from 'next/link';
import '../phong.css';
import { useSearchParams } from 'next/navigation';
export default function Notification(){
    const params = useSearchParams();
    var s = null;
    if (params.get('status') == undefined){
        s = "";
    }
    else{
        s = params.get('status');
    }
    return(
        <div className="content">
            <div className={s}>{params.get('message')}</div>
            <Link href={'/phong'}>OK</Link>
        </div>
    )
};