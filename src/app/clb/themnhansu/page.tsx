'use client'
import axios from 'axios';
import '../clb.css'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const DetailInfor =  () => {
    const search = useSearchParams();
    const router = useRouter();
    const [selectedInfor, setselectedInfor] = useState([]);
    const [selectedClub, setselectedClub] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [infors, setInfors] = useState([]);
    const Detail = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/api/formthemnhansuclb`);
        setClubs(response.data.list);
        setInfors(response.data.in);
    }
    useEffect(() => {
        Detail();
    },[]);
    
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try{
          const res = axios.post('http://127.0.0.1:8000/api/themnhansuclb', { selectedInfor, selectedClub });
              router.push(`/clb`);
          }
          catch(error){
              console.log('Lỗi thêm');
          }
      };
      const handleClubCheckboxChange = (e : any) => {
        const value = e.target.value;
        if (e.target.checked) {
        setselectedClub((prevValues) => [...prevValues, value]);
        } else {
            setselectedClub((prevValues) =>
            prevValues.filter((item) => item !== value)
          );
        }
      };
      const handleInforCheckboxChange = (e : any) => {
        const value = e.target.value;
        if (e.target.checked) {
        setselectedInfor((prevValues) => [...prevValues, value]);
        } else {
            setselectedInfor((prevValues) =>
            prevValues.filter((item) => item !== value)
          );
        }
      };
    return(
      <div className="content">
        <div className="add">
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <p> Danh sách nhân sự
                                        {infors.map((club : any) =>(
                                            <div key={club.id}><input type="checkbox" value={club.id} onChange={handleInforCheckboxChange} /><span>{club.name}</span></div>
                                        ))}
                                    </p>
                                </td>
                                <td>
                                    <p> Danh sách CLB
                                        {clubs.map((club : any) =>(
                                            <div key={club.id}><input type="checkbox" value={club.id} onChange={handleClubCheckboxChange} /><span>{club.name}</span></div>
                                        ))}
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                    
                    <p><button type="submit">Thêm</button></p>
                </form>
            </div>
        </div>
    )
};

export default DetailInfor;