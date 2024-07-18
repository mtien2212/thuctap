'use client'
import axios from 'axios';
import './nhansu.css'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const ListInfor = () => {
  const search = useSearchParams();
  const router = useRouter();
  const [infors, setInfors] = useState([]);
  const [deps, setDeps] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [clbs, setClbs] = useState([]);
  const [name, setName] = useState('');
  const [depa, setDepa] = useState('');
  const [cl, setCl] = useState('');
  const [current, setCurrent] = useState(Number);
  const [maxpage, setMaxpage] = useState(Number);
  const [maxnumpage, setMaxnumpage] = useState(Number);
  const [numpage, setNumpage] = useState(Number);
  const Detail = async (a:any) => {
      const response = await axios.get(`http://127.0.0.1:8000/api/nhansu?current=${a}`);
        setInfors(response.data.list);
        setDeps(response.data.dep);
        setClubs(response.data.clu);
        setClbs(response.data.clb);
        setCurrent(response.data.current);
        setMaxpage(response.data.maxpage);
        setMaxnumpage(response.data.maxnumpage);
        setNumpage(response.data.numpage);
    }
    useEffect(() => {
      Detail(search.get('current'));
      
    },[search.get('current')]);
    const handleSearch = async (e: React.FormEvent) => {
      e.preventDefault();
      router.push(`http://localhost:3000/nhansu/timkiem?current=1&name=${name}&department=${depa}&club=${cl}`);
      router.refresh();
    };
    
    return(
      <div className="content">
            <div className="add">
                <p>Tạo mới nhân viên</p>
                <Link href={'/nhansu/them'}>Add</Link>
                <button>Logout</button>
            </div>
            <div className="search">
                <p>Tìm kiếm nhân viên bằng tên. Nếu không có điều kiện hiển thị toàn bộ</p>
                <form>
                    <select name="department" onChange={(e) => setDepa(e.target.value)} defaultValue="">
                        <option value="">Tất cả</option>
                        {deps.map((dep : any) => (
                        <option key={dep.id} value={dep.id}>{dep.name}</option>
                        ))}
                    </select>
                    <select name="club" onChange={(e) => setCl(e.target.value)} defaultValue="">
                        <option value="">Tất cả</option>
                        {clbs.map((club : any) => (
                        <option key={club.id} value={club.id}>{club.name}</option>
                        ))}
                    </select>
                    <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)}/><button onClick={handleSearch}>Search</button>
                </form>
            </div>
            <div className="list">
            <table>
              <tbody>
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Tel</td>
                    <td>Phòng</td>
                    <td>CLB</td>
                  </tr>
                  {infors.map((infor : any, index : any) => (
                    <tr key={index} >
                      <td>{infor.id}</td>
                      <td><Link href={`/nhansu/${infor.id}`}>{infor.name}</Link></td>
                      <td>{infor.email}</td>
                      <td>{infor.phone}</td>
                      <td>{infor.phong}</td>
                      <td>{clubs[infor.id].map((club : any)=>(<p key={club.id}>{club.name}</p>))}</td>
                    </tr>
                ))}
              </tbody> 
            </table>
            </div>
            <div className="page">
              {numpage > 1 && <Link href={`http://localhost:3000/nhansu?current=${(numpage-1)*3}`}>&lt;&lt;</Link>}
              {current % 3 == 0 && <div><Link href={`http://localhost:3000/nhansu?current=${current-2}`}>{current-2}</Link> {current-1 <= maxpage && <Link href={`http://localhost:3000/nhansu?current=${current-1}`}>|{current-1}</Link>}{current <= maxpage && <Link href={`http://localhost:3000/nhansu?current=${current}`}>|{current}</Link>}</div>}
              {current % 3 == 1 && <div><Link href={`http://localhost:3000/nhansu?current=${current}`}>{current}</Link>{Number(current)+1 <= maxpage && <Link href={`http://localhost:3000/nhansu?current=${Number(current)+1}`}>|{Number(current)+1}</Link>}{Number(current)+2 <= maxpage && <Link href={`http://localhost:3000/nhansu?current=${Number(current)+2}`}>|{Number(current)+2}</Link>}</div>}
              {current % 3 == 2 && <div><Link href={`http://localhost:3000/nhansu?current=${current-1}`}>{current-1}</Link>{current <= maxpage && <Link href={`http://localhost:3000/nhansu?current=${current}`}>|{current}</Link>}{Number(current)+1 <= maxpage && <Link href={`http://localhost:3000/nhansu?current=${Number(current)+1}`}>|{Number(current)+1}</Link>}</div>}
              {numpage < maxnumpage && <Link href={`http://localhost:3000/nhansu?current=${(numpage*3)+1}`}>&gt;&gt;</Link>}
          </div>
        </div>
      
    )
};

export default ListInfor;