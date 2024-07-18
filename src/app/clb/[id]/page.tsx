'use client'
import axios from 'axios';
import '../clb.css'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const DetailInfor =  ({params} : any) => {
    
    const router = useRouter();
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [introduce, setIntroduce] = useState('');
    const Detail = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/api/chitietclb?id=${params.id}`);
        setId(response.data.club.id);
        setName(response.data.club.name);
        setIntroduce(response.data.club.introduce);
    }
    useEffect(() => {
        Detail();
        console.log(id);
    },[]);
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try{
          const res = axios.post('http://127.0.0.1:8000/api/suaclb', {id, name, introduce });
              router.push(`/clb/thongbao?status=${(await res).data.status}&message=${(await res).data.message}`);
          }
          catch(error){
              console.log('Lỗi thêm');
          }
      };
      const Delete = async(e: React.FormEvent) => {
        e.preventDefault();
        try{
          const res = axios.get(`http://127.0.0.1:8000/api/xoaclb?id=${id}`);
              router.push(`/clb/thongbao?status=${(await res).data.status}&message=${(await res).data.message}`);
          }
          catch(error){
              console.log('Lỗi thêm');
          }
      };
    return(
      <div className="content">
        <div className="add">
                <form onSubmit={handleSubmit}>
                    <p>ID   <input type="text" name="id" id="id" value={id} readOnly /></p>
                    <p>Tên   <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}/></p>
                    <p>Giới thiệu <textarea  name="introduce" id="introduce" onChange={(e) => setIntroduce(e.target.value)} defaultValue={introduce}></textarea></p>
                    <p><button type="submit">Sửa</button> <button onClick={Delete}>Xóa</button></p>
                </form>
            </div>
        </div>
    )
};

export default DetailInfor;