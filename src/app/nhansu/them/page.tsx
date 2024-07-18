'use client'
import axios from 'axios';
import '../nhansu.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { error } from 'console';

const NewInfor = () => {
    const router = useRouter();
    const [departments, setDepartments] = useState([]);
    const [er, setEr] = useState(''); 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [department, setDepartment] = useState('');
    const Depart = async() => {
        const response = await axios.get('http://127.0.0.1:8000/api/formthemnhansu');
        setDepartments(response.data.dep);
    };
    useEffect(() => {
        Depart();
    },[]);
    
    const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault();
        if(name == ""){
            setEr("Tên không được để trống");
            return false;
        }
        if(email == ""){
            setEr("Email không được để trống");
            return false;
        }
        if(phone == ""){
            setEr("Tel không được để trống");
            return false;
        }
        var phone_regex = /^[0-9]{1,4}-[0-9]{1,4}-[0-9]{1,4}$/;
        if (phone_regex.test(phone) == false){
            setEr("Tel phải phải là số theo định dạng xxxx-xxxx-xxxx");
            return false;
        }
      try{
        const res = axios.post('http://127.0.0.1:8000/api/themnhansu', {name, email, phone, department });
            router.push(`/nhansu/thongbao?status=${(await res).data.status}&message=${(await res).data.message}`);
        }
        catch(error){
            console.log('Lỗi thêm');
        }
    };
    return(
        <div className="content">
            <div className="error">{er}</div>
        <div className="add">
                <form onSubmit={handleSubmit}>
                    <p>Tên   <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)}/></p>
                    <p>Email <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}/></p>
                    <p>Tel   <input type="text" name="phone" id="phone" onChange={(e) => setPhone(e.target.value)}/></p>
                    <select onChange={(e) => setDepartment(e.target.value)}>
                    {departments.map((dept : any) => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                    </select>
                    <p><button type="submit">Thêm</button></p>
                </form>
            </div>
        </div>
    )
};

export default NewInfor;