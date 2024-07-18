'use client'
import axios from 'axios';
import '../phong.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const NewDepart = () => {
    const router = useRouter();
    const [infors, setInfor] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [id_leader, setInfor_id] = useState('');
    const Infor = async() => {
        const response = await axios.get('http://127.0.0.1:8000/api/formthemphong');
        setInfor(response.data.list);
    };
    useEffect(() => {
        Infor();
    },[]);
    
    const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault();
      try{
        const res = axios.post('http://127.0.0.1:8000/api/themphong', {name, email, phone, id_leader });
            router.push(`/phong/thongbao?status=${(await res).data.status}&message=${(await res).data.message}`);
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
                    <p>Email <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}/></p>
                    <p>Tel   <input type="text" name="phone" id="phone" onChange={(e) => setPhone(e.target.value)}/></p>
                    <p>Trưởng phòng <select onChange={(e) => setInfor_id(e.target.value)}>
                    {infors.map((dept : any) => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                    </select></p>
                    <p><button type="submit">Thêm</button></p>
                </form>
            </div>
        </div>
    )
};

export default NewDepart;