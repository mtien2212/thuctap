'use client'
import axios from 'axios';
import '../phong.css'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const DetailInfor =  ({params} : any) => {
    
    const router = useRouter();
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [id_infor, setId_infor] = useState('');
    const [infors, setInfor] = useState([]);
    const Detail = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/api/chitietphong?id=${params.id}`);
        setId(response.data.del.id);
        setName(response.data.del.name);
        setEmail(response.data.del.email);
        setPhone(response.data.del.phone);
        setId_infor(response.data.del.id_leader);
        setInfor(response.data.list);
    }
    useEffect(() => {
        Detail();
    },[]);
    const [id_leader, setLeader] = useState('');
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try{
          const res = axios.post('http://127.0.0.1:8000/api/suaphong', {id, name, email, phone, id_leader });
              router.push(`/phong/thongbao?status=${(await res).data.status}&message=${(await res).data.message}`);
          }
          catch(error){
              console.log('Lỗi thêm');
          }
      };
      const Delete = async(e: React.FormEvent) => {
        e.preventDefault();
        try{
          const res = axios.get(`http://127.0.0.1:8000/api/xoaphong?id=${id}`);
              router.push(`/phong/thongbao?status=${(await res).data.status}&message=${(await res).data.message}`);
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
                    <p>Email <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/></p>
                    <p>Tel   <input type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/></p>
                    <p>Phòng <select onChange={(e) => setLeader(e.target.value)}>
                    {infors.map((dept : any) => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                    </select></p>
                    <p><button type="submit">Sửa</button> <button onClick={Delete}>Xóa</button></p>
                </form>
            </div>
        </div>
    )
};

export default DetailInfor;