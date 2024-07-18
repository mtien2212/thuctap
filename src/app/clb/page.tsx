import axios from 'axios';
import './clb.css'
import Link from 'next/link';

const ListInfor = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/clb');
    const clbs = response.data.list;
    const infors = response.data.in;
    return(
      <div className="content">
            <div className="add">
                <p>Tạo mới nhân viên</p>
                <Link href={'/clb/them'}>Add</Link>
                <Link href={'/clb/themnhansu'}>Thêm nhân sự</Link>
                <button>Logout</button>
            </div>
            <div className="list">
            <table>
              <tbody>
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Giới thiệu</td>
                    <td>Nhân sự</td>
                  </tr>
                  {clbs.map((dep : any, index : any) => (
                    <tr key={index} >
                      <td>{dep.id}</td>
                      <td><Link href={`/clb/${dep.id}`}>{dep.name}</Link></td>
                      <td>{dep.introduce}</td>
                      <td>{infors[dep.id].map((infor : any)=>(<p key={infor.id}>{infor.name}</p>))}</td>
                    </tr>
                ))}
              </tbody> 
            </table>
            </div>
        </div>
      
    )
};

export default ListInfor;