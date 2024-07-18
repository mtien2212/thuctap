import axios from 'axios';
import './phong.css'
import Link from 'next/link';

const ListInfor = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/phong');
    const deps = response.data.list;
    const infors = response.data.in;
    return(
      <div className="content">
            <div className="add">
                <p>Tạo mới nhân viên</p>
                <Link href={'/phong/them'}>Add</Link>
                <button>Logout</button>
            </div>
            <div className="list">
            <table>
              <tbody>
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Tel</td>
                    <td>Nhân sự</td>
                    <td>Thao tác</td>
                  </tr>
                  {deps.map((dep : any, index : any) => (
                    <tr key={index} >
                      <td>{dep.id}</td>
                      <td><Link href={`/phong/${dep.id}`}>{dep.name}</Link></td>
                      <td>{dep.email}</td>
                      <td>{dep.phone}</td>
                      <td>{infors[dep.id].map((infor : any)=>(<p key={infor.id}>{infor.name}</p>))}</td>
                      <td><Link href={{ pathname: '/phong/themnhansu', query: { id: dep.id },}}>Thêm nhân sự</Link></td>
                    </tr>
                ))}
              </tbody> 
            </table>
            </div>
        </div>
    )
};

export default ListInfor;