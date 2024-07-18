'use client'
import axios from 'axios';
import '../clb.css';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const NewClub = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [introduce, setIntroduce] = useState('');
    const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault();
      try{
        const res = axios.post('http://127.0.0.1:8000/api/themclb', {name, introduce });
            router.push(`/clb/thongbao?status=${(await res).data.status}&message=${(await res).data.message}`);
        }
        catch(error){
            console.log(error);
        }
    };
    return(
        <div className="content">
        <div className="add">
                <form onSubmit={handleSubmit}>
                    <p>Tên   <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)}/></p>
                    <p>Giới thiệu <textarea name="email" id="email" onChange={(e) => setIntroduce(e.target.value)}></textarea></p>
                    <p><button type="submit">Thêm</button></p>
                </form>
            </div>
        </div>
    )
};

export default NewClub;