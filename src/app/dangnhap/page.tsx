'use client'
import './dangnhap.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const NewInfor = () => {
    const router = useRouter();
    const [er, setEr] = useState(''); 
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault();
        if(name == ""){
            setEr("Tên không được để trống");
            return false;
        }
        if(password == ""){
            setEr("Tel không được để trống");
            return false;
        }
        if(name=="123" && password=="12345")
        {
            setEr('Đăng nhập thành công');
            router.push(`/nhansu/?current=1`);
        }
        else{
            setEr('LoginID hoặc Password bị sai');
        }
    };
    return(
        <div className="content">
            <div className="error">{er}</div>
        <div className="add">
                <form onSubmit={handleSubmit}>
                    <p>LoginID   <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)}/></p>
                    <p>Password   <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/></p>
                    <p><button type="submit">Login</button></p>
                </form>
            </div>
        </div>
    )
};

export default NewInfor;