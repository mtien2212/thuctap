'use client'
import axios from 'axios';
import '../nhansu.css'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const DetailInfor =  ({params} : any) => {
    
    const router = useRouter();
    const [selectedValues, setSelectedValues] = useState([]);
    const [id, setId] = useState('');
    const [er, setEr] = useState(''); 
    const [phong, setPhong] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [clubs, setClubs] = useState([]);
    const [clbs, setClbs] = useState([]);
    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState([]);
    const Detail = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/api/chitietnhansu?id=${params.id}`);
        setId(response.data.infor.id);
        setDepartment(response.data.infor.id_phong);
        setPhong(response.data.infor.phong);
        setName(response.data.infor.name);
        setEmail(response.data.infor.email);
        setPhone(response.data.infor.phone);
        setClubs(response.data.clu);
        setClbs(response.data.clb);
        setDepartments(response.data.dep);
    }
    useEffect(() => {
        Detail();
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
          const res = axios.post('http://127.0.0.1:8000/api/suanhansu', {id, name, email, phone, department, selectedValues });
              router.push(`/nhansu/thongbao?status=${(await res).data.status}&message=${(await res).data.message}`);
          }
          catch(error){
              console.log('Lỗi thêm');
          }
      };
      const handleCheckboxChange = (e : any) => {
        const value = e.target.value;
        if (e.target.checked) {
        setSelectedValues((prevValues) => [...prevValues, value]);
        } else {
          setSelectedValues((prevValues) =>
            prevValues.filter((item) => item !== value)
          );
        }
      };
      const Delete = async(e: React.FormEvent) => {
        e.preventDefault();
        try{
          const res = axios.get(`http://127.0.0.1:8000/api/xoanhansu?id=${id}`);
              router.push(`/nhansu/thongbao?status=${(await res).data.status}&message=${(await res).data.message}`);
          }
          catch(error){
              console.log('Lỗi xóa');
          }
      };
    return(
      <div className="content">
        <div className="error">{er}</div>
        <div className="add">
                <form onSubmit={handleSubmit}>
                    <p>ID   <input type="text" name="id" id="id" value={id} readOnly /></p>
                    <p>Tên   <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}/></p>
                    <p>Email <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/></p>
                    <p>Tel   <input type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/></p>
                    <p>Phòng <select onChange={(e) => setDepartment(e.target.value)}>
                    <option  value={department} >{phong}</option>
                    {departments.map((dept : any) => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                    </select></p>
                    <p>Danh sách clb đã tham gia
                        {clubs.map((club : any) =>(
                            <div key={club.id}><span>{club.name}</span></div>
                        ))}
                    </p>
                    <p>Danh sách clb chưa tham gia
                        {clbs.map((club : any) =>(
                            <div key={club.id}><input type="checkbox" value={club.id} onChange={handleCheckboxChange} /><span>{club.name}</span></div>
                        ))}
                    </p>
                    <p><button type="submit">Sửa</button> <button onClick={Delete}>Xóa</button></p>
                </form>
            </div>
        </div>
    )
};

export default DetailInfor;