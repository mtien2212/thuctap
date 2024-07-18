'use client'
import axios from 'axios';
import '../phong.css'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const DetailInfor =  () => {
    const search = useSearchParams();
    const router = useRouter();
    const [selectedValues, setSelectedValues] = useState([]);
    const [id, setID] = useState('');
    
    const [infors, setInfors] = useState([]);
    const Detail = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/api/formthemnhansuphong`);
        setInfors(response.data.list);
    }
    useEffect(() => {
        Detail();
        setID(search.get('id'));
    },[]);
    
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try{
          const res = axios.post('http://127.0.0.1:8000/api/themnhansuphong', { id, selectedValues });
            router.push(`/phong/thongbao?status=${(await res).data.status}&message=${(await res).data.message}`);
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
    return(
      <div className="content">
        <div className="add">
                <form onSubmit={handleSubmit}>
                    <p> Thêm nhân sự
                        {infors.map((club : any) =>(
                            <div key={club.id}><input type="checkbox" value={club.id} onChange={handleCheckboxChange} /><span>{club.name}</span></div>
                        ))}
                    </p>
                    <p><button type="submit">Thêm</button></p>
                </form>
            </div>
        </div>
    )
};

export default DetailInfor;