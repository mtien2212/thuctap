import Link from "next/link";

const Pagination = () =>{
    const current = 9;
    const maxpage = 9;
    const maxnumpage = 3;
    const numpage = 3;
    return(
        <div className="page">
            {numpage < maxnumpage && <Link href={`http://localhost:3000/nhansu?current=${(numpage-1)*3}`}>&lt;&lt;</Link>}
            {current % 3 == 0 && <div><Link href={`http://localhost:3000/nhansu?current=${current-2}`}>{current-2}</Link> {current-1 <= maxpage && <Link href={`http://localhost:3000/nhansu?current=${current-1}`}>|{current-1}</Link>}{current <= maxpage && <Link href={`http://localhost:3000/nhansu?current=${current}`}>|{current}</Link>}</div>}
            {current % 3 == 1 && <div><Link href={`http://localhost:3000/nhansu?current=${current}`}>{current}</Link>{current+1 <= maxpage && <Link href={`http://localhost:3000/nhansu?current=${current+1}`}>|{current+1}</Link>}{current+2 <= maxpage && <Link href={`http://localhost:3000/nhansu?current=${current+2}`}>|{current+2}</Link>}</div>}
            {current % 3 == 2 && <div><Link href={`http://localhost:3000/nhansu?current=${current-1}`}>{current-1}</Link>{current <= maxpage && <Link href={`http://localhost:3000/nhansu?current=${current}`}>|{current}</Link>}{current+1 <= maxpage && <Link href={`http://localhost:3000/nhansu?current=${current+1}`}>|{current+1}</Link>}</div>}
            {numpage > 1 && <Link href={`http://localhost:3000/nhansu?current=${(numpage*3)+1}`}>&gt;&gt;</Link>}
        </div>
    )
}
export default Pagination;